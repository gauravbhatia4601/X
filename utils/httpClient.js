import axios from 'axios';

// Create an instance of axios with default settings
const httpClient = axios.create({
    baseURL: 'https://api.example.com', // Set a base URL if needed
    timeout: 10000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to make GET requests
export const getRequest = async (url, params = {}) => {
    try {
        const response = await httpClient.get(url, { params });
        return response.data;
    } catch (error) {
        console.error('Error making GET request:', error);
        throw error; // Rethrow the error for further handling
    }
};

// Function to make POST requests
export const postRequest = async (url, data) => {
    try {
        const response = await httpClient.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error; // Rethrow the error for further handling
    }
};

// Add more methods (PUT, DELETE, etc.) as neededDF