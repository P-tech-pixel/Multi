import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import './Dash.css'
import ProductDash from './ProductDashboard'
import CustomerDash from './CustomerDashboard'

class Dash extends Component {
    constructor(props) {
        super(props);
        // login section 
        const token =localStorage.getItem("token")

        let loggedIn = true
        if(token == null){
            loggedIn = false
        }
        this.state = {
            loggedIn //this define wheather the user is logged in or not.
        }
        
    }
    render() {      
         //login section (user cannot go to dashboard without logging, if the user tries to go to https://...../dashboard, then it will direct to the login page. )
         if(this.state.loggedIn === false){
            return <Redirect to='/'></Redirect> 
        }
        // main render return ....
        return (
            <div className="App container">
               <div className='col'> 
                  <nav className="navbar navbar-dark navbar-expand-sm fixed-top">
                  <ul className="navbar-nav mr-auto">
                        <Link className="nav-link" to="/dashboard">111IT Marketing</Link>
                 </ul>
                <span className="navbar-text">
                    <Link to='/logout'> Logout</Link>
                </span>
                </nav>
                
                {/* Content goes here */}
                    <nav className="navbar navbar-expand-sm bg-light">
                      <ul className="navbar-nav">
                        <span className="nav-item active">
                            <Link className="nav-link" to="/customerDashboard">Customer Details<span className="sr-only">(current)</span></Link>
                        </span>
                        <span className="nav-item">
                            <Link className="nav-link" to="/productDashboard">Product Details</Link>
                        </span>
                      </ul>
                    </nav>
              
                <nav className="navbar navbar-dark navbar-expand-sm fixed-bottom">
                    <footer id='foot'> 
                         <small>&copy; Copyright 2020, All right reserved </small> 
                    </footer>
                </nav>
              </div>
            </div>
        );
    }
}

export default Dash;


