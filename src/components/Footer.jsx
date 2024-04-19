import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-1">&copy; В.В. Каменев, 2024г.</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
