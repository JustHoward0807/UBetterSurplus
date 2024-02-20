import {Col, Container, Row} from "reactstrap";
import React from "react";
import './About.css';
import {Image, Stack} from "react-bootstrap";

function About() {
    return (
        <>
            <Container className="rounded aboutDisplaySection">
                <Row>
                    <Col className="d-flex imgCol">
                        <Image src="profile.jpg" fluid rounded/>
                    </Col>
                    <Col className="align-self-center">
                        <Stack gap={5}>
                            <div>
                                <h2 className="fw-bold">What's UBetterSurplus?</h2>
                                <p>
                                    UBetterSurplus is a <span className="fw-semibold">concept</span> website that allows
                                    customers to easily purchase items from the <a target="_blank" rel="noreferrer"
                                       href="https://fbs.admin.utah.edu/surplus/">University of Utah Surplus
                                        store</a> without
                                    sorting through lengthy text lists. The website helps customers quickly identify
                                    available products and their purchase availability from the store. </p>
                            </div>
                            <div>
                                <h2 className="fw-bold">Why UBetterSurplus?</h2>
                                <p>
                                    As an international student, we often need to buy cheap stuff such as furniture,
                                    monitor
                                    or a desk. University of Utah Surplus Store is typically the first place that comes
                                    to
                                    mind for such purchases. However, the store relies on a
                                    <a target="_blank"
                                       rel="noreferrer"
                                       href="https://fbs.admin.utah.edu/download/Surplus/listing.pdf"> PDF
                                        file </a> to
                                    update
                                    customers
                                    about the current availability and timing of items. The way it displays the items is
                                    a
                                    HUGE pain; hence, I created this website to better showcase the items from that PDF
                                    file
                                    through data visualization and improved search filters.
                                </p>
                            </div>
                        </Stack>
                    </Col>
                </Row>
            </Container>

            <Container className="socialMediaSection d-flex  justify-content-center">
                <Stack direction="horizontal" gap={5}>
                    <a target="_blank" rel="noreferrer" href="https://www.instagram.com/howard_.t/"> <Image
                        src="/instagram.png"></Image> </a>
                    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/justhoward0807/"> <Image
                        src="/linkedin.png"></Image> </a>
                </Stack>


            </Container>


        </>
    );

}

export default About;