import React, { Component } from 'react'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import Login from './component/login'
import Logout from './component/logout'
import Dash from './component/Dash'
import CustomerDashboard from './component/CustomerDashboard'
import ProductDashboard from './component/ProductDashboard'

class App extends Component {
    render(){
        return(
            <div>
                <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/dashboard' component={Dash} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/customerDashboard' component={CustomerDashboard} />
                    <Route path='/productDashboard' component={ProductDashboard} />


                </Switch>
                </BrowserRouter>
 
            </div>
            
         
     
            
        )
    }
}
export default App;


