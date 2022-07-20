import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    password: '',
    isLoggedIn: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginRequest: (state, action) => {
            const { username, password, loggedInBool } = action.payload;
            const newState = Object.assign({}, {...state}, {username: username, password: password, isLoggedIn: loggedInBool});
            return {...state, ...newState}
        },
    }
});

export const { loginRequest } = loginSlice.actions;

export default loginSlice.reducer;