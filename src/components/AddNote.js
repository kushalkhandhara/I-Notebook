// import React from 'react'
import React,{useContext,useState}  from 'react'
import noteContext from "../context/notes/noteContext"

export const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note,setNote] = useState({title : "",description : "",tag : "default"})

    const handleClick = (e) => 
    {
        e.preventDefault(); // What is Work OF prevent Default ?
        addNote(note.title,note.description,note.tag)
        setNote({title : "",description : "",tag : "default"})
        props.showAlert("Note Added Successfully","success")
    }
    const onChange = (e) =>
    {
        setNote({...note,[e.target.name] : e.target.value});
    } 



  return (

    <div>

        <h2>Add A Note</h2>

        <div className = "container">

        <form className="my-4">
        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text"  name="title" className="form-control my-2" id="title" aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} minLength = {5} required value = {note.title}/>
        </div>

        <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control my-2" id="description" placeholder="Enter Description" name = "description" onChange={onChange} minLength = {5} required value = {note.description}/>
        </div>
        <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input type="text" className="form-control my-2" id="tag" placeholder="Enter Tag" name = "tag" onChange={onChange} minLength = {5} required value = {note.tag}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick = {handleClick} disabled = {note.title.length<5 || note.description.length<5}>Add Note</button>
        </form>
        </div>



    </div>
  )
}
