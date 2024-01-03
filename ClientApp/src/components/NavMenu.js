import React, {Component} from 'react';
import {
    Button,
    Collapse, Form, FormGroup,
    Modal,
    ModalBody, ModalFooter,
    ModalHeader,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink
} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NavMenu.css';
import {FormControl} from "react-bootstrap";

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            modalOpen: false,
            username: '',
            password: '',
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    handleUsernameInputChange = (e) => {
        const {value} = e.target;
        this.setState({
            username: value,
        });
    };

    handlePasswordInputChange = (e) => {
        const {value} = e.target;
        this.setState({
            password: value,
        });
    };

    handleSignInLogIn = async () => {
        //     TODO: make a request to the server
        //     If success then refresh the page if user logged, else show the error message.
        const {username, password} = this.state;
        // Perform your logic with username and password here
        console.log('Username:', username);
        console.log('Password:', password);
        const result = await this.requestUserResult();
        if (result.ok) {
            // window.location.reload();

        } else {
            console.error('Error:', result.status, result.statusText);
        }
    }

    async requestUserResult() {
        const url = 'http://localhost:5064/api/RegisterOrLogin';
        const data = {
            // Your request payload data goes here
            // For example, if you need to send username and password:
            Name: 'Howard',
            Password: '123',
        };

        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        });

        console.log(response);
        return response;
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white shadow mb-3"
                        container>
                    <NavbarBrand href="/">UBetterSurplus</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                    <Collapse className="d-sm-inline-flex " isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav">
                            <NavItem>
                                <NavLink tag={Link} className="text-light nav-btn" to="/counter">ABOUT</NavLink>
                            </NavItem>
                            {/*<NavItem>*/}
                            {/*    <NavLink tag={Link} className="text-light nav-btn" to="/fetch-data">LOG</NavLink>*/}
                            {/*</NavItem>*/}

                            <NavItem>
                                <Button color="link" className="text-light nav-btn" onClick={this.toggleModal}
                                        data-toggle="modal">
                                    LOG
                                </Button>
                            </NavItem>
                        </ul>
                    </Collapse>

                    <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} fade={false}>
                        <ModalHeader toggle={this.toggleModal}>SIGN UP / LOG IN</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup controlId="exampleForm.ControlInput1">
                                    <FormControl
                                        type="text"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleUsernameInputChange}
                                    />
                                </FormGroup>
                                <FormGroup
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <FormControl
                                        type="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handlePasswordInputChange}
                                    />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" className="loginSignUpBtn" onClick={this.handleSignInLogIn}>SIGN UP /
                                LOG IN</Button>
                        </ModalFooter>
                    </Modal>
                </Navbar>
            </header>
        );
    }
}
