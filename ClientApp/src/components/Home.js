import React, {Component} from 'react';
import './Home.css';
import {
    Button,
    Col,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle, InputGroup,
    InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader,
    Row
} from "reactstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
import {Card, FormControl} from "react-bootstrap";
import {BsSearch} from "react-icons/bs";

//TODO: Do i rly need that much this state array like do i need to have surplusItems and a filteredSurplusItems?
export class Home extends Component {
    static displayName = Home.name;
    componentDidMount() {
        this.populateSurplusItemsData();
    }

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            dropdownCategoryOpen: false,
            dropdownSortOpen: false,
            dropdownCategoryText: "All",
            dropdownSortText: "Sort (Default)",
            surplusItems: [],
            top10Items: [],
            loading: true,
            filteredSurplusItems: [],
            searchValue: "",
            modalOpen: false,
        };
        

    }

//     _____                     _
//    |_   _|___    __ _   __ _ | |  ___
//      | | / _ \  / _` | / _` || | / _ \
//      | || (_) || (_| || (_| || ||  __/
//      |_| \___/  \__, | \__, ||_| \___|
//                 |___/  |___/
    toggleItemCardModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }
    categoryToggle = () => {
        this.setState((prevState) => ({
            dropdownCategoryOpen: !prevState.dropdownCategoryOpen,
        }));
    };

    sortToggle = () => {
        this.setState((prevState) => ({
            dropdownSortOpen: !prevState.dropdownSortOpen,
        }));
    }

//     _   _                 _ _
//    | | | | __ _ _ __   __| | | ___
//    | |_| |/ _` | '_ \ / _` | |/ _ \
//    |  _  | (_| | | | | (_| | |  __/
//    |_| |_|\__,_|_| |_|\__,_|_|\___|
    
    handlePurchase = () => {
    //     TODO: handle purchase logic here
    //     send a request to server with username and everything.
    }
    handleCategoryClick = (itemType) => {
        console.log(`Clicked: ${itemType}`);
        if (itemType === "All") {
            this.setState({
                dropdownCategoryText: itemType,
                filteredSurplusItems: this.state.surplusItems,
                searchValue: ""
            });
        } else {
            const filteredItems = this.state.surplusItems.filter(item =>
                item["Type"].toLowerCase().includes(itemType.toLowerCase())
            );

            this.setState({
                dropdownCategoryText: itemType,
                filteredSurplusItems: filteredItems,
                searchValue: ""
            });
        }


    };

    handleSortClick = (item) => {
        console.log(`Clicked: ${item}`);
        if (item === "priceLowToHigh") {
            const sortedSurplusItems = [...this.state.filteredSurplusItems].sort((a, b) => a["Price"] - b["Price"]);
            this.setState({
                filteredSurplusItems: sortedSurplusItems,
                dropdownSortText: "Price Low - High"
            });
        } else if (item === "priceHighToLow") {
            const sortedSurplusItems = [...this.state.filteredSurplusItems].sort((a, b) => b["Price"] - a["Price"]);
            this.setState({
                filteredSurplusItems: sortedSurplusItems,
                dropdownSortText: "Price High - Low"
            });
        }

    };

    handleSearch = (searchItem) => {
        console.log(this.state.filteredSurplusItems.length);
        const filteredItems = this.state.surplusItems.filter(item =>
            item["Description"].toLowerCase().includes(searchItem.toLowerCase())
        );
        this.setState({
            filteredSurplusItems: filteredItems,
            dropdownCategoryText: "All",
            searchValue: searchItem
        });
    }

    
    //   ____                _           
    //  |  _ \ ___ _ __   __| | ___ _ __ 
    //  | |_) / _ \ '_ \ / _` |/ _ \ '__|
    //  |  _ <  __/ | | | (_| |  __/ |   
    //  |_| \_\___|_| |_|\__,_|\___|_|   
    static renderCategoriesDisplaySection(items) {
        const categoryEntries = Object.entries(items);

        return (
            <>
                {categoryEntries.map(([category, count]) => (
                    <div key={category} className="itemBox">
                        <div className="d-flex item justify-content-between align-items-center">
                            <p className="itemTitle">{category}</p>
                            <p className="itemCount">{count}</p>
                        </div>
                        <ProgressBar className="shadow" min={0} max={count} now={count}/>
                    </div>
                ))}
            </>
        );
    }

    dropDownType(items) {
        const uniqueTypes = new Set();

        const defaultItem = (
            <DropdownItem key="default" onClick={() => this.handleCategoryClick("All")}>
                All
            </DropdownItem>
        );

        const typeElements = Object.entries(items).map(([key, value]) => {
            if (!uniqueTypes.has(value.Type)) {
                uniqueTypes.add(value.Type);

                return (
                    <DropdownItem key={key} onClick={() => this.handleCategoryClick(value.Type)}>
                        {value.Type}
                    </DropdownItem>
                );
            }

            return null;
        });

        // Prepend the default item
        const dropdownItems = [defaultItem, ...typeElements];

        return <>{dropdownItems}</>;
    }

    renderSurplusItemCards(items) {
        const cards = Object.entries(items).map(([key, value]) => (
            <this.ItemCard key={key} item={value}/>
        ));


        return <>{cards}</>;
    }


    render() {
        let displaySectionContents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderCategoriesDisplaySection(this.state.top10Items);

        let dropDownType = this.state.loading ? <p><em>Loading...</em></p> : this.dropDownType(this.state.surplusItems);

        let itemCards = this.state.loading ?
            <p><em>Loading...</em>
            </p> : this.renderSurplusItemCards(this.state.filteredSurplusItems);


        return (<>
                <Container className="displaySection rounded shadow d-flex justify-content-start flex-wrap">

                    {displaySectionContents}
                    {/*Maximum display: 10*/}
                    {/*<div className="itemBox">*/}
                    {/*    <div className="d-flex item justify-content-between align-items-center">*/}
                    {/*        <p className="itemTitle">Art and Performing Arts Equipment/Supply</p>*/}
                    {/*        <p className="itemCount"> 6 </p>*/}
                    {/*    </div>*/}
                    {/*    <ProgressBar now={60}/>*/}
                    {/*</div>*/}
                </Container>


                <Container className="filterSection d-flex justify-content-around ">
                    <Row>

                        <Col sm className="filterColumn">
                            <div className="filterCategory">

                                <Dropdown isOpen={this.state.dropdownCategoryOpen} toggle={this.categoryToggle}>
                                    <DropdownToggle caret>{this.state.dropdownCategoryText}</DropdownToggle>
                                    <DropdownMenu className="customMenu">
                                        {dropDownType}
                                    </DropdownMenu>
                                </Dropdown>


                            </div>
                        </Col>


                        <Col sm className="filterColumn">
                            <div className="filterSearch">
                                <InputGroup>
                                    <InputGroupText id="inputGroupPrepend"><BsSearch/></InputGroupText>
                                    <FormControl
                                        type="text"
                                        placeholder="Search"
                                        value={this.state.searchValue}
                                        aria-describedby="inputGroupPrepend"
                                        onChange={(e) => this.handleSearch(e.target.value)}
                                    />
                                </InputGroup>
                            </div>
                        </Col>

                        <Col sm className="filterColumn">
                            <div className="filterCategory">

                                <Dropdown isOpen={this.state.dropdownSortOpen} toggle={this.sortToggle}>
                                    <DropdownToggle caret>{this.state.dropdownSortText}</DropdownToggle>
                                    <DropdownMenu>
                                        {/*<DropdownItem header>Header</DropdownItem>*/}
                                        <DropdownItem onClick={() => this.handleSortClick("priceLowToHigh")}>Price Low -
                                            High</DropdownItem>
                                        <DropdownItem onClick={() => this.handleSortClick("priceHighToLow")}>Price High
                                            -
                                            Low</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>


                            </div>
                        </Col>

                    </Row>

                </Container>


                <Container className="itemSection rounded shadow d-flex flex-wrap justify-content-around">
                    {itemCards}
                </Container>

                <Modal isOpen={this.state.modalOpen} toggle={this.toggleItemCardModal} fade={false}>
                    <ModalHeader toggle={this.toggleItemCardModal}>Confirm purchase</ModalHeader>
                    <ModalBody>
                        Are you sure you want to continue purchase?
                    </ModalBody>
                    <ModalFooter className="purchaseModal">
                        <Button type="button" data-dismiss="modal" onClick={this.toggleItemCardModal}>Close</Button>
                        <Button type="button" className="loginSignUpBtn" onClick={this.handlePurchase}>Purchase</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }

    async populateSurplusItemsData() {
        // TODO: do sth here for the display section array
        const response = await fetch('surplusitem');
        const data = await response.json();

        const categoryCounts = {};

        data.forEach(item => {
            const category = item["Category"];
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });


        const categoryEntries = Object.entries(categoryCounts);

        categoryEntries.sort((a, b) => b[1] - a[1]);

        const topCategories = categoryEntries.slice(0, 10);

        const topCategoryCounts = Object.fromEntries(topCategories);

        this.setState({
            surplusItems: data,
            loading: false,
            top10Items: topCategoryCounts,
            filteredSurplusItems: data
        }, () => {
            // console.log(this.state.surplusItems);
            // console.log(this.state.top10Items);
        });
    }


    ItemCard = ({item}) => {
        return (
            <Card className="text-center rounded shadow mt-4" onClick={() => this.toggleItemCardModal()}>
                <Card.Body>
                    <Card.Title>{item["Description"]}</Card.Title>
                    {/*If the public date is unknown, show unknown*/}
                    <Card.Text>Public Date: {item["Public Date"]}</Card.Text>
                </Card.Body>
                {/*If the public date is not specify, make the bg color grey (cannot buy) and text show Call to verify*/}
                <Card.Footer>${item["Price"]}</Card.Footer>
            </Card>
        );
    };

}




