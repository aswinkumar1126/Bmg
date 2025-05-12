import { createContext, useState } from 'react';
import { axiosAdminInstance } from '../api/axios';
import { useEffect } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({});

    const updateProfile = (newProfile) => {
        setProfile(newProfile);
    };

    useEffect(() => {
        const id = localStorage.getItem('auth id');
        if (id) {
            fetchProfile(id);
        }
    }, []);

    const fetchProfile = async (id) => {
        try {
            const response = await axiosAdminInstance.get(`/getAdmin/${id}`);
            console.log("Fetched Profile:", response.data);
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };
    
    
    return (
        <ProfileContext.Provider value={{ profile, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};
