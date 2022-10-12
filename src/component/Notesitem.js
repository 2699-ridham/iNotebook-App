import React, { useContext } from 'react';
import context from '../Context/NoteContext';

const Notesitem = (props) => {
    const Context = useContext(context)
    const { note, updateNotes } = props;
    const {deletenote} = Context;
    
    return (
        <div className='col-md-3'>
            <div className="card my=3">
                <div className="card-body">
                    <div className='d-flex align-item-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id)}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNotes(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Notesitem
