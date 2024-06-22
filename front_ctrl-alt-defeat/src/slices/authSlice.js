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

    const alunoMsg = 'Aluno Registrado com Sucesso.';
    const orientadorMsg = 'Orientador Registrado com Sucesso.';
    const admMsg = "Administrador Registrado com Sucesso."

    console.log(data)

    let response = null;

    if (data.msg === alunoMsg || data.msg === orientadorMsg || data.msg === admMsg) {
        response = userData.email;
        localStorage.setItem("user", JSON.stringify(response));
        return response;
    } else {
        return thunkAPI.rejectWithValue(data.msg);
    }
})

// Logout de um usuario
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout()
})

// Entrando com um usuario
export const login = createAsyncThunk("auth/login", async ({ userData, route }, thunkAPI) => {
    const data = await authService.login(userData, route);

    const alunoMsg = 'Auntenticação Aluno realizada com sucesso!';
    const orientadorMsg = 'Auntenticação Orientador realizada com sucesso!';
    const admMsg = "Auntenticação Administrador realizada com sucesso!"

    console.log(data.msg)

    let response = null;

    if (data.msg === alunoMsg || data.msg === orientadorMsg || data.msg === admMsg) {
        response = userData.email;
        localStorage.setItem("user", JSON.stringify(response));
        return response;
    } else {
        return thunkAPI.rejectWithValue(data.msg);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.success = false
            state.error = false
            state.msg = null // Certifique-se de redefinir a mensagem também
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true
                state.error = false
                state.msg = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.user = action.payload
                state.msg = null
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.msg = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.user = null
                state.msg = null
            })
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = false
                state.msg = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.user = action.payload
                state.msg = null
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.msg = action.payload
                state.user = null
            })
    },
})
export const { reset } = authSlice.actions
export default authSlice.reducer
