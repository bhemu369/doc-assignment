"use client";

import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import FilterBar from '../components/FilterBar/FilterBar';
import DoctorCard from '../components/DoctorCard/DoctorCard';
import Pagination from '../components/Pagination/Pagination';
import { fetchDoctors } from '../services/api';
import styles from './page.module.css';
import Link from 'next/link';

const DoctorsListingPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        specialization: '',
        city: '',
        gender: '',
        minExperience: '',
        isOnline: true
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalDocs: 0,
        limit: 10
    });

    // Fetch doctors data
    useEffect(() => {
        const loadDoctors = async () => {
            try {
                setLoading(true);
                const response = await fetchDoctors(filters, pagination.currentPage, pagination.limit);

                if (response.success) {
                    setDoctors(response.data.doctors);
                    setPagination(response.data.pagination);
                } else {
                    setError('Failed to fetch doctors');
                }
            } catch (error) {
                console.error('Error fetching doctors:', error);
                setError('An error occurred while fetching doctors. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadDoctors();
    }, [filters, pagination.currentPage]);

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPagination(prev => ({
            ...prev,
            currentPage: 1 // Reset to first page when filters change
        }));
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setPagination(prev => ({
            ...prev,
            currentPage: newPage
        }));

        // Scroll to top of the doctor list
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={styles.pageContainer}>
            <Header />

            <main className={styles.main}>
                <div className={styles.pageHeader}>
                    <div className={styles.container}>
                        <div className={styles.headerContent}>
                            <h1 className={styles.pageTitle}>Consult General Physicians Online - Internal Medicine Specialists</h1>
                            <Link href="/admin/add-doctor" className={styles.addDoctorBtn}>
                                Add New Doctor
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.contentLayout}>
                        <aside className={styles.sidebar}>
                            <FilterBar onFilterChange={handleFilterChange} />
                        </aside>

                        <div className={styles.doctorsList}>
                            {loading ? (
                                <div className={styles.loadingState}>
                                    <p>Loading doctors...</p>
                                </div>
                            ) : error ? (
                                <div className={styles.errorState}>
                                    <p>{error}</p>
                                    <button
                                        className={styles.retryButton}
                                        onClick={() => {
                                            // Retry with current filters and page
                                            setPagination(prev => ({
                                                ...prev,
                                                currentPage: 1
                                            }));
                                        }}
                                    >
                                        Retry
                                    </button>
                                </div>
                            ) : doctors.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <p>No doctors found matching your criteria.</p>
                                    <button
                                        className={styles.resetButton}
                                        onClick={() => handleFilterChange({
                                            specialization: '',
                                            city: '',
                                            gender: '',
                                            minExperience: '',
                                            isOnline: true
                                        })}
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className={styles.resultsInfo}>
                                        <p className={styles.resultCount}>
                                            Showing {(pagination.currentPage - 1) * pagination.limit + 1}-
                                            {Math.min(pagination.currentPage * pagination.limit, pagination.totalDocs)} of {pagination.totalDocs} doctors
                                        </p>
                                    </div>

                                    {doctors.map(doctor => (
                                        <DoctorCard key={doctor._id || doctor.id} doctor={doctor} />
                                    ))}

                                    <Pagination
                                        currentPage={pagination.currentPage}
                                        totalPages={pagination.totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DoctorsListingPage; 