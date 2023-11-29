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

    static renderSurplusItemsTable(items) {
        const categoryEntries = Object.entries(items);

        return (
            <>
                {categoryEntries.map(([category, count]) => (
                    <div key={category} className="itemBox">
                        <div className="d-flex item justify-content-between align-items-center">
                            <p className="itemTitle">{category}</p>
                            <p className="itemCount">{count}</p>
                        </div>
                        <ProgressBar className="shadow" now={60} />
                    </div>
                ))}
            </>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderSurplusItemsTable(this.state.top10Items);
        
        return (<>
            <Container className="displaySection rounded shadow d-flex justify-content-start flex-wrap">

                {contents}
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
                                <DropdownMenu>
                                    <DropdownItem header>Header</DropdownItem>
                                    <DropdownItem onClick={() => this.handleCategoryClick("Some Action")}>Some
                                        Action</DropdownItem>
                                    <DropdownItem onClick={() => this.handleCategoryClick("Dropdown Item Text")}>
                                        Dropdown Item Text
                                    </DropdownItem>
                                    {/*<DropdownItem disabled>Action (disabled)</DropdownItem>*/}
                                    {/*<DropdownItem divider/>*/}
                                    {/*<DropdownItem onClick={() => this.handleClick("Foo Action")}>Foo*/}
                                    {/*    Action</DropdownItem>*/}
                                    {/*<DropdownItem onClick={() => this.handleClick("Bar Action")}>Bar*/}
                                    {/*    Action</DropdownItem>*/}
                                    {/*<DropdownItem onClick={() => this.handleClick("Quo Action")}>Quo*/}
                                    {/*    Action</DropdownItem>*/}
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
                                    <DropdownItem onClick={() => this.handleSortClick("priceHighToLow")}>Price High -
                                        Low</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>


                        </div>
                    </Col>

                </Row>

            </Container>


            <Container className="itemSection rounded shadow d-flex flex-wrap justify-content-around">
                <ItemCard itemTitle="Camera" itemPrice="100" publicDate="10/20/2023"/>
                <ItemCard itemTitle="Camera" itemPrice="100" publicDate="10/20/2023"/>
                <ItemCard itemTitle="Camera" itemPrice="100" publicDate="10/20/2023"/>
                <ItemCard itemTitle="Camera" itemPrice="100" publicDate="10/20/2023"/>
                <ItemCard itemTitle="Camera" itemPrice="100" publicDate="10/20/2023"/>
                <ItemCard itemTitle="Camera" itemPrice="100" publicDate="10/20/2023"/>
                <ItemCard itemTitle="Camera" itemPrice="100" publicDate="10/20/2023"/>
            </Container>
        </>


            /*
            <div>
                <h1>Hello, world!</h1>
                <p>Welcome to your new single-page application, built with:</p>
                <ul>
                    <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a
                        href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform
                        server-side code
                    </li>
                    <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
                    <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
                </ul>
                <p>To help you get started, we have also set up:</p>
                <ul>
                    <li><strong>Client-side navigation</strong>. For example,
                        click <em>Counter</em> then <em>Back</em> to return here.
                    </li>
                    <li><strong>Development server integration</strong>. In development mode, the development server
                        from <code>create-react-app</code> runs in the background automatically, so your client-side
                        resources are dynamically built on demand and the page refreshes when you modify any file.
                    </li>
                    <li><strong>Efficient production builds</strong>. In production mode, development-time features
                        are disabled, and your <code>dotnet publish</code> configuration produces minified,
                        efficiently bundled JavaScript files.
                    </li>
                </ul>
                <p>The <code>ClientApp</code> subdirectory is a standard React application based on
                    the <code>create-react-app</code> template. If you open a command prompt in that directory, you
                    can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
            </div>
            */);
    }

    async populateSurplusItemsData() {
        // TODO: do sth here for the display section array
        const response = await fetch('surplusitem');
        const data = await response.json();

        const categoryCounts = {};

        data.forEach(item => {
            const category = item.Category
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });


        const categoryEntries = Object.entries(categoryCounts);

        categoryEntries.sort((a, b) => b[1] - a[1]);

        const topCategories = categoryEntries.slice(0, 10);

        const topCategoryCounts = Object.fromEntries(topCategories);

        this.setState({surplusItems: data, loading: false, top10Items: topCategoryCounts}, () => {
            console.log(this.state.surplusItems);
            console.log(this.state.top10Items);
        });
    }
}


// export default function CustomDropDownMenu({ direction, ...args }) {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//
//     const toggle = () => setDropdownOpen((prevState) => !prevState);
//     const handleClick = (props) => {
//         console.log("handle click")
//         console.log(props)
//     }
//     return (
//         <div className="d-flex p-5">
//             <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} >
//                 <DropdownToggle caret>Dropdown</DropdownToggle>
//                 <DropdownMenu {...args}>
//                     <DropdownItem header>Header</DropdownItem>
//                     <DropdownItem onClick={() => handleClick()}>Some Action</DropdownItem>
//                     <DropdownItem text>Dropdown Item Text</DropdownItem>
//                     <DropdownItem disabled>Action (disabled)</DropdownItem>
//                     <DropdownItem divider />
//                     <DropdownItem>Foo Action</DropdownItem>
//                     <DropdownItem>Bar Action</DropdownItem>
//                     <DropdownItem>Quo Action</DropdownItem>
//                 </DropdownMenu>
//             </Dropdown>
//         </div>
//     );
// }
//
// CustomDropDownMenu.propTypes = {
//     direction: PropTypes.string,
// };

const ItemCard = ({itemTitle, publicDate, itemPrice}) => {
    return (
        <Card className="text-center rounded shadow mt-4">
            <Card.Body>
                <Card.Title>{itemTitle}</Card.Title>
                {/*If the public date is unknown, show unknown*/}
                <Card.Text>Public Date: {publicDate}</Card.Text>
            </Card.Body>
            {/*If the public date is not specify, make the bg color grey (cannot buy) and text show Call to verify*/}
            <Card.Footer>${itemPrice}</Card.Footer>
        </Card>
    );
};