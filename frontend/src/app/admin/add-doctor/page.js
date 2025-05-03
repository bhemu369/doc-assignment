'use client';

import React, { useState } from 'react';
import { addDoctor } from '../../services/api';
import Header from '../../components/Header/Header';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const AddDoctorPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        specialization: 'General Physician',
        experience: 0,
        qualifications: '',
        city: '',
        state: '',
        clinic: 'Apollo 24|7 Virtual Clinic',
        rating: 0,
        patientCount: 0,
        price: 0,
        cashback: 0,
        availableTime: '',
        isOnline: true,
        gender: 'Male',
        imageUrl: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'qualifications') {
            // Convert comma-separated string to array
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Format data for API
            const doctorData = {
                ...formData,
                experience: Number(formData.experience),
                qualifications: formData.qualifications.split(',').map(q => q.trim()).filter(q => q),
                rating: Number(formData.rating),
                patientCount: Number(formData.patientCount),
                price: Number(formData.price),
                cashback: Number(formData.cashback),
                location: {
                    city: formData.city,
                    state: formData.state
                }
            };

            // Remove the individual city and state fields before sending
            delete doctorData.city;
            delete doctorData.state;

            const response = await addDoctor(doctorData);

            if (response.success) {
                setSuccess(true);
                // Reset form
                setFormData({
                    name: '',
                    specialization: 'General Physician',
                    experience: 0,
                    qualifications: '',
                    city: '',
                    state: '',
                    clinic: 'Apollo 24|7 Virtual Clinic',
                    rating: 0,
                    patientCount: 0,
                    price: 0,
                    cashback: 0,
                    availableTime: '',
                    isOnline: true,
                    gender: 'Male',
                    imageUrl: ''
                });

                // Redirect after 2 seconds
                setTimeout(() => {
                    router.push('/specialties/general-physician-internal-medicine');
                }, 2000);
            } else {
                setError('Failed to add doctor');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while adding the doctor');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Add New Doctor</h1>

                    {success && (
                        <div className={styles.successMessage}>
                            Doctor added successfully! Redirecting...
                        </div>
                    )}

                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Doctor Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="specialization">Specialization *</label>
                                <select
                                    id="specialization"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    required
                                    className={styles.select}
                                >
                                    <option value="General Physician">General Physician</option>
                                    <option value="Internal Medicine Specialist">Internal Medicine Specialist</option>
                                    <option value="General Practitioner">General Practitioner</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="gender">Gender *</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className={styles.select}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="experience">Years of Experience *</label>
                                <input
                                    type="number"
                                    id="experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="qualifications">Qualifications (comma-separated) *</label>
                                <input
                                    type="text"
                                    id="qualifications"
                                    name="qualifications"
                                    value={formData.qualifications}
                                    onChange={handleChange}
                                    placeholder="MBBS, MD, etc."
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="city">City *</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="state">State *</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="clinic">Clinic Name *</label>
                            <input
                                type="text"
                                id="clinic"
                                name="clinic"
                                value={formData.clinic}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="price">Consultation Price (₹) *</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="cashback">Cashback Amount (₹)</label>
                                <input
                                    type="number"
                                    id="cashback"
                                    name="cashback"
                                    value={formData.cashback}
                                    onChange={handleChange}
                                    min="0"
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="rating">Rating (0-100)</label>
                                <input
                                    type="number"
                                    id="rating"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    min="0"
                                    max="100"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="patientCount">Patient Count</label>
                                <input
                                    type="number"
                                    id="patientCount"
                                    name="patientCount"
                                    value={formData.patientCount}
                                    onChange={handleChange}
                                    min="0"
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="availableTime">Available Time</label>
                                <input
                                    type="text"
                                    id="availableTime"
                                    name="availableTime"
                                    value={formData.availableTime}
                                    onChange={handleChange}
                                    placeholder="e.g., 30 minutes, 2:30 PM"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="imageUrl">Image URL</label>
                                <input
                                    type="text"
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.checkboxContainer}>
                                Available Online
                                <input
                                    type="checkbox"
                                    name="isOnline"
                                    checked={formData.isOnline}
                                    onChange={handleChange}
                                />
                                <span className={styles.checkmark}></span>
                            </label>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Adding...' : 'Add Doctor'}
                            </button>

                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={() => router.push('/specialties/general-physician-internal-medicine')}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddDoctorPage; 