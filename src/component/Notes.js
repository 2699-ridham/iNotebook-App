import React, { useContext, useEffect, useRef, useState } from 'react'
import context from '../Context/NoteContext';
import Notesitem from "../component/Notesitem";
import AddNotes from './AddNotes';


function Notes() {
  const Context = useContext(context);
  const { notes, getnotes } = Context;
  useEffect(() => {
    getnotes();
    // eslint-disable-next-line 
  }, [])

  const [note, setnote] = useState({
    etitle: "",
    edescription: "",
    etag: ""
  })
  //useref -> helps to create a mutuable object which renders only once;
  const ref = useRef(null);

  const updateNotes = (currNote) => {
    ref.current.click();
    setnote({ etitle: currNote.title, edescription: currNote.description, etag: currNote.tag });
  }

  const handleClick = (e) => {
    //use for not to relaod the page
    e.preventDefault();
  }

  const handelChange = (e) => {
    return setnote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNotes />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Your Notes</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={handelChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="description" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={handelChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={handelChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Notes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ "marginTop": "26px" }}>
        <h2>Your Note</h2>
        {notes.map((note) => {
          return <Notesitem key={note._id} updateNotes={updateNotes} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes