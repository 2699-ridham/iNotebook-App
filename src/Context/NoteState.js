import { useState } from "react";
import context from "./NoteContext";

const NoteState = (props) => {
    //host url for API call
    const host = "http://localhost:5000";
    const initialnotes = [];
    const [notes, setnotes] = useState(initialnotes);

    //get all note
    const getnotes = async () => {
        //API call -> adding notes on server side
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzODE3M2IzNmM2ODVkZDhjYTQ5MTE5In0sImlhdCI6MTY2NDcwNDk1OH0.mCMh3k_S0NQsuDmXC46a_zvxvrYIKfXr4MGU9bzDYQM"
            },
        });

        const json = await response.json();
        console.log(json);
        setnotes(json);
    }

    //add a note
    const addnote = async (title, description, tag) => {
        //API call -> adding notes on server side
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzODE3M2IzNmM2ODVkZDhjYTQ5MTE5In0sImlhdCI6MTY2NDcwNDk1OH0.mCMh3k_S0NQsuDmXC46a_zvxvrYIKfXr4MGU9bzDYQM"
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });

        const json = response.json();

        //addnote on client side
        const note = {
            "_id": "63426c8e32c84c5a5919f111",
            "user": "6338173b36c685dd8ca49119",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-10-09T06:39:10.353Z",
            "__v": 0
        }

        //push -> update the array
        //whereas
        //concat -> returns the array
        setnotes(notes.concat(note));
    }

    //delte a note
    const deletenote = async (id) => {
        //API call -> deleting notes on server side
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzODE3M2IzNmM2ODVkZDhjYTQ5MTE5In0sImlhdCI6MTY2NDcwNDk1OH0.mCMh3k_S0NQsuDmXC46a_zvxvrYIKfXr4MGU9bzDYQM"
            },
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        const json = response.json();

        //deletion on client side
        console.log("deleting the node with id" + id)
        //for deletionj of the notes we will use the filter methode in which we will mwntion that id note id is not equals to id present in the data base then delete it
        const newnote = notes.filter((note) => { return note._id !== id });
        setnotes(newnote);
    }

    //edit a note
    const editnote = async (id, title, description, tag) => {
        //API call -> updating notes on server side
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzODE3M2IzNmM2ODVkZDhjYTQ5MTE5In0sImlhdCI6MTY2NDcwNDk1OH0.mCMh3k_S0NQsuDmXC46a_zvxvrYIKfXr4MGU9bzDYQM"
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });

        const json = response.json();

        //updating notes on client side
        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }
    }

    return (
        <context.Provider value={{ notes, addnote, deletenote, editnote, getnotes }}>
            {props.children}
        </context.Provider>
    )
}

export default NoteState;