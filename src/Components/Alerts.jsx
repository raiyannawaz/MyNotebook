import { Alert } from 'react-bootstrap'
import Context from '../ContextAPI/Context'
import { useContext } from 'react'

const Alerts = () =>{

    let { alerts } = useContext(Context)

    return <Alert show={alerts.isShown} className='position-absolute py-2 px-3' variant={alerts.variant} style={{bottom: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 1075}}>
        {alerts.message} {alerts.icon}
    </Alert>
}

export default Alerts;