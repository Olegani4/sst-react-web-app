import { motion } from 'motion/react';

function ServiceOverview() {
    return (
        <section className="service-overview" id="service-overview-section">
            <div className="service-overview__container">
                <motion.h1 className="service-overview__title heading-1"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >Available Travel to Any Solar System Planet</motion.h1>
                <motion.h2 className="service-overview__subtitle heading-2"
                    initial={{ opacity: 0, y: -25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75 }}>Are you ready to start your journey?</motion.h2>
                <motion.h3 className="service-overview__subtitle heading-3"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}>Just choose the planet</motion.h3>
            </div>
        </section>
    )
}

export default ServiceOverview;