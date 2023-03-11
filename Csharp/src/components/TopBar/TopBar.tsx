import React, { useState } from "react";
import {
  DownOutlined,
  BellOutlined,
  UserOutlined,
  ReadOutlined,
  DollarCircleOutlined,
  SecurityScanOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  GlobalOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import "./TopBar.scss";
import { Link } from "react-router-dom";

import { RouterLinks } from "../../const";
const items: MenuProps["items"] = [
  {
    key: "info-account",
    label: <Link to={RouterLinks.INFO_ACCOUNT_PAGE}>Tài khoản</Link>,
    icon: <UserOutlined style={{ fontSize: "1.2rem" }} />,
  },
  {
    key: "package-service",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Gói dịch vụ
      </a>
    ),
    icon: <DollarCircleOutlined style={{ fontSize: "1.2rem" }} />,
  },
  {
    key: "service",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Điều khoản dịch vụ
      </a>
    ),
    icon: <ReadOutlined style={{ fontSize: "1.2rem" }} />,
  },
  {
    key: "security",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Chính sách bảo mật
      </a>
    ),
    icon: <SecurityScanOutlined style={{ fontSize: "1.2rem" }} />,
  },
  {
    key: "supply",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Hỗ trợ
      </a>
    ),
    icon: <QuestionCircleOutlined style={{ fontSize: "1.2rem" }} />,
  },
  {
    key: "logout",
    label: "Đăng xuất",
    danger: true,
    icon: <LogoutOutlined style={{ fontSize: "1.2rem" }} />,
  },
];
const TopBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const handleChangeVisible = (visible: boolean) => {
    setVisible(visible);
  };
  const infoUserStyle = {
    color: visible ? "#007bff" : " ",
    backgroundColor: visible ? "#e0e9f4" : " ",
  };
  return (
    <div className="container_top_bar">
      <div id="top_bar">
        <div className="online">
          <GlobalOutlined />
          <span>Bán online</span>
        </div>
        <div className="grab-food">
          <InboxOutlined />
          <span>Grab food</span>
        </div>
        <div className={`info-user`} style={infoUserStyle}>
          <Dropdown
            menu={{ items }}
            placement="bottom"
            arrow
            trigger={["click"]}
            overlayClassName="dropdown"
            onOpenChange={handleChangeVisible}
          >
            <Space>
              <div>
                <Avatar size={"large"}>A</Avatar>
                <span style={{ paddingLeft: "10px" }}>Admin</span>
              </div>
              <div style={{ paddingLeft: "30px" }}>
                <DownOutlined />
              </div>
            </Space>
          </Dropdown>
        </div>

        <div className="notification">
          <BellOutlined
            style={{
              fontSize: "1.2rem",
              padding: "10px 20px",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default TopBar;
