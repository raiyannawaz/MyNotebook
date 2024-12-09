import { Alert } from 'react-bootstrap'
import Context from '../ContextAPI/Context'
import { useContext } from 'react'
import { useMediaQuery } from 'react-responsive'

const Alerts = () =>{

    let { isLoading, alerts } = useContext(Context)

    let isMobile = useMediaQuery({maxWidth: '450px'});

    return <Alert show={alerts.isShown} className={`position-absolute py-2 px-${isLoading ? '3' : '2'}`} variant={alerts.variant} style={{minWidth: isMobile ? '70vw' : '', textAlign: isMobile ? 'center' : '', bottom: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 1075}}>
        {alerts.message} {alerts.icon}
    </Alert>
}

export default Alerts;