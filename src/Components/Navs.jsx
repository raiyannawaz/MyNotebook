import { Navbar, Nav, Container, Spinner } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Context from '../ContextAPI/Context'
import { useContext } from 'react'
import { Cancel } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Navs = () =>{

    let { cookies, removeCookie, setAlerts, showAlert, setIsLoading } = useContext(Context)

    let navigate = useNavigate()

    const handleLogout = async () =>{
        setIsLoading(true)
        setAlerts({isShown: true, message: 'Logging out...', variant: 'primary', icon: <Spinner size='sm'/>})
        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'auth-token' : cookies.jwt
                }
            })

            let jsData = await response.json();

            if(response.status === 202 && response.ok){
                showAlert({message: jsData.message, variant: 'danger', icon: <Cancel/>})
                setIsLoading(false)
                removeCookie('jwt')
                navigate('/login')
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

    return(
        <Navbar expand={'lg'} bg='light'>
            <Container>
                <Navbar.Brand>MyNoteBook</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    { cookies.jwt ? <Nav className='ms-auto'>
                        <Nav.Item>
                            <NavLink to={'/'} className={'nav-link'}>Home</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                        <NavLink to={'/logout'} className={'nav-link'} onClick={handleLogout}>Logout</NavLink>
                        </Nav.Item>
                    </Nav> :
                    <Nav className='ms-auto'>
                        <Nav.Item>
                            <NavLink to={'/register'} className={'nav-link'}>Register</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                        <NavLink to={'/login'} className={'nav-link'}>Login</NavLink>
                        </Nav.Item>
                    </Nav>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navs