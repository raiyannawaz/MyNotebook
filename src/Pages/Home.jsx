import { Container, Row, Col } from 'react-bootstrap'
import AddNote from '../Components/AddNote'
import Notes from '../Components/Notes'
import UpdateNote from '../Components/UpdateNote'

const Home = () => {
    return <Container fluid className='mt-3 pt-3'>
        <UpdateNote/>
        <Row className='gy-4 gx-lg-5 mx-auto'>
            <Col lg={4} xs={12}>
                <AddNote/>
            </Col>
            <Col lg={8} xs={12} className='mx-auto pb-lg-0 pb-4 '>
                <Notes/>
            </Col>
        </Row>
    </Container>
}

export default Home