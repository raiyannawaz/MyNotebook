import { useContext } from 'react'
import Context from '../ContextAPI/Context'
import Loader from '../Components/Loader'
const Logout = () => {
    let { isLoading } = useContext(Context)
    return isLoading ? <Loader/> : ''
}

export default Logout