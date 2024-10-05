const API_URL = 'http://localhost:8081'; // Your Spring Boot API base URL

const AuthService = {
    login: async (username, password) => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        // Optionally store tokens or session info here
        return response.json();
    },
    // Add additional methods for logout, checking auth status, etc.
};

export default AuthService;
