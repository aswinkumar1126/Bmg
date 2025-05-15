import React, { createContext, useState, useContext, useEffect } from 'react';
import * as rateService from '../services/rate/rateService'; // import all as rateService

const RateContext = createContext();

const RateProvider = ({ children }) => {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch rates with optional pagination support
    const fetchRates = async (page = 1, limit = 10) => {
        setLoading(true);
        setError(null);
        try {
            const data = await rateService.fetchRates(page, limit);
            setRates(data.data || data);  // If paginated, use data.data, else use data
        } catch (err) {
            setError(err.message || 'Error fetching rates');
        } finally {
            setLoading(false);
        }
    };

    // Add a new rate
    const addRate = async (newRate) => {
        setLoading(true);
        setError(null);
        try {
            const addedRate = await rateService.addRate(newRate);
            setRates(prev => [...prev, addedRate]);
            return addedRate;
        } catch (err) {
            setError(err.message || 'Error adding rate');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update a rate by ID
    const updateRate = async (id, updatedRate) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await rateService.updateRate(id, updatedRate);
            setRates(prev => prev.map(rate => (rate.id === id ? updated : rate)));
            return updated;
        } catch (err) {
            setError(err.message || 'Error updating rate');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete a rate by ID
    const deleteRate = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await rateService.deleteRate(id);
            setRates(prev => prev.filter(rate => rate.id !== id));
        } catch (err) {
            setError(err.message || 'Error deleting rate');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    return (
        <RateContext.Provider value={{
            rates,
            loading,
            error,
            fetchRates,
            addRate,
            updateRate,
            deleteRate
        }}>
            {children}
        </RateContext.Provider>
    );
};

const useRate = () => useContext(RateContext);

export { RateProvider, useRate };
