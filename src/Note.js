import './Note.css';
import React, { useState, useEffect } from 'react';
import { BiSave, BiEdit } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';

function EditContainer({ text, ...props }) {
    return <textarea className='edit' defaultValue={text} {...props} />
}

function ViewContainer({ text, onToggle }) {
    return <div className='view' onClick={() => onToggle()}>{text}</div>
}

export default function Note({ note, idx, onDelete }) {
    const initialState =
        window.localStorage.getItem(`note-${idx}`) ||
        `Write notes to memorize your day's tasks ${':)'}`
    const [text, setText] = useState(initialState)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        window.localStorage.setItem(`note-${idx}`, text)

        return () => {
            window.localStorage.removeItem(`note-${idx}`)
        }
    }, [text, idx])

    const createdOn = new Date(note.createdOn)
    let date = createdOn.getDate()
    let month = createdOn.getMonth() + 1
    const yyyy = createdOn.getFullYear()

    let hours = createdOn.getHours()
    const minutes = createdOn.getMinutes()
    let seconds = createdOn.getSeconds()

    if (date < 10) {
        date = `0${date}`
    }
    if (month < 10) {
        month = `0${month}`
    }
    if (seconds < 10) {
        seconds = `0${seconds}`
    }

    hours = hours > 12 ? hours - 12 : hours < 10 ? '0' + hours : hours

    const formattedDate = `${date}-${month}-${yyyy} ${hours}:${minutes}:${seconds} ${createdOn.getHours() > 12 ? 'PM' : 'AM'
        }`

    const onToggle = () => {
        setEdit(!edit)
    }

    return (
        <div className='app'>
            <div className='noteHeader'>
                <span className='dTime' >{formattedDate}</span>
                <div>
                    {!edit ? (
                        <button className='button-note' onClick={() => onToggle()}><BiEdit /></button>
                    ) : (
                            <button className='button-note' onClick={() => onToggle()}><BiSave /></button>
                        )
                    }
                        &nbsp;
                    <button className='button-note' onClick={() => onDelete(idx)}><RiDeleteBin5Line /></button>
                </div>
            </div>
            <div className='noteContainer'>
                {edit ? (
                    <EditContainer text={text} onChange={e => setText(e.target.value)} />
                ) : (
                        <ViewContainer
                            onToggle={onToggle}
                            text={text}
                        />
                    )}
            </div>
        </div >
    )

}
