import { useContext, useEffect } from 'react'
import Context from '../ContextAPI/Context'
import { Typography } from '@mui/material'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Error } from '@mui/icons-material'
import Note from '../Components/Note'
import Loader from '../Components/Loader'

const Notes = () => {

    let { isLoading, notes, cookies, getNotes, showAlert } = useContext(Context)

    let navigate = useNavigate()

    useEffect(()=>{
        if(cookies.jwt){
            getNotes()
        }
        else{
            navigate('/login')
            showAlert({message: 'Please login/sign up', variant: 'danger', icon: <Error/>})
        }
    }, [cookies])

    return (
        <Row className='g-3'>
            { isLoading ? <Loader/> :
                notes.length === 0 ? <Typography variant='h4' className='mt-4'>No Notes</Typography> : 
                notes.map(note => {
                    return <Col lg={3} xs={6} key={note._id}>
                        <Note note={note}/>
                    </Col>
            })}
        </Row>
    )
}

export default Notes