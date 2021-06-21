import React, { useState, useEffect } from "react";
import "./Note.css";

import { Card, Button, Input } from "antd";
import { DeleteOutlined, CheckOutlined, EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function EditContainer({ text, ...props }) {
  return <TextArea rows={8} className="edit" value={text} {...props} placeholder={"Write notes to memorize your tasks"}/>;
}

function ViewContainer({ text, onToggle }) {
  return (
    <div className="view" onClick={() => onToggle()}>
      {text ? text : "Write notes to memorize your tasks"}
    </div>
  );
}

export default function Note({ note, idx, onDelete }) {
  const initialState =
    window.localStorage.getItem(`note-${idx}`) ||
    "";
  const [text, setText] = useState(initialState);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(`note-${idx}`, text);

    return () => {
      window.localStorage.removeItem(`note-${idx}`);
    };
  }, [text, idx]);

  const formattedDate = () => {
    const createdOn = new Date(note.createdOn);
    if (isNaN(createdOn.valueOf())) {
      return "Date and Time";
    } else {
      let date = createdOn.getDate();
      let month = createdOn.getMonth() + 1;
      const yyyy = createdOn.getFullYear();

      let hours = createdOn.getHours();
      const minutes = createdOn.getMinutes();
      let seconds = createdOn.getSeconds();

      if (date < 10) {
        date = `0${date}`;
      }
      if (month < 10) {
        month = `0${month}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      hours = hours > 12 ? hours - 12 : hours < 10 ? "0" + hours : hours;

      return `${date}-${month}-${yyyy} ${hours}:${minutes} ${
        createdOn.getHours() > 12 ? "PM" : "AM"
      }`;
    }
  };

  const onToggle = () => {
    setEdit(!edit);
  };

  return (
    <div className="app">
      <Card
        title={
          <div className="noteHeader">
            <span className="dTime">{formattedDate()}</span>
            <div>
              {!edit ? (
                <Button onClick={() => onToggle()} icon={<EditOutlined />} />
              ) : (
                <Button onClick={() => onToggle()} icon={<CheckOutlined />} />
              )}
              &nbsp;
              <Button
                type="danger"
                onClick={() => onDelete(idx)}
                icon={<DeleteOutlined />}
              />
            </div>
          </div>
        }
      >
        <Card.Grid className="noteContainer">
          {edit ? (
            <EditContainer
              text={text}
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            <ViewContainer onToggle={onToggle} text={text} />
          )}
        </Card.Grid>
      </Card>
    </div>
  );
}
