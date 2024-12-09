import { useState } from 'react'
import Context from './Context'
import { PriorityHigh, Check, Cancel } from '@mui/icons-material'
import { useCookies } from 'react-cookie'
import { Spinner } from 'react-bootstrap'

const ContextState = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies(['jwt'])

    const [alerts, setAlerts] = useState({ isShown: false, message: '', variant: '', icon: '' })

    const [isLoading, setIsLoading] = useState(false)

    const showAlert = ({ message, variant, icon }) => {
        setAlerts({ isShown: true, message, variant, icon })

        setTimeout(() => {
            setAlerts({ isShown: false, message: '', variant: '', icon: '' })
        }, 2500)
    }

    const [note, setNote] = useState({ _id: '', title: '', description: '', tag: '' })

    const [notes, setNotes] = useState([])

    const getNotes = async () => {
        setIsLoading(true)
        setAlerts({isShown: true, message: 'Fetching Notes ', variant: 'primary', icon: <Spinner size='sm'/>})
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/note/getnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': cookies.jwt
                }
            })

            let jsData = await response.json();

            if (response.status === 202 && response.ok) {
                setNotes(jsData)
                setIsLoading(false)
                setAlerts({ isShown: false, message: '', variant: '', icon: ''})
            }
            else{
                showAlert({message: jsData.message, variant: 'danger', icon: <Cancel/>})
                setIsLoading(false)
            }
        }
        catch (err) {
            console.log(err)
            setIsLoading(false)
            showAlert({message: err, variant: 'danger', icon: <Cancel/>})
        }
    }

    const handleAddNote = async (event) => {
        event.preventDefault();

        if (!note.title || !note.description || !note.tag) {
            return showAlert({
                message: `Please enter ${!note.title ? 'title' : !note.description ? 'description' : !note.tag ? 'tag' : ''}`,
                variant: 'warning', icon: <PriorityHigh />
            })
        }

        setIsLoading(true)
        setAlerts({isShown: true, message: 'Adding note', variant: 'primary', icon: <Spinner size='sm'/>})

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/note/addnote`, {
                method: 'POST',
                headers: {
                    'auth-token': cookies.jwt,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            })

            let jsData = await response.json()

            if (response.status === 202 && response.ok) {
                showAlert({ message: jsData.message, variant: 'success', icon: <Check /> })
                setNote({ _id: '', title: '', description: '', tag: '' })
                setNotes([...notes, jsData.newNote])
                setIsLoading(false)
            }
            else {
                showAlert({ message: jsData.message, variant: 'danger', icon: <Cancel /> })
                setIsLoading(false)
            }
        }
        catch (err) {
            console.log(err)
            showAlert({message: err, variant: 'danger', icon: <Cancel/>})
            setIsLoading(false)
        }
    }

    const [editNote, setEditNote] = useState({ editId: '', editTitle: '', editDescription: '', editTag: '' })

    const [isModal, setIsModal] = useState(false)

    const handleEditNote = ({ _id, title, description, tag }) => {
        setIsModal(true)
        setEditNote({ editId: _id, editTitle: title, editDescription: description, editTag: tag })
    }

    const handleUpdateNote = async () => {

        if (!editNote.editTitle || !editNote.editDescription || !editNote.editTag) {
            return showAlert({
                message: `Please enter ${!editNote.editTitle ? 'title' : !editNote.editDescription ? 'description' : !editNote.editTag ? 'tag' : ''}`,
                variant: 'warning', icon: <PriorityHigh />
            })
        }

        setIsLoading(true)
        setAlerts({isShown: true, message: 'Updating note', variant: 'primary', icon: <Spinner size='sm'/>})

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/note/updatenote/${editNote.editId}`, {
                method: 'PUT',
                headers: {
                    'auth-token': cookies.jwt,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: editNote.editTitle, description: editNote.editDescription, tag: editNote.editTag })
            })

            let jsData = await response.json();

            if (response.status === 202 && response.ok) {

                let newNotes = [];
                for (let i = 0; i < notes.length; i++) {
                    if (notes[i]._id === editNote.editId) {
                        notes[i].title = editNote.editTitle;
                        notes[i].description = editNote.editDescription;
                        notes[i].tag = editNote.editTag
                    }
                    newNotes = [...notes]
                }
                setNotes(newNotes)
                setEditNote({ editId: '', editTitle: '', editDescription: '', editTag: '' })
                setIsModal(false)
                showAlert({ message: jsData.message, variant: 'success', icon: <Check /> })
                setIsLoading(false)
            }
            else {
                showAlert({ message: jsData.message, variant: 'danger', icon: <Cancel /> })
                setIsLoading(false)
            }
        }
        catch (err) {
            showAlert({message: err, variant: 'danger', icon: <Cancel/>})
            setIsLoading(false)
            console.log(err)
        }

    }

    const handleDeleteNote = async (_id) => {

        // let filteredNotes = [];
        // for(let i=0; i<notes.length; i++){
        //     if(notes[i]._id !== _id){
        //         filteredNotes = [...filteredNotes, notes[i]]
        //     }
        // }

        setIsLoading(true)
        setAlerts({isShown: true, message: 'Deleting note', variant: 'primary', icon: <Spinner size='sm'/>})

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/note/deletenote/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': cookies.jwt
                }
            })

            let jsData = await response.json();

            if (response.status === 202 && response.ok) {
                showAlert({ message: jsData.message, variant: 'danger', icon: <Cancel /> })
                setIsLoading(false)

            }
            else{
                showAlert({message: jsData.message, variant: 'danger', icon: <Cancel/>})
                setIsLoading(false)
            }
        }
        catch (err) {
            console.log(err)
            showAlert({message: err, variant: 'danger', icon: <Cancel/>})
            setIsLoading(false)
        }

        let filteredNotes = notes.filter(currentNote => {
            return currentNote._id !== _id
        })
        setNotes(filteredNotes)
    }

    return (
        <Context.Provider value={{
            cookies, setCookie, removeCookie, isLoading, setIsLoading, alerts, setAlerts, showAlert,
            note, setNote, notes, setNotes, getNotes, handleAddNote, editNote, setEditNote,
            isModal, setIsModal, handleEditNote, handleUpdateNote, handleDeleteNote
        }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextState