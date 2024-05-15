import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false,
}

// Registrar um usuario e entrar
export const register = createAsyncThunk("auth/register", async ({ userData, route }, thunkAPI) => {
    const data = await authService.register(userData, route);

    // checando errors
    if (data.msg) {
        return thunkAPI.rejectWithValue(data.msg)
    }

    return data
})

// Logout de um usuario
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout()
})

// Entrando com um usuario
export const login = createAsyncThunk("auth/login", async ({ userData, route }, thunkAPI) => {

    console.log("ccccccccccccccccccc" + userData)
    const data = await authService.login(userData, route);

    // checando errors
    if (data.msg) {
        return thunkAPI.rejectWithValue(data.msg)
    }

    return data
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.success = false
            state.success = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true
            state.error = false
        }).addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.user = action.payload
        }).addCase(register.rejected, (state, action) => {
            state.loading = false
            state.msg = action.payload
            state.user = null
        }).addCase(logout.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.user = null
        }).addCase(login.pending, (state) => {
            state.loading = true
            state.error = false
        }).addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.user = action.payload
        }).addCase(login.rejected, (state, action) => {
            state.loading = false
            state.msg = action.payload
            state.user = null
        })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
