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
import {Search24Regular, Bookmark28Regular, Bookmark28Filled} from "@fluentui/react-icons";
import Cookies from "js-cookie";
import Spinner from "react-bootstrap/Spinner";

//TODO: Do i rly need that much this state array like do i need to have surplusItems and a filteredSurplusItems?
export class Home extends Component {
    static displayName = Home.name;

    async componentDidMount() {
        // TODO: Do i rly need to set time out?
        setTimeout(() => {
            this.populateSurplusItemsData();
        }, 1500);

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.modalOpen && this.state.selectedItem !== prevState.selectedItem) {
            await this.renderTrackedIcon();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            dropdownCategoryOpen: false,
            dropdownSortOpen: false,
            dropdownCategoryText: "All",
            dropdownSortText: "Sort (Default)",
            surplusItems: [],
            top10Items: [],
            topCategoryAvailableCounts: [],
            loading: true,
            filteredSurplusItems: [],
            searchValue: "",
            modalOpen: false,
            selectedItem: "",
            hoveredCardId: null,
            trackedIconContent: null
        };


    }

    handleMouseEnter = (cardId) => {
        this.setState({hoveredCardId: cardId});
    };

    handleMouseLeave = () => {
        this.setState({hoveredCardId: null});
    };

//     _____                     _
//    |_   _|___    __ _   __ _ | |  ___
//      | | / _ \  / _` | / _` || | / _ \
//      | || (_) || (_| || (_| || ||  __/
//      |_| \___/  \__, | \__, ||_| \___|
//                 |___/  |___/
    toggleItemCardModal = (item) => {
        this.setState({
            modalOpen: !this.state.modalOpen,
            selectedItem: item,
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

    handleBookmark = async (trackIconOption) => {
        if (trackIconOption === "Track") {
            this.setState({
                trackedIconContent: <Spinner
                    variant="dark"
                    as="span"
                    animation="border"
                    size="md"
                    role="status"
                    aria-hidden="true"
                />
            })
            
            const requestTrack = await this.requestTrack();
            
            if (requestTrack.status === 200) {
                this.setState({
                    trackedIconContent: <div onClick={() => this.handleBookmark("unTrack")}><Bookmark28Filled/></div>
                })
            } else {
                this.setState({
                    trackedIconContent: <p>Error</p>
                })
            }
            
            console.log("Track");
        }

        if (trackIconOption === "unTrack") {
            this.setState({
                trackedIconContent: <div onClick={() => this.handleBookmark("Track")}><Bookmark28Regular/></div>
            })
            console.log("unTrack");
        }
    }
    
    async requestTrack() {
        const url = 'surplusitem/Track';
        const data = {
            Username: Cookies.get('username'),
            Sid: this.state.selectedItem["Surplus Number"],
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

    handlePurchase = async () => {
        if (Cookies.get('username') == null) {
            alert("Please sign in first to make a purchase");
            this.toggleItemCardModal();
        } else {
            // TODO: Do sth about the return value
            await this.requestPurchase();

            alert("Purchase success");
            window.location.reload();
        }

    }

    async requestPurchase() {
        const url = 'surplusitem/Purchase';
        const data = {
            Username: Cookies.get('username'),
            Sid: this.state.selectedItem["Surplus Number"],
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
        } else if (item === "ableToBuy") {
            const sortedSurplusItems = [...this.state.filteredSurplusItems].sort((a, b) => {
                const dateA = a["Public Date"] === "null" ? null : new Date(a["Public Date"]);
                const dateB = b["Public Date"] === "null" ? null : new Date(b["Public Date"]);

                if (dateA === null && dateB !== null) {
                    return 1;
                } else if (dateA !== null && dateB === null) {
                    return -1;
                } else if (dateA === null && dateB === null) {
                    return 0;
                }

                return dateA - dateB;
            });
            this.setState({
                filteredSurplusItems: sortedSurplusItems,
                dropdownSortText: "Able to buy now"
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
    static renderCategoriesDisplaySection(items, availableItems) {
        const categoryEntries = Object.entries(items);
        const categoryAvailableEntries = Object.entries(availableItems);

        return (
            <>
                {categoryEntries.map(([category, count]) => {
                    const matchingAvailableEntry = categoryAvailableEntries.find(([availableCategory]) => availableCategory === category);
                    const availableCount = matchingAvailableEntry ? matchingAvailableEntry[1] : 0;

                    return (
                        <div key={category} className="itemBox">
                            <div className="d-flex item justify-content-between align-items-center">
                                <p className="itemTitle">{category}</p>
                                <p className="itemCount">{parseInt(availableCount.toString())}</p>
                            </div>
                            <ProgressBar className="shadow" min={0} max={count}
                                         now={parseInt(availableCount.toString())}/>
                        </div>
                    );
                })}
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
            <this.ItemCard key={key} item={value} cardId={key}/>
        ));


        return <>{cards}</>;
    }

    async renderTrackedIcon() {
        this.setState({
            trackedIconContent: <Spinner
                variant="dark"
                as="span"
                animation="border"
                size="md"
                role="status"
                aria-hidden="true"
            />
        });


        // Just for coolness, don't need to have setTimeout
        setTimeout(async () => {
            const url = 'surplusitem/ItemTrackCheck';
            const data = {
                Username: Cookies.get('username'),
                Sid: this.state.selectedItem["Surplus Number"],
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

            if (response.status === 200) {
                this.setState({
                    trackedIconContent: <div onClick={() => this.handleBookmark("unTrack")}><Bookmark28Filled/></div>
                })

            } else if (response.status === 404) {
                this.setState({
                    trackedIconContent: <div onClick={() => this.handleBookmark("Track")}><Bookmark28Regular/></div>
                });
            } else {
                this.setState({trackedIconContent: <p>Error</p>});
            }
        }, 600);


    }


    render() {
        let displaySectionContents = this.state.loading
            ? <Spinner
                variant="light"
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            : Home.renderCategoriesDisplaySection(this.state.top10Items, this.state.topCategoryAvailableCounts);

        let dropDownType = this.state.loading ? <p><em>Loading...</em></p> : this.dropDownType(this.state.surplusItems);

        let itemCards = this.state.loading ?
            <Spinner
                variant="light"
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            /> : this.renderSurplusItemCards(this.state.filteredSurplusItems);


        return (<>
                <Container
                    className="displaySection rounded shadow d-flex justify-content-around align-content-around flex-wrap">

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
                                    <InputGroupText id="inputGroupPrepend"><Search24Regular/></InputGroupText>
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
                                        <DropdownItem onClick={() => this.handleSortClick("priceLowToHigh")}>Price Low -
                                            High</DropdownItem>
                                        <DropdownItem onClick={() => this.handleSortClick("priceHighToLow")}>Price High
                                            -
                                            Low</DropdownItem>
                                        <DropdownItem onClick={() => this.handleSortClick("ableToBuy")}>Able to buy
                                            now</DropdownItem>
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
                    <ModalHeader toggle={this.toggleItemCardModal}>
                        Confirm purchase
                        {this.state.trackedIconContent}
                    </ModalHeader>

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

        const response = await fetch('surplusitem');
        const data = await response.json();

        const categoryCounts = {};
        const categoryAvailableCounts = {};

        data.forEach(item => {
            const category = item["Category"];
            const qty = item["Qty"];
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            if (qty > 0) {
                categoryAvailableCounts[category] = (categoryAvailableCounts[category] || 0) + 1;
            }
        });


        const categoryEntries = Object.entries(categoryCounts);
        const categoryAvailableEntries = Object.entries(categoryAvailableCounts);

        categoryEntries.sort((a, b) => b[1] - a[1]);
        categoryAvailableEntries.sort((a, b) => b[1] - a[1]);

        const topCategories = categoryEntries.slice(0, 10);
        const topAvailableCategories = categoryAvailableEntries.slice(0, 10);

        const topCategoryCounts = Object.fromEntries(topCategories);
        const topCategoryAvailableCounts = Object.fromEntries(topAvailableCategories);

        console.log(topCategoryCounts);
        console.log(topCategoryAvailableCounts);
        this.setState({
            surplusItems: data,
            loading: false,
            top10Items: topCategoryCounts,
            filteredSurplusItems: data,
            topCategoryAvailableCounts: topCategoryAvailableCounts
        }, () => {
            // console.log(this.state.surplusItems);
            // console.log(this.state.top10Items);
        });
    }


    /**
     * If the public date is unknown, show unknown
     * If the public date is not specify, make the bg color grey (cannot buy) and text show Call to verify
     * @param item
     * @param cardId
     * @returns {Element}
     */
    ItemCard = ({item, cardId}) => {
        if (item["Qty"] > 0) {
            const publicDateAvailable = item["Public Date"] === "null" ? "Unknown" : item["Public Date"];
            const isHovered = this.state.hoveredCardId === cardId;
            return (
                <Card className="text-center rounded shadow m-4" onMouseEnter={() => this.handleMouseEnter(cardId)}
                      onMouseLeave={this.handleMouseLeave}>
                    <Card.Body>
                        <Card.Title>{item["Description"]}</Card.Title>
                        <Card.Subtitle>Public Date: {publicDateAvailable}</Card.Subtitle>
                        {/*<div className="card-text">Availability: <Card.Text style={{ fontWeight: "bold", textDecoration: "underline", fontSize:"15px" }}>{item["Qty"]}</Card.Text></div>*/}
                    </Card.Body>

                    <Card.Footer className={`price-footer ${publicDateAvailable === "Unknown" ? "unknown" : ""}`}
                                 onClick={publicDateAvailable === "Unknown" ? () => alert("This item is unavailable, please call 801.581.7917 to verify") : () => this.toggleItemCardModal(item)}>{publicDateAvailable === "Unknown" && isHovered ? "Call to verify" : `$${item["Price"]}`}</Card.Footer>
                </Card>
            );
        }

    };

}




