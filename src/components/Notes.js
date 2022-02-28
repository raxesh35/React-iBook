import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import Noteitems from './Noteitems';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  const [note, setNote] = useState({id:"",ename:"",edescription:"",etag:""})

  const ref = useRef(null);
  const refClose = useRef(null);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllNotes();
    } else {
      navigate("/login");
    }
    
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentnote) => {
    console.log(currentnote)
    ref.current.click();
    setNote({id:currentnote._id,ename:currentnote.name,edescription:currentnote.description,etag:currentnote.tag});
    console.log(note)
  }

  const handleClick = (e) => {
    editNote(note.id,note.ename,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert('success', 'Note updated successfully !!')
    console.log(note)
  }  

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>
      <h2 className='my-4'>Add Note</h2>
      <AddNote showAlert={props.showAlert}/>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalLong">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className='my-4'>
                <div className="form-group my-2">
                  <label htmlFor="Name">Name</label>
                  <input type="text" className="form-control" name="ename" id="ename" aria-describedby="name" placeholder="Enter name" value={note.ename} onChange={onChange} required minLength={4}/>
                </div>

                <div className="form-group my-2">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="form-control" value={note.edescription} name="edescription" id="edescription" placeholder="Description" onChange={onChange}  required minLength={4}/>
                </div>

                <div className="form-group my-2">
                  <label htmlFor="tag">Tag</label>
                  <input type="text" className="form-control" value={note.etag} name="etag" id="etag" placeholder="Tag" onChange={onChange} />
                </div>
                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Update Note</button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.ename.length<4 || note.edescription.length<4} type="submit" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <h2 className='my-4'>Your Notes</h2>
      <div className="row my-3">
        <div className="container">
        {notes.length === 0 && 'No notes are available'}
        </div>
        {notes.map((note) => {
          return <Noteitems key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
        })}
      </div>
    </>
  )
}

export default Notes
