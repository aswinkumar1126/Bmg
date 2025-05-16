import React, { useContext, useState, useEffect, useRef } from "react";
import { ProfileContext } from "../../../context/ProfileContext";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import ErrorComponent from "../../../components/ErrorComponent";
import "./AdminProfile.css";

const ProfilePage = () => {
    const { profile, loading, error, fetchProfile, updateProfile } = useContext(ProfileContext);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        mobileNumber: "",
        email: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        const id = localStorage.getItem("auth_id");
        if (id) fetchProfile(id);
    }, [fetchProfile]);

    useEffect(() => {
        if (profile) {
            setFormData({
                mobileNumber: profile.mobileNumber || "",
                email: profile.email || "",
            });
            setPreviewImage(profile.image || null);
        }
    }, [profile]);

    useEffect(() => {
        return () => {
            if (previewImage?.startsWith("blob:")) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Image size should be less than 2MB");
                return;
            }
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            mobileNumber: profile.mobileNumber || "",
            email: profile.email || "",
        });
        setImageFile(null);
        setPreviewImage(profile.image || null);
    };

    const handleUpdate = async () => {
        setIsSubmitting(true);
        try {
            const updatedData = {
                admin: {
                    ...formData,
                },
                imageFile,
            };
            await updateProfile(profile.id, updatedData);
            setIsEditing(false);
            setImageFile(null);
        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const openFilePicker = () => {
        if (isEditing && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    if (loading) return <LoadingSkeleton />;
    if (error) return <ErrorComponent message={error} />;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2 className="profile-heading">Admin Profile</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="btn edit-btn"
                        aria-label="Edit profile"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="profile-content">
                <div className="profile-image-container">
                    <div className="profile-image-wrapper">
                        {previewImage ? (
                            <div className="image-container">
                                <img
                                    src={
                                        previewImage?.startsWith("http") || previewImage?.startsWith("blob:")
                                            ? previewImage
                                            : `http://localhost:8080/api/v1/admin/profile/images/${previewImage}`
                                    }
                                    alt="Admin"
                                    className={`profile-image ${isEditing ? "editable" : ""}`}
                                    onClick={openFilePicker}
                                />
                                {isEditing && (
                                    <div className="image-overlay" onClick={openFilePicker}>
                                        <span className="edit-icon">✏️</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div
                                className={`no-image ${isEditing ? "editable" : ""}`}
                                onClick={openFilePicker}
                            >
                                <span>+ Add Photo</span>
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        aria-hidden="true"
                    />
                </div>

                <div className="profile-details">
                    <div className="detail-section">
                        <h3 className="section-title">Personal Information</h3>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <p className="readonly-value">{profile.name}</p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="mobileNumber">Mobile Number</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    className="form-input"
                                    pattern="[0-9]{10}"
                                    title="Please enter a 10-digit mobile number"
                                />
                            ) : (
                                <p className="readonly-value">{profile.mobileNumber || "Not provided"}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            ) : (
                                <p className="readonly-value">{profile.email}</p>
                            )}
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3 className="section-title">Account Information</h3>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <p className="readonly-value">••••••••</p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="registeredAt">Registered At</label>
                            <p className="readonly-value">
                                {new Date(profile.registerAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="adminId">Admin ID</label>
                            <p className="readonly-value">{profile.id}</p>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="action-buttons">
                            <button
                                onClick={handleUpdate}
                                className="btn update-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Updating...' : 'Save Changes'}
                            </button>
                            <button
                                onClick={handleCancel}
                                className="btn cancel-btn"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;