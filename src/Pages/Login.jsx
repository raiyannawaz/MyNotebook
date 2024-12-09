import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Box, Typography, TextField, Button } from '@mui/material'
import Context from '../ContextAPI/Context'
import { useState, useContext } from 'react'
import { PriorityHigh, Cancel, Check } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    let navigate = useNavigate()

    let { isLoading, setIsLoading, setAlerts, showAlert, setCookie } = useContext(Context)

    const [loginCredentials, setLoginCredentials] = useState({email: '', password: ''})

    const handleChange = (event) =>{
        let { name, value } = event.target;
        setLoginCredentials({...loginCredentials, [name]: value})
    }

    const handleLogin = async (event) =>{
        event.preventDefault()

        if(!loginCredentials.email || !loginCredentials.password){
            return showAlert({message:  `Please enter ${!loginCredentials.email ? 'email' : !loginCredentials.password ? 'password' : ''}`,
                variant: 'warning', icon: <PriorityHigh/>})
        }
        
        setIsLoading(true)
        setAlerts({isShown: true, message: 'Logging in...', variant: 'primary', icon: <Spinner size='sm'/>})

        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(loginCredentials)
            })
    
            let jsData = await response.json()
    
            if(response.status === 202 && response.ok){
                showAlert({message: jsData.message, variant: 'success', icon: <Check/>})
                setLoginCredentials({email: '', password: ''})
                setCookie('jwt', jsData.token)
                setIsLoading(false)
                navigate('/')
            }
            else{
                showAlert({message: jsData.message, variant: 'danger', icon: <Cancel/>})
                setIsLoading(false)
            }
        }
        catch(err){
            console.log(err)
            showAlert({message: err, variant: 'danger', icon: <Cancel/>})
            setIsLoading(false)
        }
    }

    return (
        <Container className='pt-5'>
            <Row>
                <Col lg={4} xs={11} className='mx-auto'>
                    <Box component={'form'} onSubmit={handleLogin}>
                        <Typography variant='h3' className='mb-3'>Login</Typography>
                        <TextField type='email' name='email' fullWidth size='small' label='Email' className='mb-3' value={loginCredentials.email} onChange={handleChange}/>
                        <TextField type='password' name='password' fullWidth size='small' label='Password' className='mb-3' value={loginCredentials.password} onChange={handleChange}/>
                        <Button disabled={isLoading} type='submit' variant='contained'>Submit</Button>
                    </Box>
                </Col>
            </Row>
        </Container>
    )
}

export default Login