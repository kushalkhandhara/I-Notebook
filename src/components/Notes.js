import React,{useContext, useEffect,useRef,useState}  from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem'
import { AddNote } from './AddNote'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Notes(props) {

    const context = useContext(noteContext);
    let history = useHistory();
    const {notes,getNotes,editNote} = context;

   
    
    useEffect(()=>
    {
      if(localStorage.getItem('token'))
      {
        console.log(localStorage.getItem('token'));
        getNotes()
      }
      else
      {
        history.push("/login");
      }
       // eslint-disable-next-line 
    },[])
    const handleClick = (e) => 
    {
      editNote(note.id,note.etitle,note.edescription,note.etag)
      refClose.current.click();
        // addNote(note.title,note.description,note.tag)
        props.showAlert("Updated Successfully","success")
    }
    const onChange = (e) =>
    {
        setNote({...note,[e.target.name] : e.target.value});
    } 

    const updateNote = (currentNote)=> 
    {
      ref.current.click();
      setNote({id : currentNote._id,etitle : currentNote.title,edescription : currentNote.description,etag:currentNote.tag});
      editNote(note.id,note.etitle,note.edescription,note.etag)
      refClose.current.click();
      // props.showAlert("Updated Succefully","success");
    }

    const ref = useRef(null)
    const refClose = useRef(null)
    
    const [note,setNote] = useState({id : "",etitle : "",edescription : "",etag : "default"})


  return (
    <>
    <AddNote showAlert = {props.showAlert}/>
    <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref = {ref}>
      Launch demo modal
    </button>



<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

      <form className="my-4">
        <div className="form-group">
            <label htmlFor="etitle">Title</label>
            <input type="text" value = {note.etitle} name="etitle" className="form-control" id="etitle" aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} minLength = {5} required />
        </div>

        <div className="form-group">
            <label htmlFor="edescription">Description</label>
            <input type="text" value = {note.edescription} className="form-control" id="edescription" placeholder="Enter Description" name = "edescription" onChange={onChange} minLength = {5} required/>
        </div>
        <div className="form-group">
            <label htmlFor="etag">Tag</label>
            <input type="text" value={note.etag}  className="form-control" id="etag" placeholder="Enter Tag" name = "etag" onChange={onChange} minLength = {5} required/>
        </div>

        </form>

      </div>
      <div className="modal-footer">
        <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick} disabled = {note.etitle.length<5 || note.edescription.length<5}>Update Note</button>
      </div>
    </div>
  </div>
</div>





    <div className="row my-4">
    
    <h2>Your Notes</h2>
    <div className="container"> 
    {notes.length===0 && 'No Notes to Display'}
     </div>
    {notes.map((notes)=>
    {
      return <NoteItem  note = {notes} key={notes._id} updateNote = {updateNote} showAlert = {props.showAlert}/>;
    })}

    </div>
    </>
    
  )
}