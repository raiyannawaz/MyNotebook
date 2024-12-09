import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Box, Typography, TextField, Button } from '@mui/material'
import Context from '../ContextAPI/Context'
import { useState, useContext } from 'react'
import { PriorityHigh, Cancel, Check } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
 
const Register = () => {
    
    let { isLoading, setIsLoading, setCookie, setAlerts, showAlert } = useContext(Context)
    
    let navigate = useNavigate();
    
    const [ registerCredentials, setRegisterCredentials ] = useState({name: '', email: '', password: '', confirmPassword: ''})
    
    const handleChange = (event) =>{
        let { name, value } = event.target;
        setRegisterCredentials({...registerCredentials, [name]: value})
    }
    
    const handleRegister = async (event) =>{
        event.preventDefault();
        
        if(!registerCredentials.name || !registerCredentials.email || !registerCredentials.password || !registerCredentials.confirmPassword){
            return showAlert({message: `Please enter ${!registerCredentials.name ? 'name' : !registerCredentials.email ? 'email' : !registerCredentials.password ? 'password' : !registerCredentials.confirmPassword ? 'confirm password' : ''}`,
               variant:  'warning', icon: <PriorityHigh/>
            })
        }

        setIsLoading(true)
        setAlerts({isShown: true, message: 'Registering...', variant: 'primary', icon: <Spinner size='sm'/>})

        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(registerCredentials)
            })
    
            let jsData = await response.json()
    
            if(response.status === 202 && response.ok){
                showAlert({message: jsData.message, variant: 'success', icon: <Check/>})
                setRegisterCredentials({name: '', email: '', password: '', confirmPassword: ''})
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

    return <Container className='pt-5'>
        <Row>
            <Col lg={4} xs={11} className='mx-auto'>
                <Box component={'form'} onSubmit={handleRegister}>
                    <Typography variant='h3' className='mb-3'>Register</Typography>
                    <TextField type='text' name='name' label={'Name'} fullWidth size='small' className='mb-3' value={registerCredentials.name} onChange={handleChange}/>
                    <TextField type='email' name='email' label={'Email'} fullWidth size='small' className='mb-3' value={registerCredentials.email} onChange={handleChange}/>
                    <TextField type='password' name='password' label={'Password'} fullWidth size='small' className='mb-3' value={registerCredentials.password} onChange={handleChange}/>
                    <TextField type='password' name='confirmPassword' label={'Confirm Password'} fullWidth size='small' className='mb-3' value={registerCredentials.confirmPassword} onChange={handleChange}/>
                    <Button disabled={isLoading} type='submit' variant='contained'>Submit</Button>
                </Box>
            </Col>
        </Row>
    </Container>
}

export default Register