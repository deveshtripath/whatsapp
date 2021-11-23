import './App.css';
import React, { useState } from 'react'
import Sidebar from './Sidebar';
import Chat from './Chat';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';
import Header from './Header';

function App() {
    const [{ user }, dispatch] =useStateValue();

    return (
        <div className="app">
        <Header/>
        {!user ? (
            <Login/>
        ):(
            <div className="app__body">
                
            <Router>
                    <Sidebar/>
                <Switch>
                <Route path="/rooms/:roomId">
                    <Chat/>
                </Route>
                <Route path="/">
                    <Chat/>
                </Route>
                </Switch>
            </Router>
            </div>
        )}
            
        </div>
    )
}

export default App
