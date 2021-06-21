import React, { useState, useEffect } from "react";
import "./App.css";
import Note from "./Note";
import HeaderMenu from "./Header";
import { Layout, Breadcrumb, Button, Col, Row, message } from "antd";
import { LineChartOutlined } from "@ant-design/icons";

const { Content, Footer } = Layout;

function App() {
  const initalState = JSON.parse(window.localStorage.getItem("notes")) || [
    {
      created: new Date(),
      edit: true,
    },
  ];
  const [notes, setNotes] = useState(initalState);

  useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const MessageSuccess = text => {
    message.success(text);
  };

  const addNote = () => {
    const tempNotes = [...notes];
    const result = { createdOn: new Date(), edit: true };
    tempNotes.push(result);
    setNotes(tempNotes);
    MessageSuccess("Note successfully created")
  };

  const onDelete = (idx) => {
    const tempNotes = [...notes];
    tempNotes.splice(idx, 1);
    setNotes(tempNotes);
    MessageSuccess("Note successfully deleted")
  };

  const createNotesContainer = () => {
    if (notes.length === 0)
      return (
        <h4 className="message-note">
          <LineChartOutlined /> Oops, you have no notes, click the add new note
          button to create your first note.
        </h4>
      );
    return notes.map((note, idx) => (
      <Col span={8}>
        <Note note={note} idx={idx} onDelete={() => onDelete(idx)} />
      </Col>
    ));
  };

  return (
    <Layout  className="layout">
      <HeaderMenu />
      <Content className="content">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Note App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <Button
            className="button-new-note"
            type="primary"
            onClick={() => addNote()}
          >
            Add New Note
          </Button>

          <Row gutter={16}>{createNotesContainer()}</Row>
        </div>
        <Footer style={{ flex: "0 1 57px", textAlign: "center"}}>
          Note App ©2021 Created by Marcus
        </Footer>
      </Content>
    </Layout >
  );
}

export default App;
