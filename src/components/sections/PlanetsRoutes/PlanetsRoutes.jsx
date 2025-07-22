import Planet from '../../ui/Planet/Planet';
import earthImageSrc from '../../../assets/icons/planets/ico-earth.svg';
import { planets } from '../../../utils/mockdata/planets-data';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

function PlanetsRoutes({ setSelectedPlanet }) {
    const [activeRoute, setActiveRoute] = useState(null);
    const [lineCoords, setLineCoords] = useState(null);

    const handlePlanetClick = (planetId) => {
        if (planetId === activeRoute) {
            setActiveRoute(null);
            setSelectedPlanet(null);
        } else {
            setActiveRoute(planetId);
            setSelectedPlanet(planetId);
        }
    };

    const getLineCoordinates = () => {
        if (!activeRoute) return null;

        const earthElement = document.getElementById('earth');
        const planetElement = document.getElementById(activeRoute);

        if (!earthElement || !planetElement) return null;

        // Get the image elements specifically
        const earthImage = earthElement.querySelector('.planet__container-image img');
        const planetImage = planetElement.querySelector('.planet__container-image img');


        if (!earthImage || !planetImage) return null;

        const earthRect = earthImage.getBoundingClientRect();
        const planetRect = planetImage.getBoundingClientRect();

        // Calculate coordinates relative to the container
        const earthCenterX = earthRect.left + window.scrollX + earthRect.width / 2;
        const earthCenterY = earthRect.top + window.scrollY + earthRect.height / 2;

        const planetCenterX = planetRect.left + window.scrollX + planetRect.width / 2;
        const planetCenterY = planetRect.top + window.scrollY + planetRect.height / 2;

        // Calculate control point for the curve
        const controlX = (earthCenterX + planetCenterX + 60) / 2;
        const controlY = earthCenterY - 10;

        // Calculate dynamic t value based on planet position
        // Get viewport width to determine screen position
        const viewportWidth = window.innerWidth;
        const planetScreenPosition = planetCenterX / viewportWidth;
        
        // Adjust t based on horizontal position: left side = smaller t, right side = larger t
        // Map from 0-1 screen position to 0.6-0.8 t range
        const t = 0.7 - (planetScreenPosition * 0.01);
        let yOffset = 0;
        if (planetScreenPosition > 0.5) {
            yOffset = planetScreenPosition * (-60);
        } else {
            yOffset = planetScreenPosition * 50;
        }
        
        // Calculate a point on the quadratic Bézier curve
        // For a quadratic Bézier curve: B(t) = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
        const midX = Math.pow(1-t, 2) * earthCenterX + 2 * (1-t) * t * controlX + Math.pow(t, 2) * planetCenterX;
        const midY = Math.pow(1-t, 2) * earthCenterY + 2 * (1-t) * t * controlY + Math.pow(t, 2) * planetCenterY - yOffset;
        return {
            x1: earthCenterX,
            y1: earthCenterY,
            x2: planetCenterX,
            y2: planetCenterY,
            midX: midX,
            midY: midY
        };
    };

    useEffect(() => {
        if (activeRoute) {
            const coords = getLineCoordinates();
            setLineCoords(coords);
        } else {
            setLineCoords(null);
        }
    }, [activeRoute]);

    // Add resize listener to recalculate coordinates when window resizes
    useEffect(() => {
        const handleResize = () => {
            if (activeRoute) {
                const coords = getLineCoordinates();
                setLineCoords(coords);
            }
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [activeRoute]);

    return (
        <>
            <section className="planets-routes" id="planets-routes-section">
                <div id="planets-routes-section-start" style={{ position: 'absolute', top: '-11.2rem' }}></div>
                <div className="planets-routes__container">
                    <div className="planets-routes__container-planets">
                        {planets.map((planet) => ( planet.planetId !== 'unknown' && (
                            <Planet 
                                key={planet.name} 
                                planetId={planet.planetId} 
                                planetImageSrc={planet.imageSrc} 
                                planetName={planet.name} 
                                planetSize={planet.planetSize}
                                isActive={activeRoute === planet.planetId}
                                onPlanetClick={(planetId) => handlePlanetClick(planetId)}
                            />
                        )))}
                    </div>

                    <div className="planets-routes__container-start-planet">
                        <Planet planetId="earth" planetImageSrc={earthImageSrc} planetSize={250} />
                    </div>
                </div>
            </section>
            
            <AnimatePresence mode="wait">
                {activeRoute && lineCoords && (
                    <motion.svg
                        key={activeRoute}
                        className="route-svg"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                            zIndex: 1
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.path
                            d={`M ${lineCoords.x1} ${lineCoords.y1} Q ${(lineCoords.x1 + lineCoords.x2 + 60) / 2} ${lineCoords.y1 - 10} ${lineCoords.x2} ${lineCoords.y2}`}
                            stroke="#EEEEEE"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ 
                                duration: 1,
                                ease: "easeInOut"
                            }}
                        />
                        
                        {/* Route Information */}
                        <motion.text
                            x={lineCoords.midX + 20}
                            y={lineCoords.midY - 15}
                            fill="#EEEEEE"
                            className="body-small"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ 
                                opacity: { delay: 0.5, duration: 0.3 },
                                type: "spring",
                                stiffness: 100
                            }}
                        >
                            {Array.from("Distance: " + (planets.find(p => p.planetId === activeRoute)?.distance || "")).map((char, index) => (
                                <motion.tspan
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        delay: 0.5 + (index * 0.05),
                                        duration: 0.1
                                    }}
                                >
                                    {char}
                                </motion.tspan>
                            ))}
                        </motion.text>
                        
                        <motion.text
                            x={lineCoords.midX + 20}
                            y={lineCoords.midY + 5}
                            fill="#EEEEEE"
                            className="body-small"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ 
                                opacity: { delay: 0.7, duration: 0.3 },
                                type: "spring",
                                stiffness: 100
                            }}
                        >
                            {Array.from("Travel time: " + (planets.find(p => p.planetId === activeRoute)?.travelTime || "")).map((char, index) => (
                                <motion.tspan
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        delay: 0.7 + (index * 0.05),
                                        duration: 0.1
                                    }}
                                >
                                    {char}
                                </motion.tspan>
                            ))}
                        </motion.text>
                    </motion.svg>
                )}
            </AnimatePresence>
        </>
    )
}

export default PlanetsRoutes;