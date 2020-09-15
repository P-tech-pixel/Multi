import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './logout.js'

class Logout extends Component {
    constructor(props){
        super(props)
        localStorage.removeItem('token')
    }
    render(){
        return(
            <div>
                <nav className="navbar navbar-dark navbar-expand-sm fixed-top">
                  <ul className="navbar-nav mr-auto">
                        <li className="nav-item active"><a class="nav-link" href="#"><span className="fa fa-home fa-lg"></span>111IT Marketing </a></li>
                 </ul>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div id='card-form' claseName="card card-signin my-5">
                                <div className="card-body">
                                    <h4>You are successfully logged out.</h4>
                                    <button type="button" class="btn btn-outline-secondary btn-lg btn-block"><Link to='/'>Login again</Link></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <nav className="navbar navbar-dark navbar-expand-sm fixed-bottom">
                    <footer id='foot'> 
                         <small>&copy; Copyright 2020, All right reserved </small> 
                    </footer>
                </nav>
            </div>
        )
    }
}
export default Logout 