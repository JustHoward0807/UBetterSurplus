import React, {Component} from 'react';
import {
    Button,
    Collapse,
    Modal,
    ModalBody,
    ModalHeader,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink
} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NavMenu.css';

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
    
    toggleModal = () =>  {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }
    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white shadow mb-3"
                        container>
                    <NavbarBrand href="/" >UBetterSurplus</NavbarBrand>
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
                                <Button color="link" className="text-light nav-btn" onClick={this.toggleModal} data-toggle="modal">
                                    LOG
                                </Button>
                            </NavItem>
                        </ul>
                    </Collapse>

                    <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} fade={false}>
                        <ModalHeader toggle={this.toggleModal}>Log Modal</ModalHeader>
                        <ModalBody>
                            This is your log modal content.
                        </ModalBody>
                    </Modal>
                </Navbar>
            </header>
        );
    }
}
