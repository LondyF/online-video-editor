import React from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { Layout as AntLayout, Menu } from "antd";
import { MenuClickEventHandler } from "rc-menu/lib/interface";

const { Header, Content, Footer } = AntLayout;

type Props = {
  children: React.ReactNode;
};

const MENU_ITEMS = [
  {
    key: "/",
    label: "Home",
  },
  {
    key: "projects",
    label: "Projects",
  },
];

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  const handleMenuItemClick: MenuClickEventHandler = ({ key }) => {
    router.push("/" + key);
  };

  return (
    <AntLayout style={{ backgroundColor: "white", height: "100vh" }}>
      <Head>
        <title>Video Editor</title>
      </Head>
      <Header style={{ backgroundColor: "white" }}>
        <Menu
          onClick={handleMenuItemClick}
          mode="horizontal"
          items={MENU_ITEMS}
        />
      </Header>
      <Content style={{ padding: "24px 50px" }}>{children}</Content>
      <Footer>Awesome Footer</Footer>
    </AntLayout>
  );
};

export default Layout;
