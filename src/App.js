import { Content, Footer, Header } from "antd/es/layout/layout";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import Home from "./quote/home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Master from "./quote/master";
import NoMatch from "./quote/nomatch";

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    { label: "Quote", key: "/" },
    { label: "Master", key: "master" },
  ];

  const navigate = useNavigate();

  const origMenu =
    window.location.pathname !== "/"
      ? window.location.pathname.split("/")[1]
      : "/";
  const [menu, setMenu] = useState(origMenu);
  const changeMenu = (e) => {
    setMenu(e.key);
    navigate(e.key);
  };

  return (
    <>
      <Layout>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={menu}
            defaultActiveFirst="1"
            items={menuItems}
            onClick={changeMenu}
          />
        </Header>
        <Layout style={{ minHeight: "85vh" }}>
          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb
              items={[{ title: menu }]}
              style={{ margin: "16px 0" }}
            ></Breadcrumb>
            <div
              style={{
                background: colorBgContainer,
                borderRadius: "25px",
                padding: "10px",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/master" element={<Master />} />
                <Route path="/master/:id" element={<Home />} />
                <Route path="*" element={<NoMatch />} />
              </Routes>
            </div>
          </Content>
        </Layout>
        <Footer> (C) 2023 </Footer>
      </Layout>
    </>
  );
}

export default App;
