// src/context/ProfileContext.js

import { createContext, useState, useEffect, useCallback } from 'react';
import {
    getAdminById,
    updateAdmin,
    deleteAdmin,
} from '../services/profile/profileService';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch profile by id from localStorage or param


    const fetchProfile = useCallback(async (id) => {
        setLoading(true);
        try {
            const data = await getAdminById(id);
            setProfile(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching profile:', err);
            setError('Failed to fetch profile');
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * updatedData format: {
     *   admin: { mobileNumber, password, ... },
     *   imageFile: File | null
     * }
     */
    const updateProfile = async (id, updatedData) => {
        setLoading(true);
        try {
            const data = await updateAdmin(id, updatedData);
            setProfile(data);
            setError(null);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const deleteProfile = async (id) => {
        setLoading(true);
        try {
            await deleteAdmin(id);
            setProfile({});
            localStorage.removeItem('auth id');
            setError(null);
        } catch (err) {
            console.error('Error deleting profile:', err);
            setError('Failed to delete profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const id = localStorage.getItem('auth id');
        if (id) {
            fetchProfile(id);
        }
    }, [fetchProfile]);

    return (
        <ProfileContext.Provider
            value={{
                profile,
                loading,
                error,
                fetchProfile,
                updateProfile,
                deleteProfile,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};
