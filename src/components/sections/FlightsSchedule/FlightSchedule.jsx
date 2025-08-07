import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { flights } from '../../../utils/mockdata/flights-data';

function FlightSchedule() {
    const [selectedFlights, setSelectedFlights] = useState([]);
    const [seatsPerFlight, setSeatsPerFlight] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [showSortModal, setShowSortModal] = useState(false);
    const [sortConfig, setSortConfig] = useState({
        field: 'launchDate',
        direction: 'asc'
    });
    const flightsPerPage = 5;

    // Flights sorting
    const sortedFlights = [...flights].sort((a, b) => {
        let aValue = a[sortConfig.field];
        let bValue = b[sortConfig.field];
        
        if (sortConfig.field === 'launchDate') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }
        
        if (sortConfig.field === 'price' || sortConfig.field === 'seatsLeft') {
            aValue = Number(aValue);
            bValue = Number(bValue);
        }
        
        if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedFlights.length / flightsPerPage);
    const startIndex = (currentPage - 1) * flightsPerPage;
    const endIndex = startIndex + flightsPerPage;
    const currentFlights = sortedFlights.slice(startIndex, endIndex);

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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSort = (field) => {
        setSortConfig(prev => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
        setCurrentPage(1); // Reset to first page when sorting
    };

    const openSortModal = () => {
        setShowSortModal(true);
    };

    const closeSortModal = () => {
        setShowSortModal(false);
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 10;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 5) {
                for (let i = 1; i <= 10; i++) {
                    pages.push(i);
                }
            } else if (currentPage >= totalPages - 4) {
                for (let i = totalPages - 9; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                    pages.push(i);
                }
            }
        }
        return pages;
    };

    const sortOptions = [
        { field: 'launchDate', label: 'Launch Date' },
        { field: 'departureStation', label: 'Departure Station' },
        { field: 'seatsLeft', label: 'Seats Left' },
        { field: 'price', label: 'Price' }
    ];

    return (
        <section className="flight-schedule" id="flights-schedule-section">
            <div className="flight-schedule__container">
                <div className="flight-schedule__header">
                    <div>&nbsp;</div>
                    <h2 className="flight-schedule__title heading-1">Flight Schedule</h2>
                    <div className="flight-schedule__buttons">
                        <button className="btn-table" onClick={openSortModal}>Sort</button>
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
                                {currentFlights.map((flight) => (
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
                            {getPageNumbers().map((page) => (
                                <span 
                                    key={page}
                                    className={`page ${page === currentPage ? 'active' : ''}`}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <AnimatePresence>
                        {selectedFlights.length > 0 && (
                            <motion.div 
                                className="flight-schedule__selection"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ 
                                    duration: 0.3,
                                    ease: "easeOut"
                                }}
                            >
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
                                    <div className='pay-btn-container'>
                                        <button className="pay-btn body-large">Pay</button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Sort Modal */}
            <AnimatePresence>
                {showSortModal && (
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSortModal}
                    >
                        <motion.div 
                            className="sort-modal"
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="sort-modal__header">
                                <h3 className="sort-modal__title body-large">Sort Flights</h3>
                                <button className="sort-modal__close" onClick={closeSortModal}>×</button>
                            </div>
                            <div className="sort-modal__content">
                                <div className="sort-options">
                                    {sortOptions.map((option) => (
                                        <div 
                                            key={option.field}
                                            className={`sort-option ${sortConfig.field === option.field ? 'active' : ''}`}
                                            onClick={() => handleSort(option.field)}
                                        >
                                            <span className="sort-option__label body-regular">{option.label}</span>
                                            {sortConfig.field === option.field && (
                                                <span className="sort-option__direction">
                                                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="sort-modal__footer">
                                <button className="sort-modal__apply body-regular" onClick={closeSortModal}>
                                    Apply
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default FlightSchedule;