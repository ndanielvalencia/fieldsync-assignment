import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {UsersState, User} from "../types";
import axios from "axios";

const JSON_URL = "https://jsonplaceholder.typicode.com/users";
const LOCAL_URL = "http://localhost:8080/api/users";

const initialUsersState = {
    users: [],
    isExternalFetching: false,
    isInternalFetching: false,
    isPosting: false,
    isPosted: false,
    error: null
} as UsersState;

export const fetchUsers = createAsyncThunk('users/get', async (data, thunkApi) => {
    try {
        const response = await axios.get<User[]>(JSON_URL);
        return response.data;
    } catch (error: any){
        return thunkApi.rejectWithValue(error.message);
    }
    
});

export const postUser = createAsyncThunk('users/post', async (data: User, thunkApi) => {
    try{
        const formattedData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            company: data.company.name
        }

        const jsonData = JSON.stringify(formattedData);
        const response = await axios.post(LOCAL_URL, jsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.statusText;
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
            state.isExternalFetching = true;
            state.error = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.isExternalFetching = false;
        });
        builder.addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
            state.isExternalFetching = false;
            state.error = action.payload;
        });

        builder.addCase(postUser.pending, (state) => {
            state.isPosting = true;
            state.error = null;
        });

        builder.addCase(postUser.fulfilled, (state) => {
            state.isPosting = false;
            state.isPosted = true;
        });

        builder.addCase(postUser.rejected, (state, action: PayloadAction<any>) => {
            state.isPosting = false;
            state.error = action.payload;
        });
        
    }
});

export default usersSlice.reducer;