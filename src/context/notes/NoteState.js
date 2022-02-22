import { useState } from 'react';
import NoteContext from './noteContext';
 
 const NoteState = (props) => {
   const noteinitial = [
        {
            "_id": "621126bf03bea457bbe4d402",
            "user": "6211261116097cac9f052864",
            "name": "Note 52",
            "description": "Note 52 Desc",
            "tag": "General",
            "date": "2022-02-19T17:19:59.571Z",
            "__v": 0
        },
        {
            "_id": "621126bf03bea457bbe4d402",
            "user": "6211261116097cac9f052864",
            "name": "Note 152",
            "description": "Note 152 Desc",
            "tag": "General",
            "date": "2022-02-19T17:19:59.571Z",
            "__v": 0
        },
        {
            "_id": "621126bf03bea457bbe4d402",
            "user": "6211261116097cac9f052864",
            "name": "Note 52",
            "description": "Note 52 Desc",
            "tag": "General",
            "date": "2022-02-19T17:19:59.571Z",
            "__v": 0
        },
        {
            "_id": "621126bf03bea457bbe4d402",
            "user": "6211261116097cac9f052864",
            "name": "Note 152",
            "description": "Note 152 Desc",
            "tag": "General",
            "date": "2022-02-19T17:19:59.571Z",
            "__v": 0
        },
        {
            "_id": "621126bf03bea457bbe4d402",
            "user": "6211261116097cac9f052864",
            "name": "Note 52",
            "description": "Note 52 Desc",
            "tag": "General",
            "date": "2022-02-19T17:19:59.571Z",
            "__v": 0
        },
        {
            "_id": "621126bf03bea457bbe4d402",
            "user": "6211261116097cac9f052864",
            "name": "Note 152",
            "description": "Note 152 Desc",
            "tag": "General",
            "date": "2022-02-19T17:19:59.571Z",
            "__v": 0
        },
        {
            "_id": "621126bf03bea457bbe4d402",
            "user": "6211261116097cac9f052864",
            "name": "Note 52",
            "description": "Note 52 Desc",
            "tag": "General",
            "date": "2022-02-19T17:19:59.571Z",
            "__v": 0
        },
        {
            "_id": "621126bf03bea457bbe4d402",
            "user": "6211261116097cac9f052864",
            "name": "Note 152",
            "description": "Note 152 Desc",
            "tag": "General",
            "date": "2022-02-19T17:19:59.571Z",
            "__v": 0
        }
    ];  
    const [notes, setNotes] = useState(noteinitial);
   return (
       <NoteContext.Provider value={{notes, setNotes}}>
           {props.children}
       </NoteContext.Provider>
   )
 }
 
 export default NoteState
 