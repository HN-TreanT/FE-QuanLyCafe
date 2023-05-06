import { Table, Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../redux/useActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../const";
import { productServices } from "../../untils/networks/services/productService";
import { notification } from "../notification";

interface DataType {
  key: string;
  pathImage: string;
  productName: string;
  Id: string;
  category: string;
  price: Number;
}
const ContenProductList: React.FC<any> = ({ total, value }) => {
  const navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: "",
      dataIndex: "pathImage",
      render: (text) => (
        <Image src={text} preview={false} width={80} height={60} />
      ),
    },
    {
      title: "Tên mặt hàng",
      dataIndex: "productName",
    },
    {
      title: "Mã tham chiếu",
      dataIndex: "Id",
      render: (text) => <div style={{ color: "#1677ff" }}>{text}</div>,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
    },
    {
      title: "Giá thành",
      dataIndex: "price",
      render: (text) => <div>{`${text} đ`}</div>,
    },
    {
      title: "",
      dataIndex: "key",
      render: (text: any) => (
        <div>
          <Button
            onClick={() => handleClickEdit(text)}
            type="primary"
            ghost
            style={{ marginRight: "10px" }}
          >
            <FontAwesomeIcon
              icon={faPen}
              // style={{ marginRight: "5px" }}
              bounce
              className="icon-button-product"
            />
            <span>Chính sửa</span>
          </Button>
          <Button onClick={() => handleClickDelete(text)} danger>
            <FontAwesomeIcon
              icon={faTrash}
              //    style={{ marginRight: "5px" }}
              bounce
              className="icon-button-product"
            />
            <span>Xóa</span>
          </Button>
        </div>
      ),
    },
  ];
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.state.loadingState);
  const actions = useAction();
  const [valueProducts, setValueProducts] = useState(value);
  useEffect(() => {
    setValueProducts(value);
  }, [value]);
  //click row table
  const handleRowClick = (record: any) => {};
  //chỉnh sửa
  const handleClickEdit = async (Id: any) => {
    const dbProduct = await productServices.GetProductById(Id);
    dispatch(actions.MaterialActions.loadData());
    if (dbProduct.Status) {
      if (Array.isArray(dbProduct?.Data.UseMaterials)) {
        const value = dbProduct.Data.UseMaterials.map((item: any) => {
          return {
            key: item.IdMaterialNavigation?.IdMaterial
              ? item.IdMaterialNavigation?.IdMaterial
              : "",
            IdMaterial: item.IdMaterialNavigation?.IdMaterial
              ? item.IdMaterialNavigation?.IdMaterial
              : "",
            NameMaterial: item.IdMaterialNavigation?.NameMaterial
              ? item.IdMaterialNavigation?.NameMaterial
              : "",
            Amount: item?.Amount ? item?.Amount : 0,
            Unit: item.IdMaterialNavigation?.Unit
              ? item.IdMaterialNavigation?.Unit
              : "",
          };
        });
        dispatch(
          actions.MaterialActions.selectedMaterial({
            selectedRowKeys: value.map((item: any) => {
              return item.key;
            }),
            selectedRows: value,
          })
        );
        // dispatch(
        //   actions.MaterialActions.selectedMaterial({
        //     selectedRowKeys: dbProduct.Data.UseMaterials.map((item: any) => {
        //       return item.IdMaterialNavigation.IdMaterial;
        //     }),
        //     selectedRows: dbProduct.Data.UseMaterials.map((item: any) => {
        //       return {
        //         ...item.IdMaterialNavigation,
        //         Amount: item.Amount,
        //       };
        //     }),
        //   })
        // );
      }
      dispatch(
        actions.ProductActions.setSelectedProductId(dbProduct.Data?.IdProduct)
      );
      dispatch(actions.ProductActions.setInfoProduct(dbProduct.Data));
      navigate(RouterLinks.UPDATE_PRODUCT_PAGE);
    } else {
      notification({
        message: "get product by id fail",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
    }
  };
  //xóa
  const handleClickDelete = async (key: any) => {
    dispatch(actions.ProductActions.deleteProduct(key));
  };

  return (
    <>
      <div className="content-product-page">
        <Table
          loading={loading}
          style={{ marginLeft: "20px" }}
          columns={columns}
          dataSource={valueProducts}
          pagination={{
            pageSize: 4,
            total: total ? total : 1,
            showSizeChanger: false,
            hideOnSinglePage: true,
            onChange: (page) => {
              dispatch(actions.ProductActions.setSelectedPage(page));
            },
          }}
          onRow={(record: DataType) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>
    </>
  );
};
export default ContenProductList;
