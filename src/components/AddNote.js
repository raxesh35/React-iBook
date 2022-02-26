import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({name:"",description:"",tag:"General"})
  const handleClick = (e) => {
    e.preventDefault();
    console.log(note)
    addNote(note.name, note.description, note.tag);
  }  

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div>
      <form className='my-4'>
        <div className="form-group my-2">
          <label htmlFor="Name">Name</label>
          <input type="text" className="form-control" name="name" id="name" aria-describedby="name" placeholder="Enter name" onChange={onChange}/>
        </div>

        <div className="form-group my-2">
          <label htmlFor="description">Description</label>
          <input type="description" className="form-control" name="description" id="description" placeholder="Description" onChange={onChange}/>
        </div>

        <div className="form-group my-2">
          <label htmlFor="tag">Tag</label>
          <input type="tag" className="form-control" name="tag" id="tag" placeholder="Tag" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
