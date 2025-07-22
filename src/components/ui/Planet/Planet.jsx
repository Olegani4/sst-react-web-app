import { motion } from 'motion/react';

function Planet({planetId, planetImageSrc, planetName = null, planetSize = 100, isActive = false, onPlanetClick}) {
    const handlePlanetClick = () => {
        // Check if the planet is a valid planet for the route
        if (planetId === 'mercury' || planetId === 'venus' || planetId === 'mars' || planetId === 'jupiter' 
            || planetId === 'saturn' || planetId === 'uranus' || planetId === 'neptune') {
            onPlanetClick(planetId);
        }
    }

    return (
        <motion.div 
            className={`planet ${isActive ? 'planet--active' : ''}`} 
            id={planetId} 
            onClick={() => handlePlanetClick(planetId)}
            animate={{
                filter: isActive ? 'brightness(1) drop-shadow(0 0 10px #eeeeee)' : 'brightness(1)'
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="planet__container">
                <div className="planet__container-name">
                    {planetName && <p className="planet__container-name-text heading-3">{planetName}</p>}
                </div>
                <div className="planet__container-image">
                    <img src={planetImageSrc} alt="Planet" draggable='false' style={{ width: planetSize }} />
                </div>
            </div>
        </motion.div>
    )
}

export default Planet;