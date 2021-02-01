import './App.css';
import Note from './Note'
import React, { useState, useEffect } from 'react'
import { MdEventNote, MdAddAlert } from 'react-icons/md'

function App() {

  const initalState = JSON.parse(window.localStorage.getItem('notes')) || [
    {
      created: new Date(),
      edit: true
    }
  ]
  const [notes, setNotes] = useState(initalState)

  useEffect(() => {
    window.localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    const tempNotes = [...notes]
    const result = { createdOn: new Date(), edit: true }
    tempNotes.push(result)
    setNotes(tempNotes)
  }


  const onDelete = idx => {
    const tempNotes = [...notes]
    tempNotes.splice(idx, 1)
    setNotes(tempNotes)
  }

  const createNotesContainer = () => {
    if (notes.length === 0) return (
      <h3><MdAddAlert /> Oops, you have no notes, click the add new note button to create your first note!! {`:D`}</h3>
    )
    return notes.map((note, idx) => (
      <>
        <Note
          note={note}
          idx={idx}
          onDelete={() => onDelete(idx)} />
      </>
    ))
  }

  return (
    <>
      <header>
        <h1><MdEventNote />&nbsp;Notes App - React</h1>
      </header>
      <div>
        <button className='button-add' onClick={() => addNote()}>Add New Note</button>
      </div>
      {createNotesContainer()}
    </>
  );
}

export default App;
