import React, { useState } from 'react';
import './AdminProfile.css';

const AdminProfile = () => {
    const [profile] = useState({
        adminName: 'VJ Jewel admin',
        userName: 'sundar',
        contactNumber: '8979500000',
        email: 'admin@gmail.com',
        registrationDate: '2024-01-09 21:36:52',
    });

    return (
        <div className="admin-container">
            <h2 className="admin-title">Admin Profile</h2>

            <div className="breadcrumb">
                <span>Dashboard</span> / <span className="active">Admin Profile</span>
            </div>

            <div className="admin-card">
                <form>
                    <div className="form-group">
                        <label>Admin Name</label>
                        <input type="text" value={profile.adminName} readOnly />
                    </div>

                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" value={profile.userName} readOnly />
                    </div>

                    <div className="form-group">
                        <label>Contact Number</label>
                        <input type="text" value={profile.contactNumber} readOnly />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" value={profile.email} readOnly />
                    </div>

                    <div className="form-group">
                        <label>Registration Date</label>
                        <input type="text" value={profile.registrationDate} readOnly />
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;
