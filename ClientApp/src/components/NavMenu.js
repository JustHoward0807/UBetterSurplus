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

    componentDidMount() {
        this.checkUser();
    }

    async checkUser() {
        try {
            const url = 'http://localhost:5064/api/User';

            const response = await fetch(url, {
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Credentials': 'true',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            });

            console.log(response);

            if (response.status === 200 || response.status === 204) {
                this.setState({
                    isLogin: true
                });
            }
        } catch (error) {
            this.setState({
                isLogin: false
            });

            console.error('Error:', error.message);
        }
    }

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            modalOpen: false,
            username: '',
            password: '',
            isLogin: false,
            usernameValidHint: "",
            passwordValidHint: "",
            passwordIncorrect: ""
        };


    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    toggleSignInSignUpModal = async () => {
        if (this.state.isLogin) {
            //     TODO: Handle sign out
            await this.handleSignOut();
        } else {
            this.setState({
                modalOpen: !this.state.modalOpen
            });
        }

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


    handleSignOut = async () => {

        // TODO: Test it with when no cookie jwt is found
        const url = 'http://localhost:5064/api/Logout';
        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }

        });

        console.log(response);
        window.location.reload();
    }

    handleSignIn = async () => {
        //     TODO: make a request to the server
        //     If success then refresh the page if user logged, else show the error message.
        const {username, password} = this.state;

        console.log('Username:', username);
        console.log('Password:', password);
        if (username.length >= 5 ) {
            this.setState({
                showValid: "hideInvalid",
            });
        } else {
            this.setState({
                showValid: "showInvalid",
            });
        }


        if (password.length >= 5 ) {
            this.setState({
                passwordValidHint: "hideInvalid",
            });
        } else {
            this.setState({
                passwordValidHint: "showInvalid",
            });
        }
        
        if (username.length >= 5 && password.length >= 5) {
            
            const result = await this.requestUserResult(username, password);
            if (result.ok) {
                window.location.reload();
            } else {
                if (!result.ok && result.statusText === "Bad Request") {
                    this.setState({
                        passwordIncorrect: "showInvalid",
                    });
                }
                console.error('Error:', result.status, result.statusText);
            }
        } 
        
    }

    async requestUserResult(username, password) {
        const url = 'http://localhost:5064/api/RegisterOrLogin';
        const data = {
            Name: username,
            Password: password,
        };

        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
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
                                <Button color="link" className="text-light nav-btn"
                                        onClick={this.toggleSignInSignUpModal}
                                        data-toggle="modal">
                                    {this.state.isLogin ? "SIGN OUT" : "LOG"}
                                </Button>
                            </NavItem>
                        </ul>
                    </Collapse>

                    <Modal isOpen={this.state.modalOpen} toggle={this.toggleSignInSignUpModal} fade={false}>
                        <ModalHeader toggle={this.toggleSignInSignUpModal}>SIGN UP / LOG IN</ModalHeader>
                        <ModalBody>
                            <Form >
                                <FormGroup controlId="validationCustom01">
                                    <FormControl
                                        type="text"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleUsernameInputChange}

                                    />
                                    <FormControl.Feedback className={this.state.showValid} type="invalid">
                                        Please provide a valid username (length >= 5).
                                    </FormControl.Feedback>
                                </FormGroup>
                                <FormGroup
                                    className="mb-3"
                                    controlId="validationCustom02"
                                >
                                    <FormControl
                                        type="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handlePasswordInputChange}
                                    />
                                    <FormControl.Feedback className={this.state.passwordValidHint} type="invalid">
                                        Please provide a valid password (length >= 5).
                                    </FormControl.Feedback>
                                </FormGroup>
                                <Button type="button" className="loginSignUpBtn" onClick={this.handleSignIn}>SIGN UP /
                                    LOG IN</Button>
                                <FormControl.Feedback className={this.state.passwordIncorrect} type="invalid">
                                    Wrong password.
                                </FormControl.Feedback>
                            </Form>
                        </ModalBody>
                        <ModalFooter>

                        </ModalFooter>
                    </Modal>
                </Navbar>
            </header>
        );
    }
}
