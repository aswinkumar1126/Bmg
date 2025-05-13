import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../api/axios'; // Assuming axiosInstance is your axios setup

const RateContext = createContext();

const RateProvider = ({ children }) => {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch rates for display
    const fetchRates = async () => {
        setLoading(true); // Set loading true when fetching
        try {
            const response = await axiosInstance.get('/rates');  // Adjust your API endpoint
            setRates(response.data); // Assuming API returns an array of rates
        } catch (err) {
            setError('Error fetching rates');
        } finally {
            setLoading(false); // Set loading false after the request finishes
        }
    };

    // Add new rate (POST) with rate data
    const addRate = async (newRate) => {
        setLoading(true); // Set loading true while adding the rate
        try {
            const rateData = {
                
                goldRate: newRate.goldRate,
                silverRate: newRate.silverRate,
                createdBy: newRate.createdBy,
                // Optional: add createdBy if needed
            };
            const response = await axiosInstance.post('/rate', rateData);
            setRates((prevRates) => [...prevRates, response.data]); // Add new rate to list
            return Promise.resolve(response.data); // Resolve the promise on success
        } catch (err) {
            setError('Error adding rate');
            return Promise.reject(err); // Reject the promise on error
        } finally {
            setLoading(false); // Set loading false after the request finishes
        }
    };

    // Update rate (PUT)
    const updateRate = async (id, updatedRate) => {
        setLoading(true); // Set loading true while updating the rate
        try {
            const rateData = {
                goldRate: updatedRate.goldRate,
                silverRate: updatedRate.silverRate,
                createdBy: updatedRate.createdBy, // Optional: add createdBy if needed
            };
            const response = await axiosInstance.put(`/rate/${id}`, rateData);  // PUT to the correct API endpoint
            const updatedRates = rates.map(rate =>
                rate.id === id ? response.data : rate
            );
            setRates(updatedRates); // Update the rate in state
            return Promise.resolve(response.data); // Resolve the promise on success
        } catch (err) {
            alert('Error updating rate');
            return Promise.reject(err); // Reject the promise on error
        } finally {
            setLoading(false); // Set loading false after the request finishes
        }
    };

    useEffect(() => {
        fetchRates();  // Fetch rates on component mount
    }, []);

    return (
        <RateContext.Provider value={{ rates, loading, error, addRate, updateRate, fetchRates }}>
            {children}
        </RateContext.Provider>
    );
};

const useRate = () => {
    return useContext(RateContext);
};

export { RateProvider, useRate };
