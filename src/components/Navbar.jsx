import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  // Create an array of menu items to pass to Menu
  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: (
        <Link to="/" onClick={() => setActiveMenu(false)}>
          Home
        </Link>
      ),
    },
    {
      key: "cryptocurrencies",
      icon: <FundOutlined />,
      label: (
        <Link to="/cryptocurrencies" onClick={() => setActiveMenu(false)}>
          Cryptocurrencies
        </Link>
      ),
    },
    {
      key: "exchanges",
      icon: <MoneyCollectOutlined />,
      label: (
        <Link to="/exchanges" onClick={() => setActiveMenu(false)}>
          Exchanges
        </Link>
      ),
    },
    {
      key: "news",
      icon: <BulbOutlined />,
      label: (
        <Link to="/news" onClick={() => setActiveMenu(false)}>
          News
        </Link>
      ),
    },
  ];

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoville</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && <Menu theme="dark" items={menuItems} />}
    </div>
  );
};

export default Navbar;
