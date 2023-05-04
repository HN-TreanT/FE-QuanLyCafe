import React from "react";
import { Menu, Image } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { RouterLinks } from "../../const";
import {
  ReconciliationOutlined,
  HomeOutlined,
  InboxOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  ShopOutlined,
  SettingOutlined,
  TableOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./SideBar.scss";
import logo from "../../assets/logo3.jpg";
import SubMenu from "antd/es/menu/SubMenu";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../redux/useActions";
const menuItems = [
  {
    key: "overview",
    label: "Tổng quan",
    url: RouterLinks.OVERVIEW_PAGE,
    icon: (
      <HomeOutlined style={{ fontSize: "1.3rem", paddingRight: "0.5rem" }} />
    ),
  },
  {
    key: "bill",
    label: "Hóa đơn",
    url: RouterLinks.BILL_PAGE,
    icon: (
      <ReconciliationOutlined
        style={{ fontSize: "1.3rem", paddingRight: "0.5rem" }}
      />
    ),
  },
  {
    key: "merchandise",
    label: "Mặt hàng",
    icon: (
      <InboxOutlined style={{ fontSize: "1.3rem", paddingRight: "0.5rem" }} />
    ),
    children: [
      {
        key: "products",
        label: "Danh sách mặt hàng",
        url: RouterLinks.PRODUCTS_PAGE,
      },
      {
        key: "category",
        label: "Danh mục",
        url: RouterLinks.CATEGORY_PAGE,
      },
    ],
  },
  {
    key: "staff",
    label: "Nhân viên",
    url: RouterLinks.STAFF_PAGE,
    icon: (
      <UsergroupAddOutlined
        style={{ fontSize: "1.3rem", paddingRight: "0.5rem" }}
      />
    ),
  },
  {
    key: "workshift",
    label: "Ca làm",
    url: RouterLinks.WORKSHIFT_PAGE,
    icon: (
      <ClockCircleOutlined
        style={{ fontSize: "1.3rem", paddingRight: "0.5rem" }}
      />
    ),
  },
  {
    key: "customer",
    label: "Khách hàng",
    url: RouterLinks.CUTOMER_PAGE,
    icon: (
      <UserOutlined style={{ fontSize: "1.3rem", paddingRight: "0.5rem" }} />
    ),
  },
  {
    key: "tablefood",
    label: "Bàn ăn",
    url: RouterLinks.TABLE_PAGE,
    icon: (
      <TableOutlined style={{ fontSize: "1.3rem", paddingRight: "0.5rem" }} />
    ),
  },
  {
    key: "warehouse",
    label: "Kho hàng",
    icon: (
      <ShopOutlined style={{ fontSize: "1.3rem", paddingRight: "0.5rem" }} />
    ),
    children: [
      {
        key: "list",
        label: "Danh sách tồn kho",
        url: RouterLinks.LIST_WAREHOUSE,
      },
      {
        key: "import",
        label: "Nhập kho",
        url: RouterLinks.IMPORT_WAREHOUSE,
      },
      {
        key: "history",
        label: "Lịch sử kho",
        url: RouterLinks.HISTORY_WAREHOUSE,
      },
    ],
  },
  {
    key: "promotion",
    label: "Khuyến mãi",
    url: RouterLinks.PROMOTION_PAGE,
    icon: (
      <FontAwesomeIcon
        icon={faBullhorn}
        style={{ fontSize: "1.2rem", paddingRight: "0.5rem" }}
      />
    ),
  },
];
const SideBar: React.FC = () => {
  const dispatch = useDispatch();
  const actions = useAction();
  const isSelectedMenuItem = useSelector(
    (state: any) => state.state.isSelectedMenuItem
  );
  const keys = useSelector((state: any) => state.state.keys);
  const handleSelected = (item: any) => {
    dispatch(actions.StateAction.selectedMenuItem(item.key));
  };
  const handleOpenChange = (keys: any) => {
    dispatch(actions.StateAction.keysOpen(keys));
  };

  return (
    <div className="container_side_bar">
      <div className="side_bar">
        <div className="side_bar_logo">
          {" "}
          <Image src={logo} width={230} height={50} preview={false} />
        </div>
        <div className="side_bar_menu">
          <Menu
            style={{
              fontSize: "1rem",
              backgroundColor: "transparent",
              paddingTop: "10px",
            }}
            mode="inline"
            theme="dark"
            selectedKeys={[`${isSelectedMenuItem}`]}
            openKeys={keys}
            onOpenChange={handleOpenChange}
          >
            {menuItems.map((item) => {
              if (item.children) {
                return (
                  <SubMenu
                    key={item.key}
                    title={
                      <span>
                        {" "}
                        {item.icon}
                        {item.label}
                      </span>
                    }
                  >
                    {item.children.map((childItem) => (
                      <Menu.Item
                        key={childItem.key}
                        onClick={(e) => handleSelected(e)}
                      >
                        <Link to={childItem.url}>{childItem.label}</Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    onClick={(e) => handleSelected(e)}
                  >
                    <Link to={item.url}>{item.label}</Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </div>
        <div className="side_bar-setting">
          <SettingOutlined
            style={{ fontSize: "1.3rem", paddingRight: "0.5rem" }}
          />
          <span>Thiết lập</span>
        </div>
      </div>{" "}
    </div>
  );
};
export default SideBar;
