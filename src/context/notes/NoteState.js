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
              'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxMGZiOTExYTRmOGJjMzVmMTBhNjE2In0sImlhdCI6MTY0NTMyOTIzNH0.c1v9seTwqf8J7xLiwpaPnpbwLex7kkrmc6eFk9FNeNs'
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    const addNote = async (name, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxMGZiOTExYTRmOGJjMzVmMTBhNjE2In0sImlhdCI6MTY0NTMyOTIzNH0.c1v9seTwqf8J7xLiwpaPnpbwLex7kkrmc6eFk9FNeNs'
            },
            body: JSON.stringify({name, description, tag}) 
        });
        const json = await response.json();
        console.log(json);

        const note = {
            "_id": "661126bf03bea0457bbe4d402",
            "user": "6211261116097cac9f052864",
            "name": name,
            "description": description,
            "tag": tag,
            "date": "2022-05-19T17:19:59.571Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    const editNote = async (id, name, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxMGZiOTExYTRmOGJjMzVmMTBhNjE2In0sImlhdCI6MTY0NTMyOTIzNH0.c1v9seTwqf8J7xLiwpaPnpbwLex7kkrmc6eFk9FNeNs'
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
              'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxMGZiOTExYTRmOGJjMzVmMTBhNjE2In0sImlhdCI6MTY0NTMyOTIzNH0.c1v9seTwqf8J7xLiwpaPnpbwLex7kkrmc6eFk9FNeNs'
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
 