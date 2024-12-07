import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Context from '../ContextAPI/Context'
import { useContext } from 'react'
import { Cancel } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Navs = () =>{

    let { cookies, removeCookie, showAlert } = useContext(Context)

    let navigate = useNavigate()

    const handleLogout = async () =>{
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
                removeCookie('jwt')
                navigate('/login')
            }
        }
        catch(err){
            console.log(err)
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