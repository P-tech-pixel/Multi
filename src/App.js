import React, { Component } from 'react'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import Dashboard from './component/Dashboard'
import Login from './component/login'
import Admin from './component/admin'
import Logout from './component/logout'

class App extends Component {
    render(){
        return(
            <div>
                {/*<Dashboard />*/}
                <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/logout' component={Logout} />

                </Switch>
                </BrowserRouter>
 
            </div>
            
         
     
            
        )
    }
}
export default App;


