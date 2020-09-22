import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import axios from 'axios';
import './CustomerDashboard.css'

class CustomerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            filteredCustomers: [],
            newCustomerData: {
                name: '',
                email: '',
                phone: '',
                checked: false
                
            },
            searchData: {
                name: ''
            },
            editCustomerData: {
                id: '',
                name: '',
                email: '',
                phone: ''
            },
            newCustomerModal: false,
            editCustomerModal: false,
        }

        this.temp = '123'
        
    }
    componentDidMount() {
      this._refreshCustomers();
    }

    toggleNewCustomerModal() {
        this.setState({
            newCustomerModal: !this.state.newCustomerModal
        });
    }

    addCustomer() {
        axios.post('http://localhost:3000/customer', this.state.newCustomerData).then(res => {
            let { customers } = this.state;
            customers.push(res.data);
            this.setState({ customers, newCustomerModal: false, newCustomerData: {
              name: '',
              email: '',
              phone: '',
              checked: false
            } });
        });
    }
    toggleEditCustomerModal() {
        this.setState({
            editCustomerModal: !this.state.editCustomerModal
        });
    }
    editCustomer(id, name, email, phone) {
        this.setState({
            editCustomerData: { id, name, email, phone },
            editCustomerModal: !this.state.editCustomerModal
        });
    }
    updateCustomer() {
        let { name, email, phone } = this.state.editCustomerData;
        axios
            .put('http://localhost:3000/customer/' + this.state.editCustomerData.id, {
                name,
                email,
                phone
            })
            .then(response => {
                this._refreshCustomers();
                this.setState({editCustomerModal: false, editCustomerData: {id:'', name:'', email:'', phone: ''}})
            });
    }

    deleteCustomer(id) {
        axios.delete('http://localhost:3000/customer/' + id).then(response => {
            this._refreshCustomers();
        });
    }
    _refreshCustomers() {
         axios.get('http://localhost:3000/customer').then(res => {
            this.setState({
                customers: res.data
            });
        });
    }
    render() {
       

        let result;
        if (this.state.filteredCustomers.length !== 0) {
            result = this.state.filteredCustomers;
        } else {
            result = this.state.customers;
        }
        let customers = result.map(customer => {
            return (
                <tr key={customer.id}>

                    <div className='container'>
                        <div className='row'>
                           <td className='col-1'><input type='checkbox' value={customer.checked} /></td>
                           <td className='col-1'>{customer.id}</td>
                           <td className='col-2'>{customer.name}</td>
                           <td className='col-4'>{customer.email}</td>
                           <td className='col-2'>{customer.phone}</td>
                           <td className='col-2'>
                             <Button
                               color="warning"
                               size="sm"
                               className="mr-2 "
                               onClick={this.editCustomer.bind(this, customer.id, customer.name, customer.email, customer.phone)}
                             >
                               Edit
                             </Button>{' '}
                             <Button color="danger" size="sm" onClick={() => this.deleteCustomer(customer.id)}>
                               Delete
                            </Button>
                           </td>
                        </div>
                    </div>
                </tr>
            );
        });

        // main render return ....
        return (
            <div className="App container">
               <div className='col'> 
               <nav className="navbar navbar-dark navbar-expand-sm fixed-top">
                  <ul className="navbar-nav mr-auto">
                       <Link className="nav-link" to="/dashboard">111IT Marketing</Link>
                     
                 </ul>
                <span className="navbar-text">
                    <Link className="nav-link"  to='/logout'> Logout</Link>
                </span>
                </nav>
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
              <header className= "jumbotron">
                 <div className= "container">
                    <div className= "row row-header">
                      <div className="col-6 col-sm-6">
                         <h1>Customer Details</h1>
                    </div>
                   </div>
               </div>
              </header>
                <Button
                    className="my-3 btn-block"
                    id='addBtn'
                    color="primary"
                    onClick={this.toggleNewCustomerModal.bind(this)}
                >
                    + Add Customer Details
                </Button>{' '}
                <FormGroup>
                    <Input
                        type="search"
                        placeholder="Search customer by their names..."
                        onChange={e => {
                            this.setState({
                                filteredCustomers: this.state.customers.filter(customer => {
                                    return customer.name.indexOf(e.target.value) !== -1;
                                })
                            });
                        }}
                    />
                </FormGroup>
                <div className='container'>
                  <div className='row'>
                    
                    <div className='col-1'>
                <Button
                    className="my-3 btn-block sortBtn"
                    color="info"
                    onClick={e => {
                        this.state.customers.sort((a, b) => {
                            if (a.name > b.name) {
                                return 1;
                            } else if (a.name < b.name) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredCustomers: this.state.customers
                        });
                    }}
                >
                    Sort by Name ASC
                </Button>{' '}
                <Button
                    className="my-3 btn-block sortBtn"
                    color="info"
                    onClick={e => {
                        this.state.customers.sort((a, b) => {
                            if (a.name > b.name) {
                                return -1;
                            } else if (a.name < b.name) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredCustomers: this.state.customers
                        });
                    }}
                >
                    Sort by Name DESC
                </Button>{' '}
                <Button
                    className="my-3 btn-block sortBtn"
                    color="secondary"
                    onClick={e => {
                        this.state.customers.sort((a, b) => {
                            if (a.phone > b.phone) {
                                return 1;
                            } else if (a.phone < b.phone) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredCustomers: this.state.customers
                        });
                    }}
                >
                    Sort by Phone Number ASC
                </Button>{' '}
                <Button
                    className="my-3 btn-block sortBtn"
                    color="secondary"
                    onClick={e => {
                        this.state.customers.sort((a, b) => {
                            if (a.phone > b.phone) {
                                return -1;
                            } else if (a.phone < b.phone) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredCustomers: this.state.customers
                        });
                    }}
                >
                    Sort by Phone Number  DESC
                 </Button>{' '} 

                </div>
                    <div className='col-11 '>
                    <p id='para'>Scroll the below table to view more data.</p>
                    <Table className='table table-striped table-fixed' > 
                    
                    <thead>
                        <tr>
                            <div className='container'>
                                <div className='row'>
                                   <th className='col-1'>Select</th>
                                   <th className='col-1'>Customer ID</th>
                                   <th className='col-2'>Customer Name</th>
                                   <th className='col-4' >Email</th>
                                   <th className='col-2' >Phone Number</th>
                                   <th className='col-2' >Actions</th>
                                </div>
                            </div>
                        </tr>
                    </thead >
                       <tbody >
                         {customers}
                       </tbody>
        
                    </Table>
                    
                    </div>
                  </div>
                  
                </div>
                

                <Modal isOpen={this.state.newCustomerModal} toggle={this.toggleNewCustomerModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewCustomerModal.bind(this)}>
                        Add a new customer
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                id="name"
                                value={this.state.newCustomerData.name}
                                onChange={e => {
                                    let { newCustomerData } = this.state;
                                    newCustomerData.name = e.target.value;
                                    this.setState({ newCustomerData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                value={this.state.newCustomerData.email}
                                onChange={e => {
                                    let { newCustomerData } = this.state;
                                    newCustomerData.email = e.target.value;
                                    this.setState({ newCustomerData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={this.state.newCustomerData.phone}
                                onChange={e => {
                                    let { newCustomerData } = this.state;
                                    newCustomerData.phone = e.target.value;
                                    this.setState({ newCustomerData });
                                }}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addCustomer.bind(this)}>
                            Add
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewCustomerModal.bind(this)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal
                    isOpen={this.state.editCustomerModal}
                    toggle={this.toggleEditCustomerModal.bind(this)}
                >
                    <ModalHeader toggle={this.toggleEditCustomerModal.bind(this)}>
                        Edit customer detail
                    </ModalHeader>
                    <ModalBody>
                    <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                id="name"
                                value={this.state.editCustomerData.name}
                                onChange={e => {
                                    let { editCustomerData } = this.state;
                                    editCustomerData.name = e.target.value;
                                    this.setState({ editCustomerData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                value={this.state.editCustomerData.email}
                                onChange={e => {
                                    let { editCustomerData } = this.state;
                                    editCustomerData.email = e.target.value;
                                    this.setState({ editCustomerData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={this.state.editCustomerData.phone}
                                onChange={e => {
                                    let { editCustomerData } = this.state;
                                    editCustomerData.phone = e.target.value;
                                    this.setState({ editCustomerData });
                                }}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateCustomer.bind(this)}>
                            Update 
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditCustomerModal.bind(this)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
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

export default CustomerDashboard;