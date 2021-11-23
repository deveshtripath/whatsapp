import { Button } from '@material-ui/core';
import React from 'react'
import { auth, provider } from './firebase';
import './Login.css';
import {useStateValue} from './StateProvider'
import {actionTypes} from "./reducer"

function Login() {
    const [{ user }, dispatch] =useStateValue();

    const signIn = () =>{
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch((error) => alert(error.message));
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" width="400px" height="400px" alt=""/>
                <div className="login__text">
                    <h1>Sign in to Conversation</h1>
                </div>

                <Button type="submit" onClick={signIn}>
                    Sign In with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
