import { useState } from 'react';
import NoteContext from './noteContext';
 
 const NoteState = (props) => {
    const host = "http://localhost:5000";
    const noteinitial = [];  
    const [notes, setNotes] = useState(noteinitial);

    const getAllNotes = async() => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json();
        //console.log(json);
        setNotes(json);
    }

    const addNote = async (name, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({name, description, tag}) 
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    const editNote = async (id, name, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({name, description, tag}) 
        });
        const json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes));
        for(let index=0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].name = name;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    const deleteNotes = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
            }
        });
        const json = response.json();
        const newNotes = notes.filter((note)=> { return note._id !== id });
        setNotes(newNotes);
    }
   return (
       <NoteContext.Provider value={{notes, getAllNotes, addNote, editNote, deleteNotes}}>
           {props.children}
       </NoteContext.Provider>
   )
 }
 
 export default NoteState
 