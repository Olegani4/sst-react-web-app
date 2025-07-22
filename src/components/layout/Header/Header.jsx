import logoWithText from '../../../assets/icons/logo/logo-sst-with-text.svg';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

function Header() {
    const [isAtPlanetsRoutes, setIsAtPlanetsRoutes] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const planetsRoutesSection = document.getElementById('planets-routes-section');
            if (planetsRoutesSection) {
                const rect = planetsRoutesSection.getBoundingClientRect();
                setIsAtPlanetsRoutes(rect.top <= 111.75);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="header" id="header">
            <motion.div className={`header__container ${isAtPlanetsRoutes ? 'header__container-flex-sb' : 'header__container-flex-col'}`}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <a href="/" className="header__logo">
                    <img src={logoWithText} alt="logo" draggable='false' />
                </a>
                <div className="header__slogan">
                    <p className="header__slogan-text heading-3">Explore the Solar System like never before</p>
                </div>
            </motion.div>
        </header>
    )
}

export default Header;