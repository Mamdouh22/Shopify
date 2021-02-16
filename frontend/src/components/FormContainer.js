import React, { Children } from 'react'
import {Container, Col, Row} from 'react-bootstrap'

const FormContainer = ({Children}) => {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs= {12} md={6}>
                    {Children}
                </Col>
            </Row>
            
        </Container>
    )
}

export default FormContainer
