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
            modalOpen: false
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

    handleSignInLogIn = () => {
    //     TODO: make a request to the server
    //     If success then refresh the page if user logged, else show the error message.
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
                                        placeholder="Username"
                                    />
                                </FormGroup>
                                <FormGroup
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <FormControl
                                        type="password"
                                        placeholder="Password"
                                    />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" className="loginSignUpBtn" onClick={this.handleSignInLogIn}>SIGN UP / LOG IN</Button>
                        </ModalFooter>
                    </Modal>
                </Navbar>
            </header>
        );
    }
}
