import { Box, Typography, TextField, Button } from '@mui/material'
import Context from '../ContextAPI/Context'
import { useContext } from 'react'

const AddNote = () => {
    
    let { isLoading, note, setNote, handleAddNote } = useContext(Context);

    const handleChange = (event) => {
        let { name, value } = event.target;
        setNote({ ...note, [name]: value })
    }

    return (
        <Box component={'form'} onSubmit={handleAddNote}>
            <Typography variant='h4' className='mb-3'>Add Note</Typography>
            <TextField type='text' name='title' fullWidth label='Title' size='small' className='mb-3' value={note.title} onChange={handleChange} />
            <TextField type='text' name='description' fullWidth label='Description' size='small' className='mb-3' value={note.description} onChange={handleChange} />
            <TextField type='text' name='tag' fullWidth label='Tag' size='small' className='mb-3' value={note.tag} onChange={handleChange} />
            <Button disabled={isLoading} type='submit' variant='contained'>Submit</Button>
        </Box>
    )
}

export default AddNote