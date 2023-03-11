import React from "react";
import { Menu, Avatar, Image } from "antd";
import { Link } from "react-router-dom";
import { RouterLinks } from "../../const";
import {
  ReconciliationOutlined,
  HomeOutlined,
  LineChartOutlined,
  InboxOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  ShopOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import MenuItem from "antd/es/menu/MenuItem";
import "./SideBar.scss";
import logo from "../../assets/logo.svg";
import logoj from "../../assets/logoj.jpg";
import SubMenu from "antd/es/menu/SubMenu";

const SideBar: React.FC = () => {
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
      key: "report",
      label: "Báo cáo",
      icon: (
        <LineChartOutlined
          style={{ fontSize: "1.3rem", paddingRight: "0.5rem" }}
        />
      ),
      children: [
        {
          key: "reports-revenue",
          label: "Báo cáo doanh thu",
          url: RouterLinks.REPORT_REVENUE_PAGE,
        },
        {
          key: "reports-products",
          label: "Báo cáo mặt hàng",
          url: RouterLinks.REPORT_PRODUCTS_PAGE,
        },
        {
          key: "reports-inventory",
          label: "Báo cáo kho hàng",
          url: RouterLinks.REPORT_INVENTORY_PAGE,
        },
        {
          key: "reports-finance",
          label: "Báo cáo tài chính",
          url: RouterLinks.REPORT_FINANCE_PAGE,
        },
        {
          key: "reports-discounts",
          label: "Báo cáo khuyến mại",
          url: RouterLinks.REPORT_DISCOUNTS_PAGE,
        },
        {
          key: "reports-staffs",
          label: "Báo cáo nhân viên",
          url: RouterLinks.REPORTS_STAFF,
        },
      ],
    },
    {
      key: "orders",
      label: "Hóa đơn",
      url: RouterLinks.ORDER_PAGE,
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
          label: "Nhóm lựa chọn",
          url: RouterLinks.CATEGORY_PAGE,
        },
        {
          key: "combo",
          label: "Combo",
          url: RouterLinks.COMBO_PAGE,
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
      key: "customer",
      label: "Khách hàng",
      icon: (
        <UserOutlined style={{ fontSize: "1.3rem", paddingRight: "0.5rem" }} />
      ),
      children: [
        {
          key: "listCutomer",
          label: "Danh sách khách hàng",
          url: RouterLinks.LIST_CUTOMER_PAGE,
        },
        {
          key: "loyaltyCard",
          label: "Thẻ thành viên",
          url: RouterLinks.LOYALTY_CARD_PAGE,
        },
      ],
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
          key: "export",
          label: "Xuất kho",
          url: RouterLinks.EXPORT_WAREHOUSE,
        },
        {
          key: "history",
          label: "Lịch sử kho",
          url: RouterLinks.HISTORY_WAREHOUSE,
        },
      ],
    },
  ];
  return (
    <div className="container_side_bar">
      <div className="side_bar">
        <div className="side_bar_logo">
          {" "}
          <Image src={logoj} width={210} height={50} preview={false} />
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
                      <Menu.Item key={childItem.key}>
                        <Link to={childItem.url}>{childItem.label}</Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={item.key} icon={item.icon}>
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
