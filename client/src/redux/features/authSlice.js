import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk("auth/login", async ({ formValue, navigate, toast }, { rejectWithValue }) => { // rejectWithValue is used to capture any error message coming from the backend
    try {
        const { data } = await api.signIn(formValue);

        toast.success("Login Successful");

        navigate("/");

        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const register = createAsyncThunk("auth/register", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const { data } = await api.signUp(formValue);

        toast.success("Registration Successful");

        navigate("/");

        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const googleSignIn = createAsyncThunk("auth/googleSign", async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
        const { data } = await api.googleSignin(result);

        toast.success("Google Sign-in Successful");

        navigate("/");

        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: false,
        errorMessage: "",
        loading: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state, action) => {
            localStorage.clear();
            state.user = null;
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload.message;
        },
        [register.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload;
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload.message;
        },
        [googleSignIn.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [googleSignIn.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload;
        },
        [googleSignIn.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload.message;
        },
    }
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;