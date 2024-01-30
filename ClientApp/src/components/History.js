import React, {Component} from "react";
import {Card, OverlayTrigger, Tooltip} from "react-bootstrap";
import {Container} from "reactstrap";
import Spinner from 'react-bootstrap/Spinner';

export class History extends Component {
    static displayName = History.name;

    async componentDidMount() {
        setTimeout(async () => {
           await this.populatePurchaseSurplusItemsData();
        }, 1500);
    }

    constructor(props) {
        super(props);
        this.state = {
            purchasedItems: [],
            loading: true,
            error: false
        };


    }

    renderSurplusItemCards(items) {
        const cards = items.map((item, index) => (
            <this.ItemCard key={index} item={item}/>
        ));
        return <>{cards}</>;
    }

    // TODO: Maybe some sort of analysis up here saying total buying price
    render() {
        let itemCards = this.state.error ? (
            <h2 style={{color: "white"}}><em>Empty...</em></h2>
        ) : (
            this.state.loading ? (
                <Spinner
                    variant="light"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            ) : (
                this.renderSurplusItemCards(this.state.purchasedItems)
            )
        );
        return (
            <>
                <h1>Item Bought: {this.state.purchasedItems.length}</h1>
                <Container className="itemSection rounded shadow d-flex flex-wrap justify-content-around">
                {itemCards}
            </Container>
            </>

        );
    }

    async populatePurchaseSurplusItemsData() {
        try {
            const response = await fetch('surplusitem/PurchaseHistory');
            const data = await response.json();
            
            this.setState({
                purchasedItems: data,
                loading: false,
            }, () => {
                // console.log(this.state.purchasedItems[0]['surplusItem']['Description']);
                // console.log(this.state.purchasedItems);
            });
        } catch (error) {
            console.error('Error:', error.message);
            this.setState({
                error: true
            })
        }

    }

    ItemCard = ({item}) => {
        console.log(item)
        return (
            <>
                <OverlayTrigger placement="right"
                                overlay={<Tooltip id="overlay-example">Item Name: {item["surplusItem"]["Description"]}
                                    <br></br> Item Category: {item["surplusItem"]["Category"]} <br></br> Item
                                    Type: {item["surplusItem"]["Type"]}</Tooltip>}>
                    <Card className={`text-center rounded shadow m-4`}>
                        <Card.Body>
                            <Card.Title>{item["surplusItem"]["Description"]}</Card.Title>

                            <Card.Text>Bought Date: {new Date(item["purchaseTime"]).toLocaleString()}</Card.Text>
                        </Card.Body>
                        <Card.Footer>${item["surplusItem"]["Price"]}</Card.Footer>
                    </Card>
                </OverlayTrigger>

            </>

        );
    };
}