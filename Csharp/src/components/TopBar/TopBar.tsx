import React, { useState } from "react";
import {
  DownOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  GlobalOutlined,
  InboxOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import "./TopBar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../redux/useActions";

import { RouterLinks, serverConfig } from "../../const";

const TopBar: React.FC = () => {
  const dispatch = useDispatch();
  const actions = useAction();
  const userInfo = useSelector((state: any) => state.auth.user_info);
  const [visible, setVisible] = useState(false);
  const handleChangeVisible = (visible: boolean) => {
    setVisible(visible);
  };
  const handleLogout = () => {
    dispatch(actions.AuthActions.logout());
  };
  const infoUserStyle = {
    color: visible ? "#007bff" : " ",
    backgroundColor: visible ? "#e0e9f4" : " ",
  };
  const items: MenuProps["items"] = [
    {
      key: "info-account",
      label: <Link to={RouterLinks.INFO_ACCOUNT_PAGE}>Tài khoản</Link>,
      icon: <UserOutlined style={{ fontSize: "1.2rem" }} />,
    },
    {
      key: "order-page",
      label: (
        <a target="_blank" rel="noopener noreferrer" href={`${serverConfig.client}/order-page`}>
          Chuyển đến yêu cầu
        </a>
      ),
      icon: <ArrowRightOutlined style={{ fontSize: "1.2rem" }} />,
    },
    {
      key: "logout",
      label: "Đăng xuất",
      danger: true,
      icon: <LogoutOutlined style={{ fontSize: "1.2rem" }} />,
      onClick: handleLogout,
    },
  ];
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
                <Avatar size={"large"}>
                  {userInfo.Name ? userInfo.Name.charAt(0).toUpperCase() : "A"}
                </Avatar>
                <span style={{ paddingLeft: "10px" }}>
                  {userInfo.Name ? userInfo.Name : "Admin"}
                </span>
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
