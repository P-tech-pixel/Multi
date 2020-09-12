import React, { Component } from 'react';
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
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            filteredCustomers: [],
            newCustomerData: {
                name: '',
                email: ''
            },
            searchData: {
                name: ''
            },
            editCustomerData: {
                id: '',
                name: '',
                email: ''
            },
            newCustomerModal: false,
            editCustomerModal: false
        };

        this.temp = '123';
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
        axios.post('http://localhost:3000/book', this.state.newCustomerData).then(res => {
            let { customers } = this.state;
            customers.push(res.data);
            this.setState({ customers, newCustomerModal: false, newCustomerData: {
              name: '',
              email: ''
            } });
        });
    }
    toggleEditCustomerModal() {
        this.setState({
            editCustomerModal: !this.state.editCustomerModal
        });
    }
    editCustomer(id, name, email) {
        this.setState({
            editCustomerData: { id, name, email },
            editCustomerModal: !this.state.editCustomerModal
        });
    }
    updateCustomer() {
        let { name, email } = this.state.editCustomerData;
        axios
            .put('http://localhost:3000/book/' + this.state.editCustomerData.id, {
                name,
                email
            })
            .then(response => {
                this._refreshCusromers();
                this.setState({editCustomerModal: false, editCustomerData: {id:'', name:'', email:''}})
            });
    }

    deleteCustomer(id) {
        axios.delete('http://localhost:3000/book/' + id).then(response => {
            this._refreshCustomers();
        });
    }
    _refreshCustomers() {
         axios.get('http://localhost:3000/book').then(res => {
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
                    <td className='col-2'>{customer.id}</td>
                    <td className='col-3'>{customer.name}</td>
                    <td className='col-4'>{customer.email}</td>
                    <td className='col-3'>
                        <Button
                            color="warning"
                            size="sm"
                            className="mr-2"
                            onClick={this.editCustomer.bind(this, customer.id, customer.name, customer.email)}
                        >
                            Edit
                        </Button>{' '}
                        <Button color="danger" size="sm" onClick={() => this.deleteCustomer(customer.id)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            );
        });
        return (
            <div className="App container">
                <h1>Customer Details</h1>
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
                <div className='container-fluid'>
                  <div className='row'>
                    
                    <div className='col-2'>
                <Button
                    className="my-3 btn-block"
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
                    className="my-3 btn-block"
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
                    className="my-3 btn-block"
                    color="secondary"
                    onClick={e => {
                        this.state.customers.sort((a, b) => {
                            if (a.email > b.email) {
                                return 1;
                            } else if (a.email < b.email) {
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
                    className="my-3 btn-block"
                    color="secondary"
                    onClick={e => {
                        this.state.customers.sort((a, b) => {
                            if (a.email > b.email) {
                                return -1;
                            } else if (a.email < b.email) {
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
                    <div className='col-10 '>
                    <p>Scroll the below table to view more data.</p>
                    <Table className='table table-striped table-fixed' > 
                    
                    <thead>
                        <tr>
                            <th className='col-2'>Customer ID</th>
                            <th className='col-3'>Customer Name</th>
                            <th className='col-4' >Email</th>
                            <th className='col-3' >Actions</th>
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
                                    editCustomerData.title = e.target.value;
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
                
            </div>
        );
    }
}

export default App;
