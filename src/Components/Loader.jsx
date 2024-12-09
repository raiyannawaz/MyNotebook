import { CircularProgress, Stack } from '@mui/material'
import { useMediaQuery } from 'react-responsive'

const Loader = () => {

    let isMobile = useMediaQuery({maxWidth: '450px'})

    return <Stack className='pt-lg-5 mt-5'>
        <CircularProgress color='primary' className='mx-auto' size={isMobile ? '7.5rem' : '10rem'} />
    </Stack>

}

export default Loader