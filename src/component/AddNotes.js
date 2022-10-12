import React, { useContext, useState } from 'react'
import context from '../Context/NoteContext';
const AddNotes = () => {
    const Context = useContext(context);
    const { addnote } = Context;
    const [note, setnote] = useState({
        title: "",
        description: "",
        tag: ""
    })

    const handleClick = (e) => {
        //use for not to relaod the page
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
    }

    const handelChange = (e) => {
        return setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h1>Add a Note</h1>
            <div className="container my=3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={handelChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="description" className="form-control" id="description" name='description' onChange={handelChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={handelChange} />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNotes
