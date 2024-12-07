import { Typography, Card, CardActions, CardContent, IconButton } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { useMediaQuery } from 'react-responsive'
import Context from '../ContextAPI/Context'
import { useContext } from 'react'

const Note = (props) => {

    let { title, description:desc, _id } = props.note;

    let isMobile = useMediaQuery({maxWidth: '450px'})

    let { handleEditNote, handleDeleteNote } = useContext(Context)

    return (
            <Card sx={{ boxShadow: '0' }} className='shadow'>
                <CardActions className='justify-content-between p-2'>
                    <Typography variant={isMobile ? 'h6' : 'h5'}>{title}</Typography>
                    <CardActions className='p-0'>
                        <IconButton className={`p-0 ${isMobile ? 'm-0' : ''}`} onClick={()=>{handleEditNote(props.note)}}><Edit className='text-primary' /></IconButton>
                        <IconButton className={`p-0 ${isMobile ? 'm-0' : ''}`} onClick={()=>{handleDeleteNote(_id)}}><Delete className='text-danger' /></IconButton>
                    </CardActions>
                </CardActions>
                <CardContent className='p-2'>
                    <Typography variant={isMobile ? 'subtitle2' : 'subtitle1'}>{isMobile ? desc.slice(0, 35) : desc.slice(0, 45)}...</Typography>
                </CardContent>
            </Card>
    )
}

export default Note;