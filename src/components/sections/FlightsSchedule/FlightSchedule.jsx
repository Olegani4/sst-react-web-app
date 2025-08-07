import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { flights } from '../../../utils/mockdata/flights-data';

function FlightSchedule() {
    const [selectedFlights, setSelectedFlights] = useState([]);
    const [seatsPerFlight, setSeatsPerFlight] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [showSortModal, setShowSortModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [sortConfig, setSortConfig] = useState({
        field: 'launchDate',
        direction: 'asc'
    });
    const [tempSortConfig, setTempSortConfig] = useState({
        field: 'launchDate',
        direction: 'asc'
    });
    const [filterConfig, setFilterConfig] = useState({
        departureStation: '',
        priceRange: { min: '', max: '' },
        seatsRange: { min: '', max: '' },
        dateRange: { start: '', end: '' }
    });
    const [tempFilterConfig, setTempFilterConfig] = useState({
        departureStation: '',
        priceRange: { min: '', max: '' },
        seatsRange: { min: '', max: '' },
        dateRange: { start: '', end: '' }
    });
    const flightsPerPage = 5;

    // Filter flights
    const filteredFlights = flights.filter(flight => {
        // Filter by departure station
        if (filterConfig.departureStation && 
            !flight.departureStation.toLowerCase().includes(filterConfig.departureStation.toLowerCase())) {
            return false;
        }

        // Filter by price range
        if (filterConfig.priceRange.min && flight.price < Number(filterConfig.priceRange.min)) {
            return false;
        }
        if (filterConfig.priceRange.max && flight.price > Number(filterConfig.priceRange.max)) {
            return false;
        }

        // Filter by seats range
        if (filterConfig.seatsRange.min && flight.seatsLeft < Number(filterConfig.seatsRange.min)) {
            return false;
        }
        if (filterConfig.seatsRange.max && flight.seatsLeft > Number(filterConfig.seatsRange.max)) {
            return false;
        }

        // Filter by date range
        if (filterConfig.dateRange.start || filterConfig.dateRange.end) {
            const flightDate = new Date(flight.launchDate);
            if (filterConfig.dateRange.start) {
                const startDate = new Date(filterConfig.dateRange.start);
                if (flightDate < startDate) return false;
            }
            if (filterConfig.dateRange.end) {
                const endDate = new Date(filterConfig.dateRange.end);
                if (flightDate > endDate) return false;
            }
        }

        return true;
    });

    // Flights sorting
    const sortedFlights = [...filteredFlights].sort((a, b) => {
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

    const openSortModal = () => {
        setTempSortConfig(sortConfig); // Initialize temp config with current config
        setShowSortModal(true);
    };

    const closeSortModal = () => {
        setShowSortModal(false);
    };

    const handleSort = (field) => {
        setTempSortConfig(prev => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const applySort = () => {
        setSortConfig(tempSortConfig);
        setCurrentPage(1); // Reset to first page when sorting
        closeSortModal();
    };

    const openFilterModal = () => {
        setTempFilterConfig(filterConfig); // Initialize temp config with current config
        setShowFilterModal(true);
    };

    const closeFilterModal = () => {
        setShowFilterModal(false);
    };

    const handleFilterChange = (field, value) => {
        setTempFilterConfig(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleRangeFilterChange = (rangeType, bound, value) => {
        setTempFilterConfig(prev => ({
            ...prev,
            [rangeType]: {
                ...prev[rangeType],
                [bound]: value
            }
        }));
    };

    const clearFilters = () => {
        setTempFilterConfig({
            departureStation: '',
            priceRange: { min: '', max: '' },
            seatsRange: { min: '', max: '' },
            dateRange: { start: '', end: '' }
        });
    };

    const applyFilters = () => {
        setFilterConfig(tempFilterConfig);
        setCurrentPage(1); // Reset to first page when filtering
        closeFilterModal();
    };

    // Get unique departure stations for filter dropdown
    const uniqueStations = [...new Set(flights.map(flight => flight.departureStation))];

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
                        <button className="btn-table" onClick={openFilterModal}>Filter</button>
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
                                            className={`sort-option ${tempSortConfig.field === option.field ? 'active' : ''}`}
                                            onClick={() => handleSort(option.field)}
                                        >
                                            <span className="sort-option__label body-regular">{option.label}</span>
                                            {tempSortConfig.field === option.field && (
                                                <span className="sort-option__direction">
                                                    {tempSortConfig.direction === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="sort-modal__footer">
                                <button className="sort-modal__apply body-regular" onClick={applySort}>
                                    Apply
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Filter Modal */}
            <AnimatePresence>
                {showFilterModal && (
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeFilterModal}
                    >
                        <motion.div 
                            className="filter-modal"
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="filter-modal__header">
                                <h3 className="filter-modal__title body-large">Filter Flights</h3>
                                <button className="filter-modal__close" onClick={closeFilterModal}>×</button>
                            </div>
                            <div className="filter-modal__content">
                                <div className="filter-section">
                                    <h4 className="filter-section__title body-regular">Departure Station</h4>
                                    <input
                                        type="text"
                                        placeholder="Enter station name..."
                                        value={tempFilterConfig.departureStation}
                                        onChange={(e) => handleFilterChange('departureStation', e.target.value)}
                                        className="filter-input"
                                    />
                                </div>

                                <div className="filter-section">
                                    <h4 className="filter-section__title body-regular">Price Range</h4>
                                    <div className="filter-range">
                                        <input
                                            type="number"
                                            placeholder="Min price"
                                            value={tempFilterConfig.priceRange.min}
                                            onChange={(e) => handleRangeFilterChange('priceRange', 'min', e.target.value)}
                                            className="filter-input"
                                        />
                                        <span className="filter-range__separator">-</span>
                                        <input
                                            type="number"
                                            placeholder="Max price"
                                            value={tempFilterConfig.priceRange.max}
                                            onChange={(e) => handleRangeFilterChange('priceRange', 'max', e.target.value)}
                                            className="filter-input"
                                        />
                                    </div>
                                </div>

                                <div className="filter-section">
                                    <h4 className="filter-section__title body-regular">Seats Available</h4>
                                    <div className="filter-range">
                                        <input
                                            type="number"
                                            placeholder="Min seats"
                                            value={tempFilterConfig.seatsRange.min}
                                            onChange={(e) => handleRangeFilterChange('seatsRange', 'min', e.target.value)}
                                            className="filter-input"
                                        />
                                        <span className="filter-range__separator">-</span>
                                        <input
                                            type="number"
                                            placeholder="Max seats"
                                            value={tempFilterConfig.seatsRange.max}
                                            onChange={(e) => handleRangeFilterChange('seatsRange', 'max', e.target.value)}
                                            className="filter-input"
                                        />
                                    </div>
                                </div>

                                <div className="filter-section">
                                    <h4 className="filter-section__title body-regular">Launch Date Range</h4>
                                    <div className="filter-range">
                                        <input
                                            type="date"
                                            value={tempFilterConfig.dateRange.start}
                                            onChange={(e) => handleRangeFilterChange('dateRange', 'start', e.target.value)}
                                            className="filter-input"
                                        />
                                        <span className="filter-range__separator">-</span>
                                        <input
                                            type="date"
                                            value={tempFilterConfig.dateRange.end}
                                            onChange={(e) => handleRangeFilterChange('dateRange', 'end', e.target.value)}
                                            className="filter-input"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="filter-modal__footer">
                                <button className="filter-modal__clear body-regular" onClick={clearFilters}>
                                    Clear All
                                </button>
                                <button className="filter-modal__apply body-regular" onClick={applyFilters}>
                                    Apply Filters
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