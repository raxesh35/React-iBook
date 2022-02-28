import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({name:"",description:"",tag:""})
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.name, note.description, note.tag);
    setNote({name:"",description:"",tag:""});
    props.showAlert('success', 'Note added successfully !!')
  }  

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div>
      <form className='my-4'>
        <div className="form-group my-2">
          <label htmlFor="Name">Name</label>
          <input type="text" className="form-control" name="name" value={note.name} id="name" aria-describedby="name" placeholder="Enter name" onChange={onChange}  required minLength={4}/>
        </div>

        <div className="form-group my-2">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" name="description" value={note.description} id="description" placeholder="Description" onChange={onChange}  required minLength={4}/>
        </div>

        <div className="form-group my-2">
          <label htmlFor="tag">Tag</label>
          <input type="text" className="form-control" name="tag" value={note.tag} id="tag" placeholder="Tag" onChange={onChange}/>
        </div>
        <button disabled={note.name.length<4 || note.description.length<4} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
