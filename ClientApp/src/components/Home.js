import React, {Component} from 'react';
import './Home.css';
import {
    Button,
    Col,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    InputGroup,
    InputGroupText,
    Row
} from "reactstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
import {Card, FormControl} from "react-bootstrap";
import {BsSearch} from "react-icons/bs";


export class Home extends Component {
    static displayName = Home.name;

    componentDidMount() {
        this.populateSurplusItemsData();
    }

    constructor(props) {
        super(props);

        this.state = {
            dropdownCategoryOpen: false,
            dropdownSortOpen: false,
            dropdownCategoryText: "All",
            dropdownSortText: "Sort",
            surplusItems: [],
            top10Items: [],
            loading: true,
        };
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

    handleCategoryClick = (item) => {
        console.log(`Clicked: ${item}`);
        this.setState({
            dropdownCategoryText: item
        });
    };

    handleSortClick = (item) => {
        console.log(`Clicked: ${item}`);
        this.setState({
            dropdownSortText: item
        });
    };

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

        return <>{typeElements}</>;
    }

    renderSurplusItemCards(items) {
        const cards = Object.entries(items).map(([key, value]) => (

            <ItemCard key={key} itemTitle={value["Description"]} itemPrice={value["Price"]}
                      publicDate={value["Public Date"]}/>
        ));


        return <>{cards}</>;
    }


    render() {
        let displaySectionContents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderCategoriesDisplaySection(this.state.top10Items);

        let dropDownType = this.state.loading ? <p><em>Loading...</em></p> : this.dropDownType(this.state.surplusItems);

        let itemCards = this.state.loading ?
            <p><em>Loading...</em></p> : this.renderSurplusItemCards(this.state.surplusItems);


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
                                        aria-describedby="inputGroupPrepend"
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

        this.setState({surplusItems: data, loading: false, top10Items: topCategoryCounts}, () => {
            console.log(this.state.surplusItems);
            // console.log(this.state.top10Items);
        });
    }
}

const ItemCard = ({itemTitle, publicDate, itemPrice}) => {
    return (
        <Card className="text-center rounded shadow mt-4">
            <Card.Body>
                <Card.Title>{itemTitle}</Card.Title>
                {/*If the public date is unknown, show unknown*/}
                <Card.Text>Public Date: {publicDate}</Card.Text>
            </Card.Body>
            {/*If the public date is not specify, make the bg color grey (cannot buy) and text show Call to verify*/}
            <Card.Footer>{itemPrice}</Card.Footer>
        </Card>
    );
};


