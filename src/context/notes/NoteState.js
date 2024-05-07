// import react from "react";
// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>
{
    const host = "http://localhost:5000"
    const notesInitial = []

      const [notes,setNotes] = useState(notesInitial) 

      // Get All Notes
      const getNotes = async ()=>
      {
        //API CALL
        
          const response = await fetch(`${host}/api/notes/fetchallnotes`,
          {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             "auth-token" : localStorage.getItem('token')
           }
         });
         const json = await response.json();
         console.log(json);
         setNotes(json)
        }
        //  const json =  response.json(); 
        
   


      // Add a Note
      const addNote = async (title,description,tag)=>
      {
        // TODO API CALL
          // TODO API CALL
        
          const response = await fetch(`${host}/api/notes/addnote`,
          {
           method: "POST",
       
           headers: {
             "Content-Type": "application/json",
             "auth-token" : localStorage.getItem('token')
       
           },
           body: JSON.stringify({title,description,tag})
         });
         console.log(response)
         const note =  await response.json(); 
         setNotes(notes.concat(note));
      
      }


      //Delete a Note

      const deleteNote = async(id)=>
      {
        // TODO API CALl
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,
        {
         method: "DELETE",
     
         headers: {
           "Content-Type": "application/json",
           "auth-token" : localStorage.getItem('token')
          
     
         },
        //  body: JSON.stringify({title,description,tag})
       });
       const json =  response.json(); 
       console.log(json);
       
        console.log("Delete : " + id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
      }


      // Edit a Note
      const editNote = async (id,title,description,tag)=>
      {
        // TODO API CALL
        console.log(id)
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,
         {
          method: "PUT",
      
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
      
          },
          body: JSON.stringify({title,description,tag})
        });
        const json =  await response.json(); 
        console.log(json)
      
        // Logic tp Edit in Client
        let newNotes = JSON.parse(JSON.stringify(notes));
        for(let i  = 0; i < notes.length; i++)
        {
          const element = notes[i];
          if(element._id === id)
          {
            newNotes[i].title = title;
            newNotes[i].description = description;
            newNotes[i].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
      }
    

    return (
              <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}} >
            {props.children}
        </NoteContext.Provider>
      

    )
}

export default NoteState;