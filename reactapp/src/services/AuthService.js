const API_URL = 'http://localhost:8081/api/auth'; // Ensure this is the correct API endpoint

const AuthService = {
    login: async (username, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include',  // Important for session handling
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message || 'Login failed');
                throw new Error(errorData.message || 'Login failed');
            }

            // Check if the response content-type is JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                // Parse response as JSON if content type is JSON
                return await response.json();
            } else {
                // If not JSON, treat as plain text
                const textResponse = await response.text();
                console.log(textResponse); // "Login successful"
                return { message: textResponse };  // Return a plain object with the message
            }

        } catch (error) {
            console.error('AuthService login error:', error.message);
            throw new Error('An error occurred while logging in');
        }
    },
};

export default AuthService;
