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
import './ProductDashboard.css'

class ProductDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filteredproducts: [],
            newproductData: {
                name: '',
                address: '',
                checked: false
                
            },
            searchData: {
                name: ''
            },
            editproductData: {
                id: '',
                name: '',
                address: ''
            },
            newproductModal: false,
            editproductModal: false
        }

        this.temp = '123'
        
    }
    componentDidMount() {
      this._refreshproducts();
    }

    toggleNewproductModal() {
        this.setState({
            newproductModal: !this.state.newproductModal
        });
    }

    addproduct() {
        axios.post('http://localhost:3000/product', this.state.newproductData).then(res => {
            let { products } = this.state;
            products.push(res.data);
            this.setState({ products, newproductModal: false, newproductData: {
              name: '',
              address: '',
              checked: false
            } });
        });
    }
    toggleEditproductModal() {
        this.setState({
            editproductModal: !this.state.editproductModal
        });
    }
    editproduct(id, name, address) {
        this.setState({
            editproductData: { id, name, address},
            editproductModal: !this.state.editproductModal
        });
    }
    updateproduct() {
        let { name, address} = this.state.editproductData;
        axios
            .put('http://localhost:3000/product/' + this.state.editproductData.id, {
                name,
                address
            })
            .then(response => {
                this._refreshproducts();
                this.setState({editproductModal: false, editproductData: {id:'', name:'', address:''}})
            });
    }

    deleteproduct(id) {
        axios.delete('http://localhost:3000/product/' + id).then(response => {
            this._refreshproducts();
        });
    }
    _refreshproducts() {
         axios.get('http://localhost:3000/product').then(res => {
            this.setState({
                products: res.data
            });
        });
    }
    render() {
       

        let result;
        if (this.state.filteredproducts.length !== 0) {
            result = this.state.filteredproducts;
        } else {
            result = this.state.products;
        }
        let products = result.map(product => {
            return (
                <tr key={product.id}>

                    <div className='container'>
                        <div className='row'>
                           <td className='col-1'><input type='checkbox' value={product.checked} /></td>
                           <td className='col-1'>{product.id}</td>
                           <td className='col-2'>{product.name}</td>
                           <td className='col-4'>{product.address}</td>
                           <td className='col-2'>
                             <Button
                               color="warning"
                               size="sm"
                               className="mr-2 "
                               onClick={this.editproduct.bind(this, product.id, product.name, product.address)}
                             >
                               Edit
                             </Button>{' '}
                             <Button color="danger" size="sm" onClick={() => this.deleteproduct(product.id)}>
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
                         <h1>Product Details</h1>
                    </div>
                   </div>
               </div>
              </header>
                <Button
                    className="my-3 btn-block"
                    id='addBtn'
                    color="primary"
                    onClick={this.toggleNewproductModal.bind(this)}
                >
                    + Add product Details
                </Button>{' '}
                <FormGroup>
                    <Input
                        type="search"
                        placeholder="Search product by their names..."
                        onChange={e => {
                            this.setState({
                                filteredproducts: this.state.products.filter(product => {
                                    return product.name.indexOf(e.target.value) !== -1;
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
                        this.state.products.sort((a, b) => {
                            if (a.name > b.name) {
                                return 1;
                            } else if (a.name < b.name) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredproducts: this.state.products
                        });
                    }}
                >
                    Sort by Name ASC
                </Button>{' '}
                <Button
                    className="my-3 btn-block sortBtn"
                    color="info"
                    onClick={e => {
                        this.state.products.sort((a, b) => {
                            if (a.name > b.name) {
                                return -1;
                            } else if (a.name < b.name) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredproducts: this.state.products
                        });
                    }}
                >
                    Sort by Name DESC
                </Button>{' '}
                <Button
                    className="my-3 btn-block sortBtn"
                    color="secondary"
                    onClick={e => {
                        this.state.products.sort((a, b) => {
                            if (a.address > b.address) {
                                return 1;
                            } else if (a.address < b.address) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredproducts: this.state.products
                        });
                    }}
                >
                    Sort by Address Number ASC
                </Button>{' '}
                <Button
                    className="my-3 btn-block sortBtn"
                    color="secondary"
                    onClick={e => {
                        this.state.products.sort((a, b) => {
                            if (a.address > b.address) {
                                return -1;
                            } else if (a.address < b.address) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredproducts: this.state.products
                        });
                    }}
                >
                    Sort by Address DESC
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
                                   <th className='col-1'>Product ID</th>
                                   <th className='col-2'>Product Name</th>
                                   <th className='col-4' >Address</th>
                                   <th className='col-2' >Actions</th>
                                </div>
                            </div>
                        </tr>
                    </thead >
                       <tbody >
                         {products}
                       </tbody>
        
                    </Table>
                    
                    </div>
                  </div>
                  
                </div>
                

                <Modal isOpen={this.state.newproductModal} toggle={this.toggleNewproductModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewproductModal.bind(this)}>
                        Add a new product
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                id="name"
                                value={this.state.newproductData.name}
                                onChange={e => {
                                    let { newproductData } = this.state;
                                    newproductData.name = e.target.value;
                                    this.setState({ newproductData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">address</Label>
                            <Input
                                id="address"
                                value={this.state.newproductData.address}
                                onChange={e => {
                                    let { newproductData } = this.state;
                                    newproductData.address = e.target.value;
                                    this.setState({ newproductData });
                                }}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addproduct.bind(this)}>
                            Add
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewproductModal.bind(this)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal
                    isOpen={this.state.editproductModal}
                    toggle={this.toggleEditproductModal.bind(this)}
                >
                    <ModalHeader toggle={this.toggleEditproductModal.bind(this)}>
                        Edit product detail
                    </ModalHeader>
                    <ModalBody>
                    <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                id="name"
                                value={this.state.editproductData.name}
                                onChange={e => {
                                    let { editproductData } = this.state;
                                    editproductData.name = e.target.value;
                                    this.setState({ editproductData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">address</Label>
                            <Input
                                id="address"
                                value={this.state.editproductData.address}
                                onChange={e => {
                                    let { editproductData } = this.state;
                                    editproductData.address = e.target.value;
                                    this.setState({ editproductData });
                                }}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateproduct.bind(this)}>
                            Update 
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditproductModal.bind(this)}>
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

export default ProductDashboard;
