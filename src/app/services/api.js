// API service for doctor listing app

const API_BASE_URL = 'http://localhost:4000/api';

// Function to fetch doctors with filters and pagination
export const fetchDoctors = async (filters = {}, page = 1, limit = 10) => {
    try {
        // Build query parameters
        const queryParams = new URLSearchParams();
        queryParams.append('page', page);
        queryParams.append('limit', limit);

        // Add filters to query params
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, value);
            }
        });

        const response = await fetch(`${API_BASE_URL}/doctors?${queryParams.toString()}`);

        if (!response.ok) {
            throw new Error(`Error fetching doctors: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw error;
    }
};

// Function to add a new doctor
export const addDoctor = async (doctorData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/doctors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(doctorData),
        });

        if (!response.ok) {
            throw new Error(`Error adding doctor: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding doctor:', error);
        throw error;
    }
}; 