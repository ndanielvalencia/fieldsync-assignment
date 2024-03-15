import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {UsersState, ExternalUser, InternalUser} from "../types";
import axios from "axios";

const JSON_URL = "https://jsonplaceholder.typicode.com/users";
const LOCAL_URL = "http://localhost:8080/api/users";

const initialUsersState = {
    externalUsers: [],
    internalUsers: [],
    isExternalFetching: false,
    isExternalFetched: false,
    isInternalFetching: false,
    isInternalFetched: false,
    isPosting: false,
    isPosted: false,
    error: null
} as UsersState;

export const fetchExternalUsers = createAsyncThunk('users/getExternal', async (data, thunkApi) => {
    try {
        const response = await axios.get<ExternalUser[]>(JSON_URL);
        return response.data;
    } catch (error: any){
        return thunkApi.rejectWithValue(error.message);
    }
    
});

export const fetchInternalUsers = createAsyncThunk('users/getInternal', async (data, thunkApi) => {
    try {
        const response = await axios.get<InternalUser[]>(LOCAL_URL);
        return response.data;
    } catch (error: any){
        return thunkApi.rejectWithValue(error.message);
    }
    
});

export const postUser = createAsyncThunk('users/post', async (data: ExternalUser, thunkApi) => {
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
        builder.addCase(fetchExternalUsers.pending, (state) => {
            state.isExternalFetching = true;
            state.error = null;
        });
        builder.addCase(fetchExternalUsers.fulfilled, (state, action: PayloadAction<ExternalUser[]>) => {
            state.externalUsers = action.payload;
            state.isExternalFetching = false;
            state.isExternalFetched = true;
        });
        builder.addCase(fetchExternalUsers.rejected, (state, action: PayloadAction<any>) => {
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
        
        builder.addCase(fetchInternalUsers.pending, (state) => {
            state.isInternalFetching = true;
            state.error = null;
        });

        builder.addCase(fetchInternalUsers.fulfilled, (state, action: PayloadAction<InternalUser[]>) => {
            state.internalUsers = action.payload;
            state.isInternalFetching = false;
            state.isInternalFetched = true;
        });

        builder.addCase(fetchInternalUsers.rejected, (state, action: PayloadAction<any>) => {
            state.isInternalFetching = false;
            state.error = action.payload;
        });
    }
});

export default usersSlice.reducer;