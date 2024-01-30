import React, {useEffect, useState} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {Card, OverlayTrigger, Tooltip} from "react-bootstrap";
import {Container, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from "js-cookie";

/**
 * Why use functional component here? Just want to practice
 * @returns {Element}
 * @constructor
 */
function TrackedItems() {
    const [error, setError] = useState(false),
        [loading, setLoading] = useState(true),
        [trackedItems, setTrackedItems] = useState([]),
        [modal, setModal] = useState(false),
        [selectedItem, setSelectedItem] = useState();

    const handleClose = () => setModal(false);
    const handleShow = (item) => {
        setModal(true);
        setSelectedItem(item);
    };

    useEffect(() => {
        setTimeout(async () => {
            await populateTrackedItems();
        }, 1500);
    }, []);


    let itemCards = error ? (
        <h2 style={{color: "white"}}><em>Empty...</em></h2>
    ) : (
        loading ? (
            <Spinner
                variant="light"
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
        ) : (
            renderSurplusItemCards(trackedItems)
        )
    );

    return (
        <>
            <h1>Item Tracked: {trackedItems.length}</h1>

            <Container className="itemSection rounded shadow d-flex flex-wrap justify-content-around">

                {itemCards}
                {confirmModal(modal, handleClose)}
            </Container>
        </>
    );

    async function populateTrackedItems() {
        try {
            const response = await fetch('surplusitem/TrackedItems');
            const data = await response.json();
            console.log(data);
            setTrackedItems(data);

        } catch (error) {
            console.error('Error:', error.message);
            setError(true);
        } finally {
            setLoading(false);
        }

    }


    function renderSurplusItemCards(items) {
        const cards = items.map((item, index) => (
            <ItemCard key={index} item={item}/>
        ));
        return <>{cards}</>;
    }


    //TODO: Fix this so when item can be bought directly from here and also unTracked
    function ItemCard(item) {
        return (
            <>
                <OverlayTrigger placement="right"
                                overlay={<Tooltip id="overlay-example">Item Name: {item["item"]["Description"]}
                                    <br></br> Item Category: {item["item"]["Category"]} <br></br> Item
                                    Type: {item["item"]["Type"]}</Tooltip>}>
                    <Card className={`text-center rounded shadow m-4`}>
                        <Card.Body>
                            <Card.Title>{item["item"]["Description"]}</Card.Title>

                            <Card.Text>Public Date: {item["item"]["Public Date"]}</Card.Text>
                        </Card.Body>
                        <Card.Footer onClick={() => handleShow(item["item"])}>${item["item"]["Price"]}</Card.Footer>
                    </Card>
                </OverlayTrigger>

            </>

        );
    };

    async function handlePurchase() {
        if (Cookies.get('username') == null) {
            alert("Please sign in first to make a purchase");
            handleClose();
        } else {
            // TODO: Do sth about the return value
            await requestPurchase();

            window.location.reload();
        }

    }

    async function requestPurchase() {
        const url = 'surplusitem/Purchase';
        const data = {
            Username: Cookies.get('username'),
            Sid: selectedItem["Surplus Number"],
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
            alert("Purchase success");
        }

        if (response.status === 400) {
            alert("Purchase fail");
        }

        console.log(response);
        return response;
    }

    async function handleUntrack() {
        if (Cookies.get('username') == null) {
            alert("Please sign in first to untrack");
            handleClose();
        } else {
            // TODO: Do sth about the return value
            await requestUnTrack();

            window.location.reload();
        }

    }

    async function requestUnTrack() {
        const url = 'surplusitem/UnTrack';
        const data = {
            Username: Cookies.get('username'),
            Sid: selectedItem["Surplus Number"],
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
            alert("UnTrack success");
        }

        if (response.status === 400) {
            alert("UnTrack fail");
        }

        console.log(response);
        return response;
    }

    function confirmModal(modalStatus, closeModal) {
        return (
            <>
                <Modal show={modalStatus} onHide={closeModal}>
                    <ModalHeader>
                        Confirm
                    </ModalHeader>

                    <ModalBody>
                        Are you sure you want to continue?
                    </ModalBody>
                    <ModalFooter className="purchaseModal">
                        <Button type="button" variant="secondary" data-dismiss="modal"
                                onClick={closeModal}>Close</Button>
                        <Button type="button" data-dismiss="modal" onClick={handleUntrack}>UnTrack</Button>
                        <Button type="button" className="loginSignUpBtn" onClick={handlePurchase}>Purchase</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}


export default TrackedItems;