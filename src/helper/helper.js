import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Ensure this matches your backend

// ✅ Fetch data from the server
export async function getServerData(endpoint) {
    try {
        const { data } = await axios.get(`${BASE_URL}/${endpoint}`);
        return data;
    } catch (error) {
        console.error("API Request Failed:", error.response?.data || error.message);
        return null; // Avoid app crash by returning null
    }
}

// ✅ Check if a user exists
export async function checkUserExist(username) { // Changed function name to camelCase
    try {
        const { data } = await axios.get(`${BASE_URL}/users/${username}`);
        return data.exists; // Ensure backend returns { exists: true/false }
    } catch (error) {
        console.error("Error checking user:", error.response?.data || error.message);
        return false;
    }
}

// ✅ Post data to the server
export async function postServerData(endpoint, data) {
    try {
        const response = await axios.post(`${BASE_URL}/${endpoint}`, data, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error.response?.data || error.message);
        return null;
    }
}

// ✅ Calculate the number of attempts
export function attemps_Number(result) {
    return result.filter(r => r !== undefined).length;
}

// ✅ Calculate the earned points
export function earnPoints_Number(result, questions, pointsPerQuestion = 10) {
    if (!Array.isArray(result) || !Array.isArray(questions)) return 0; // Prevent errors

    return result.reduce((acc, curr, idx) => {
        return curr === questions[idx]?.answer ? acc + pointsPerQuestion : acc;
    }, 0);
}

// ✅ Determine if the user has passed
export function flagResult(totalPoints, earnedPoints) {
    return earnedPoints >= totalPoints * 0.5; // Example: Pass if ≥ 50%
}
