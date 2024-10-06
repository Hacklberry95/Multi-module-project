const API_URL = 'http://localhost:8081/api/auth'; // Ensure this is the correct API endpoint

const AuthService = {
    login: async (username: string, password: string): Promise<LoginResponse> => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include', // Important for session handling
            });

            if (!response.ok) {
                const errorData: LoginError = await response.json();
                console.error('Error:', errorData.message || 'Login failed');
                throw new Error(errorData.message || 'Login failed');
            }

            // Check if the response content-type is JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                // Parse response as JSON if content type is JSON
                return await response.json() as LoginResponse; // Cast to LoginResponse type
            } else {
                // If not JSON, treat as plain text
                const textResponse = await response.text();
                console.log(textResponse); // "Login successful"
                return { message: textResponse }; // Return a plain object with the message
            }

        } 			catch (error) {
			    if (error instanceof Error) {
			        console.error('AuthService login error:', error.message);
			    } else {
			        console.error('AuthService login error:', error); // Handle cases where it's not an Error
			    }
			    throw new Error('An error occurred while logging in');
			}
    },
    logout: async (): Promise<void> => {
        const response = await fetch(`${API_URL}/logout`, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }
    },
};

export default AuthService;
