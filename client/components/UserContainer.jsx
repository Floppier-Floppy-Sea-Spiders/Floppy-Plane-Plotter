import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../reducers/loginSlice';
import { usePostUserMutation, useNewUserMutation } from '../reducers/apiSlice';




function Login () {

    //default declaring content as our signin fields and buttons
    let content = 
    <>
        <div>
            <form className='login'>
                <input id='username' type='text' placeholder='enter username' />
                <br/>
                <input id='password' type='password' placeholder='enter password'/>
            </form>
        </div>
        <div className='loginSignupButton'>
            <button id='loginButton' type='submit' onClick={ async (e) => {
                e.preventDefault();
                getUsernameValue();
                getPassValue();
                // console.log('in button, username: ', usernameValue, 'password: ', passValue);
                await addUser({username: usernameValue, password: passValue});
            }}>
                Login
            </button>

            <button id='signupButton' type='submit' onClick={ async (e) => {
                e.preventDefault();
                getUsernameValue();
                getPassValue();
                await newUser({username: usernameValue, password: passValue});
            }}>
                Sign Up
                </button>
        </div>
    </>
    //content would equal the form with the buttons
    //then, with the query, we can render what we want to render based on a boolean on whether a user is logged in
    //we can still use the dispatch, but change the payload to a boolean expression

    let isLoggedIn = useSelector((state) => state.login.isLoggedIn);

    let usernameValue;
    const getUsernameValue = () => {
        usernameValue =  document.getElementById('username').value;
        // setUsername(usernameValue);
        return usernameValue;
    }
    
    let passValue;
    const getPassValue = () => {
        passValue = document.getElementById('password').value;
        // setPassword(passValue);
        return passValue;
    }

    const dispatchInfo = () => {
        useDispatch({type: loginRequest.toString(), payload: {isLoggedIn: true}})
    }

    const [addUser, result] = usePostUserMutation();
    const [newUser, newUserResult] = useNewUserMutation();

    // if (result.status) {
    //     console.log('is loading')
    //     content = <p> Is Loading... </p>
    // }

    //for logging in with an already known user
    if (result.data) {
        dispatchInfo({isLoggedIn: true});
        if (isLoggedIn) {
            console.log('logged in successfully')
            content = <p> {result.data} </p>
            //plan on setting this to a button to display history or just history without button
        }
        else {
            <p>Login not successful, username and/or password is incorrect </p>
        }
    }

    if (result.error) {
        content = <p> Error in logging in </p>
    }

    //for signing up with a new user
    if (newUserResult.data) {
        dispatchInfo({isLoggedIn: true});
        if (isLoggedIn) {
            console.log('signed up successfully')
            content = <p> {newUserResult.data} </p>
            //plan on setting this to a button to display history or just history without button
        }
        else {
            <p>Sign up not successful, username is already in use </p>
        }
    }
    
    if (newUserResult.error) {
        content = <p> Error in signing up </p>
    }

    // console.log('username: ', usernameValue, ' password: ', passValue);
    return (
        <div>
            {content} 
        </div>
    )
}

// change export to name of the parent component within this file
export default Login;
