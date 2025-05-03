import React, { useState } from 'react';
import styles from './FilterBar.module.css';

const FilterBar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        specialization: '',
        city: '',
        gender: '',
        minExperience: '',
        isOnline: true
    });

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: newValue
        }));

        // Notify parent component about filter changes
        onFilterChange({
            ...filters,
            [name]: newValue
        });
    };

    const handleResetFilters = () => {
        const defaultFilters = {
            specialization: '',
            city: '',
            gender: '',
            minExperience: '',
            isOnline: true
        };

        setFilters(defaultFilters);
        onFilterChange(defaultFilters);
    };

    return (
        <div className={styles.filterBar}>
            <div className={styles.filterContainer}>
                <h3 className={styles.filterTitle}>Filters</h3>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Specialization</label>
                    <select
                        name="specialization"
                        className={styles.filterSelect}
                        value={filters.specialization}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Specializations</option>
                        <option value="General Physician">General Physician</option>
                        <option value="Internal Medicine Specialist">Internal Medicine Specialist</option>
                        <option value="General Practitioner">General Practitioner</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>City</label>
                    <select
                        name="city"
                        className={styles.filterSelect}
                        value={filters.city}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Cities</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Chennai">Chennai</option>
                        <option value="New Delhi">New Delhi</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Visakhapatnam">Visakhapatnam</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Gender</label>
                    <select
                        name="gender"
                        className={styles.filterSelect}
                        value={filters.gender}
                        onChange={handleFilterChange}
                    >
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Minimum Experience (Years)</label>
                    <select
                        name="minExperience"
                        className={styles.filterSelect}
                        value={filters.minExperience}
                        onChange={handleFilterChange}
                    >
                        <option value="">Any Experience</option>
                        <option value="1">1+ Years</option>
                        <option value="3">3+ Years</option>
                        <option value="5">5+ Years</option>
                        <option value="10">10+ Years</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.checkboxContainer}>
                        Show Online Doctors
                        <input
                            type="checkbox"
                            name="isOnline"
                            checked={filters.isOnline}
                            onChange={handleFilterChange}
                        />
                        <span className={styles.checkmark}></span>
                    </label>
                </div>

                <button
                    className={styles.resetButton}
                    onClick={handleResetFilters}
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

export default FilterBar; 