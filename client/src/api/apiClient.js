import axios from 'axios';

//Create an instance of axios with baseURL set to the backend server
const apiClient = axios.create({
    baseURL: 'http://localhost:7000/api', //Base URL for the backemd API
    headers : {
        'Content-Type': 'application/json', //Ensure JSON format for requests
        
    },
});

export default apiClient;