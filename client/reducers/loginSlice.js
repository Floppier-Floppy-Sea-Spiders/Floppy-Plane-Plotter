import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginRequest: (state, action) => {
            const { loggedInBool } = action.payload;
            const newState = Object.assign({}, {...state}, {isLoggedIn: loggedInBool});
            console.log(newState);
            return {...state, ...newState}
        },
    }
});

export const { loginRequest } = loginSlice.actions;

export default loginSlice.reducer;