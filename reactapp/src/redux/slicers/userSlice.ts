import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the shape of the user state
interface UserState {
    users: any[]; // Replace `any` with the appropriate user type
    loading: boolean;
    error: string | null;
}

// Create the initial state using the UserState interface
const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('http://localhost:8081/api/users');
    return response.data; // Returns the data to the fulfilled action
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true; // Set loading to true when the fetch starts
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any[]>) => { // Replace `any[]` with the appropriate user type array
                state.loading = false; // Set loading to false when the fetch completes
                state.users = action.payload; // Update users with fetched data
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false; // Set loading to false when the fetch fails
                state.error = action.error.message || 'Failed to fetch users'; // Handle error message
            });
    },
});

// Export the user slice reducer
export default userSlice.reducer;
