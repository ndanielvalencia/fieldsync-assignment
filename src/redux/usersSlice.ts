import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {UsersState, User} from "../types";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

const initialUsersState = {
    users: [],
    loading: false,
    error: null
} as UsersState;

export const fetchUsers = createAsyncThunk('users/get', async (data, thunkApi) => {
    try {
        const response = await axios.get<User[]>(BASE_URL);
        return response.data;
    } catch (error: any){
        return thunkApi.rejectWithValue(error.message);
    }
    
});

export const usersSlice = createSlice({
    name: "users",
    initialState: initialUsersState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default usersSlice.reducer;