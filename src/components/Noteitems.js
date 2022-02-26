import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitems = (props) => {
  const context = useContext(noteContext);
  const { deleteNotes } = context;
  const { note, updateNote } = props;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.name}</h5> 
            <i className="fa fa-trash-o mx-2" style={{ fontSize: "24px" }} onClick={()=>{deleteNotes(note._id)}}></i>
            <i className="fa fa-edit mx-2" style={{ fontSize: "24px" }} onClick={()=>{updateNote(note)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Noteitems
