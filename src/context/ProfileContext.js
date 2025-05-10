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
        fetchProfile();
    }, []);
    
    const fetchProfile = async () => {
        try {
        const response = await axiosAdminInstance.get('/getAlladmin');
            setProfile(response.data);
            console.log("Fetched Profile:", response.data);

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
