import { Layout, Menu } from "antd";
import { MdEventNote } from "react-icons/md";
import "./Header.css";

const { Header } = Layout;

export default function HeaderMenu() {
  return (
    <Header className="header">
      <div className="logo">
        <h1>
          <MdEventNote />
          &nbsp;Notes App
        </h1>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={"home"}>
        <Menu.Item key="home" id="home">
          Home
        </Menu.Item>
      </Menu>
    </Header>
  );
}
