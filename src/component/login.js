import React, { Component} from 'react'
import { Redirect } from 'react-router-dom'
import './login.css'

class Login extends Component{
    constructor(props){
        super(props)
        const token =localStorage.getItem("token")

        let loggedIn = true
        if(token == null){
            loggedIn = false
        }
        this.state ={
            username:'',
            password: '',
            loggedIn
        }
        this.onChange = this.onChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }
    onChange(e){
    this.setState({
        [e.target.name]: e.target.value
    })
    }
    submitForm(e){
        e.preventDefault()
        const {username, password} = this.state
        //logic magic
        if(username === "prashanta927pandit@gmail.com" && password === "Password1"){
            localStorage.setItem ("token", "shgdsgdjghsdjghs")
            this.setState({
                loggedIn: true
        })
      }
    }


render(){
    if(this.state.loggedIn){
        return <Redirect to="/dashboard"/>
    }

    return(
        <div>
                <nav className="navbar navbar-dark navbar-expand-sm fixed-top">
                  <ul className="navbar-nav mr-auto">
                        <li className="nav-item active"><a class="nav-link" href="#"><span className="fa fa-home fa-lg"></span>111IT Marketing </a></li>
                 </ul>
                </nav>
                    <div>
                            <div className="container">
                                <div className="row">
                                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                    <div id='card-form' claseName="card card-signin my-5">
                                    <div className="card-body">
                                        <h4 className="card-title text-center">Sign In</h4>
                                        <form className="form-signin" onSubmit ={this.submitForm}>
                                        <div className="form-label-group">
                                            <label for="inputEmail">Email address</label><br/><br/>
                                            <input type="email" id="inputEmail" className="form-control" name='username' value={this.state.username} onChange={this.onChange} placeholder="Email address" required autofocus />
                                        </div>

                                        <div className="form-label-group">
                                            <label for="inputPassword">Password</label><br/><br/>
                                            <input type="password" id="inputPassword" className="form-control" name='password' value={this.state.password} onChange={this.onChange} placeholder="Password" required />
                                        </div>

                                        <div className="custom-control custom-checkbox mb-3">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                            <label className="custom-control-label" for="customCheck1">Remember password</label>
                                        </div>
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                        <hr className="my-4"/>
                                        </form>
                                    </div>
                                    </div>
                                    <button type="button" className='btn btn-link'>Create a new account</button> 
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
export default Login