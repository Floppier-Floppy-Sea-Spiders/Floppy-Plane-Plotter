import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../reducers/loginSlice';
import { usePostUserQuery } from '../reducers/apiSlice';




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
            <button id='loginButton' type='submit'onClick={(e) => {
                e.preventDefault();
                getUsernameValue();
                getPassValue();
                setSkipState(false)
            }}>
                Login
            </button>
            <button>Sign Up</button>
        </div>
    </>
    //content would equal the form with the buttons
    //then, with the query, we can render what we want to render based on a boolean on whether a user is logged in
    //we can still use the dispatch, but change the payload to a boolean expression

    let isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [skipState, setSkipState] = React.useState(true);

    let usernameValue;
    const getUsernameValue = () => {
        usernameValue =  document.getElementById('username').value;
        console.log('usernameValue: ', usernameValue);
        setUsername(usernameValue);
        return usernameValue;
    }
    
    let passValue;
    const getPassValue = () => {
        passValue = document.getElementById('password').value;
        console.log('passvalue: ', passValue)
        setPassword(passValue);
        return passValue;
    }

    const dispatchInfo = () => {
        useDispatch({type: loginRequest.toString(), payload: {isLoggedIn: true}})
    }

    const {
            data: loggedinStr,
            isLoading,
            isSuccess,
            isError,
            error,
    } = usePostUserQuery({username, password}, {refetchOnMountOrArgChange: true, });

    if (isLoading) {
        console.log('is loading')
        content = <p> Is Loading... </p>
    }

    if (isSuccess) {
        dispatchInfo({isLoggedIn: true});
        if (isLoggedIn) {
            console.log('logged in successfully')
            setSkipState(true);
            content = <p> {loggedinStr} </p>
            //plan on setting this to a button to display history or just history without button
        }
        else {
            <p>Login not successful, username and/or password is incorrect </p>
        }
    }

    if (isError) {
        content = <p> Error in logging in </p>
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
