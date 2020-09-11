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
            books: [],
            filteredBooks: [],
            newBookData: {
                title: '',
                rating: ''
            },
            searchData: {
                title: ''
            },
            editBookData: {
                id: '',
                title: '',
                rating: ''
            },
            newBookModal: false,
            editBookModal: false
        };

        this.temp = '123';
    }
    componentDidMount() {
      this._refreshBooks();
    }

    toggleNewBookModal() {
        this.setState({
            newBookModal: !this.state.newBookModal
        });
    }

    addBook() {
        axios.post('http://localhost:3000/book', this.state.newBookData).then(res => {
            let { books } = this.state;
            books.push(res.data);
            this.setState({ books, newBookModal: false, newBookData: {
              title: '',
              rating: ''
            } });
        });
    }
    toggleEditBookModal() {
        this.setState({
            editBookModal: !this.state.editBookModal
        });
    }
    editBook(id, title, rating) {
        this.setState({
            editBookData: { id, title, rating },
            editBookModal: !this.state.editBookModal
        });
    }
    updateBook() {
        let { title, rating } = this.state.editBookData;
        axios
            .put('http://localhost:3000/book/' + this.state.editBookData.id, {
                title,
                rating
            })
            .then(response => {
                this._refreshBooks();
                this.setState({editBookModal: false, editBookData: {id:'', title:'', rating:''}})
            });
    }

    deleteBook(id) {
        axios.delete('http://localhost:3000/book/' + id).then(response => {
            this._refreshBooks();
        });
    }
    _refreshBooks() {
         axios.get('http://localhost:3000/book').then(res => {
            this.setState({
                books: res.data
            });
        });
    }
    render() {
        let result;
        if (this.state.filteredBooks.length !== 0) {
            result = this.state.filteredBooks;
        } else {
            result = this.state.books;
        }
        let books = result.map(book => {
            return (
                <tr key={book.id}>
                    <td className='col-2'>{book.id}</td>
                    <td className='col-3'>{book.title}</td>
                    <td className='col-3'>{book.rating}</td>
                    <td className='col-4'>
                        <Button
                            color="warning"
                            size="sm"
                            className="mr-2"
                            onClick={this.editBook.bind(this, book.id, book.title, book.rating)}
                        >
                            Edit
                        </Button>{' '}
                        <Button color="danger" size="sm" onClick={() => this.deleteBook(book.id)}>
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
                    onClick={this.toggleNewBookModal.bind(this)}
                >
                    + Add Customer Details
                </Button>{' '}
                <FormGroup>
                    <Input
                        type="search"
                        placeholder="Search customer by their names..."
                        onChange={e => {
                            this.setState({
                                filteredBooks: this.state.books.filter(book => {
                                    return book.title.indexOf(e.target.value) !== -1;
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
                        this.state.books.sort((a, b) => {
                            if (a.title > b.title) {
                                return 1;
                            } else if (a.title < b.title) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredBooks: this.state.books
                        });
                    }}
                >
                    Sort by Name ASC
                </Button>{' '}
                <Button
                    className="my-3 btn-block"
                    color="info"
                    onClick={e => {
                        this.state.books.sort((a, b) => {
                            if (a.title > b.title) {
                                return -1;
                            } else if (a.title < b.title) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredBooks: this.state.books
                        });
                    }}
                >
                    Sort by Name DESC
                </Button>{' '}
                <Button
                    className="my-3 btn-block"
                    color="secondary"
                    onClick={e => {
                        this.state.books.sort((a, b) => {
                            if (a.rating > b.rating) {
                                return 1;
                            } else if (a.rating < b.rating) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredBooks: this.state.books
                        });
                    }}
                >
                    Sort by Phone Number ASC
                </Button>{' '}
                <Button
                    className="my-3 btn-block"
                    color="secondary"
                    onClick={e => {
                        this.state.books.sort((a, b) => {
                            if (a.rating > b.rating) {
                                return -1;
                            } else if (a.rating < b.rating) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                        this.setState({
                            filteredBooks: this.state.books
                        });
                    }}
                >
                    Sort by Phone Number  DESC
                </Button>{' '}
                    </div>
                    <div className='col-10 '>
                    
                    <Table className='table table-striped table-fixed' > 
                    
                    <thead>
                        <tr>
                            <th className='col-2'>Customer ID</th>
                            <th className='col-3'>Customer Name</th>
                            <th className='col-3' >Rating</th>
                            <th className='col-4' >Actions</th>
                        </tr>
                    </thead >
                       <tbody >
                         {books}
                       </tbody>
        
                    </Table>
                    
                    </div>
                  </div>
                </div>

                <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>
                        Add a new customer
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                id="title"
                                value={this.state.newBookData.title}
                                onChange={e => {
                                    let { newBookData } = this.state;
                                    newBookData.title = e.target.value;
                                    this.setState({ newBookData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="rating">Rating</Label>
                            <Input
                                id="rating"
                                value={this.state.newBookData.rating}
                                onChange={e => {
                                    let { newBookData } = this.state;
                                    newBookData.rating = e.target.value;
                                    this.setState({ newBookData });
                                }}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addBook.bind(this)}>
                            Add
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal
                    isOpen={this.state.editBookModal}
                    toggle={this.toggleEditBookModal.bind(this)}
                >
                    <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>
                        Edit customer detail
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                id="title"
                                value={this.state.editBookData.title}
                                onChange={e => {
                                    let { editBookData } = this.state;
                                    editBookData.title = e.target.value;
                                    this.setState({ editBookData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="rating">Rating</Label>
                            <Input
                                id="rating"
                                value={this.state.editBookData.rating}
                                onChange={e => {
                                    let { editBookData } = this.state;
                                    editBookData.rating = e.target.value;
                                    this.setState({ editBookData });
                                }}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateBook.bind(this)}>
                            Update 
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                
            </div>
        );
    }
}

export default App;
