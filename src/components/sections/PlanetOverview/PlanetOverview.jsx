import { planets } from '../../../utils/mockdata/planets-data';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

function PlanetOverview({ selectedPlanet }) {

    const [currentPlanet, setCurrentPlanet] = useState(planets[0]);

    useEffect(() => {
        if (selectedPlanet) {
            setCurrentPlanet(planets.find(planet => planet.planetId === selectedPlanet));
        }
        else {
            setCurrentPlanet(planets[0]);
        }
    }, [selectedPlanet]);

    const handleSmoothScroll = () => {
        const targetElement = document.getElementById('planets-routes-section-start');
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <section className="planet-overview" id="planet-overview-section">
            <div className="planet-overview__container">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={currentPlanet.planetId}
                        className="planet-overview__container-planet-image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img src={currentPlanet.imageSrc} alt={currentPlanet.name} />
                    </motion.div>
                </AnimatePresence>
                
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={`${currentPlanet.planetId}-info`}
                        className="planet-overview__container-planet-info"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.h2 
                            className="heading-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            {currentPlanet.name}
                        </motion.h2>
                        
                        <motion.p 
                            className="body-regular"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                        >
                            <strong>Average Temperature:</strong> {currentPlanet.temperature}
                        </motion.p>
                        
                        <motion.p 
                            className="body-regular"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                        >
                            <strong>Dimensions:</strong> {currentPlanet.dimensions}
                        </motion.p>
                        
                        <motion.p 
                            className="body-regular"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                        >
                            <strong>Weather:</strong> {currentPlanet.weather}
                        </motion.p>
                        
                        <motion.p 
                            className="body-regular"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.4 }}
                        >
                            <strong>Atmosphere:</strong> {currentPlanet.atmosphere}
                        </motion.p>
                        
                        <motion.p 
                            className="body-regular"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7, duration: 0.4 }}
                        >
                            <strong>Gravity:</strong> {currentPlanet.gravity}
                        </motion.p>
                        
                        {currentPlanet.funFact && (
                            <motion.p 
                                className="body-regular fun-fact"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.4 }}
                            >
                                <strong>Fun Fact:</strong> {currentPlanet.funFact}
                            </motion.p>
                        )}
                        
                        {!currentPlanet.funFact && (
                            <motion.p 
                                className="body-regular no-fun-fact"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.4 }}
                            >
                                Please <button 
                                    onClick={handleSmoothScroll}
                                    className="body-regular btn-anchor"
                                >
                                    choose
                                </button> the planet you want to visit
                            </motion.p>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}

export default PlanetOverview;