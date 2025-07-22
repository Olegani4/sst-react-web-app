import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

function FlightSchedule() {
    const [selectedFlights, setSelectedFlights] = useState([]);
    const [seatsPerFlight, setSeatsPerFlight] = useState({});

    const flights = [
        {
            id: 1,
            launchDate: "Aug 15, 2087",
            departureStation: "Earth Orbital Station",
            seatsLeft: 5,
            price: 120
        },
        {
            id: 2,
            launchDate: "Nov 30, 2087",
            departureStation: "Earth Spaceport Alpha",
            seatsLeft: 12,
            price: 105
        },
        {
            id: 3,
            launchDate: "Jan 10, 2088",
            departureStation: "Earth Deep Launch",
            seatsLeft: 8,
            price: 130
        },
        {
            id: 4,
            launchDate: "Apr 22, 2088",
            departureStation: "Earth Polar Platform",
            seatsLeft: 3,
            price: 115
        }
    ];

    const handleFlightSelect = (flight) => {
        setSelectedFlights(prev => {
            const isSelected = prev.find(f => f.id === flight.id);
            if (isSelected) {
                // Remove flight if already selected
                const newSeats = { ...seatsPerFlight };
                delete newSeats[flight.id];
                setSeatsPerFlight(newSeats);
                return prev.filter(f => f.id !== flight.id);
            } else {
                // Add flight if not selected
                setSeatsPerFlight(prev => ({
                    ...prev,
                    [flight.id]: 1
                }));
                return [...prev, flight];
            }
        });
    };

    const handleSeatsChange = (flightId, increment) => {
        const currentSeats = seatsPerFlight[flightId] || 1;
        const flight = selectedFlights.find(f => f.id === flightId);
        
        if (flight) {
            const newSeats = currentSeats + increment;
            if (newSeats >= 1 && newSeats <= flight.seatsLeft) {
                setSeatsPerFlight(prev => ({
                    ...prev,
                    [flightId]: newSeats
                }));
            }
        }
    };

    const removeFlight = (flightId) => {
        setSelectedFlights(prev => prev.filter(f => f.id !== flightId));
        setSeatsPerFlight(prev => {
            const newSeats = { ...prev };
            delete newSeats[flightId];
            return newSeats;
        });
    };

    const totalPrice = selectedFlights.reduce((total, flight) => {
        const seats = seatsPerFlight[flight.id] || 1;
        return total + (flight.price * seats);
    }, 0);

    const isFlightSelected = (flightId) => {
        return selectedFlights.some(f => f.id === flightId);
    };

    return (
        <section className="flight-schedule" id="flights-schedule-section">
            <div className="flight-schedule__container">
                <div className="flight-schedule__header">
                    <div>&nbsp;</div>
                    <h2 className="flight-schedule__title heading-1">Flight Schedule</h2>
                    <div className="flight-schedule__buttons">
                        <button className="btn-table">Sort</button>
                        <button className="btn-table">Filter</button>
                    </div>
                </div>
                <div className="flight-schedule__content">
                    <div className="flight-schedule__content-table">
                        <table>
                            <thead>
                                <tr>
                                    <th className='body-large'>Launch date</th>
                                    <th className='body-large'>Departure station</th>
                                    <th className='body-large'>Seats left</th>
                                    <th className='body-large'>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.map((flight) => (
                                    <tr 
                                        key={flight.id}
                                        className={isFlightSelected(flight.id) ? 'selected' : ''}
                                        onClick={() => handleFlightSelect(flight)}
                                    >
                                        <td className='body-regular'>{flight.launchDate}</td>
                                        <td className='body-regular'>{flight.departureStation}</td>
                                        <td className='body-regular'>{flight.seatsLeft}</td>
                                        <td className='body-regular'>{flight.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flight-schedule__pagination">
                        <div className="pagination-controls">
                            <span className="page active">1</span>
                            <span className="page">2</span>
                            <span className="page">3</span>
                            <span className="page">4</span>
                            <span className="page">5</span>
                            <span className="page">6</span>
                            <span className="page">7</span>
                            <span className="page">8</span>
                            <span className="page">9</span>
                            <span className="page">10</span>
                            <span className="next">Next</span>
                        </div>
                    </div>
                    
                    <div className="flight-schedule__selection">
                        <div className="flight-schedule__selection-details">
                            <h3 className='body-large'>Your Selection</h3>
                            <div className='flight-schedule__selection-details-selected-cards'>
                                <AnimatePresence>
                                    {selectedFlights.map((flight, index) => (
                                        <motion.div 
                                            key={flight.id} 
                                            className="selection-card"
                                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                            transition={{ 
                                                duration: 0.3,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <button 
                                                className="close-btn" 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFlight(flight.id);
                                                }}
                                            >
                                                ×
                                            </button>
                                            <div className="selection-info">
                                                <div className='selection-info-header'>
                                                    <p className='body-regular'>{flight.launchDate}</p>
                                                    <p className='body-regular'>{flight.departureStation}</p>
                                                </div>
                                                <div className='selection-info-details'>
                                                    <p className='body-small'>Price per seat:</p>
                                                    <p className='body-small value'>{flight.price}</p>
                                                    <p className='body-small'>Seats:</p>
                                                    <p className='body-small value'>{seatsPerFlight[flight.id] || 1}</p>
                                                </div>
                                                
                                                <div className="seats-control">
                                                    <div className="seats-buttons">
                                                        <button onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleSeatsChange(flight.id, -1);
                                                        }}>-</button>
                                                        <button onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleSeatsChange(flight.id, 1);
                                                        }}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                        
                        <div className="flight-schedule__total">
                            <h3 className='body-large'>Total</h3>
                            <div className="total-amount body-super-large">{totalPrice}</div>
                            <AnimatePresence>
                                {totalPrice > 0 && (
                                    <motion.div 
                                        className='pay-btn-container'
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ 
                                            duration: 0.3,
                                            ease: "easeOut"
                                        }}
                                    >
                                        <button className="pay-btn body-large">Pay</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                
                </div>
            </div>
        </section>
    )
}

export default FlightSchedule;