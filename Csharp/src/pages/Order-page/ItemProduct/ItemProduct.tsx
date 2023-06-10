import React from "react";
import { Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";
import "./ItemProduct.scss";
import { serverConfig } from "../../../const/severConfig";
import { orderDetailServices } from "../../../untils/networks/services/OrderDetailService";
import { billServices } from "../../../untils/networks/services/billService";

const ItemProduct: React.FC<any> = ({ product }) => {
  const actions = useAction();
  const dispatch = useDispatch();
  const selectedOrder = useSelector((state: any) => state.orderpage.selectedOrder);
  const url = `${serverConfig.server}/public/${product.Thumbnail}`;
  const updateOrderDetail = async (selectedOrder: any) => {
    let check: any = false;
    if (Array.isArray(selectedOrder?.OrderDetails)) {
      check = selectedOrder.OrderDetails.some((od: any) => od.IdProduct === product.IdProduct);
    }
    if (check) {
      const [orderDetail] = selectedOrder?.OrderDetails.filter(
        (od: any) => od?.IdProduct === product?.IdProduct
      );
      dispatch(actions.StateAction.loadingState(true));
      let res = await orderDetailServices.updateOrderDetail(orderDetail?.IdOrderDetail, {
        Amount: orderDetail?.Amout ? orderDetail?.Amout + 1 : 1,
      });
      if (res?.Status) {
        dispatch(actions.OrderPageActions.loadSelectedOrder());
        dispatch(actions.StateAction.loadingState(false));
      } else {
        dispatch(actions.StateAction.loadingState(false));
      }
    } else {
      dispatch(actions.StateAction.loadingState(true));
      let res = await orderDetailServices.createOrderDetail({
        IdOrder: selectedOrder?.IdOrder,
        IdProduct: product?.IdProduct,
        Amount: 1,
      });
      if (res?.Status) {
        dispatch(actions.OrderPageActions.loadSelectedOrder());
        dispatch(actions.StateAction.loadingState(false));
      } else {
        dispatch(actions.StateAction.loadingState(false));
      }
    }
  };
  const handleClickProduct = async (product: any) => {
    try {
      //add create order if selectedOrder not exists
      if (!selectedOrder?.IdOrder) {
        const response = await billServices.createOrder({ Amount: 0 });
        if (response.Status) {
          dispatch(actions.OrderPageActions.setSelectedOrder(response?.Data));
          updateOrderDetail(response.Data);
        }
      } else {
        updateOrderDetail(selectedOrder);
      }
      /////
      // let check: any = false;
      // if (Array.isArray(selectedOrder?.OrderDetails)) {
      //   check = selectedOrder.OrderDetails.some((od: any) => od.IdProduct === product.IdProduct);
      // }
      // if (check) {
      //   const [orderDetail] = selectedOrder?.OrderDetails.filter(
      //     (od: any) => od?.IdProduct === product?.IdProduct
      //   );
      //   dispatch(actions.StateAction.loadingState(true));
      //   let res = await orderDetailServices.updateOrderDetail(orderDetail?.IdOrderDetail, {
      //     Amount: orderDetail?.Amout ? orderDetail?.Amout + 1 : 1,
      //   });
      //   if (res?.Status) {
      //     dispatch(actions.OrderPageActions.loadSelectedOrder());
      //     dispatch(actions.StateAction.loadingState(false));
      //   } else {
      //     dispatch(actions.StateAction.loadingState(false));
      //   }
      // } else {
      //   dispatch(actions.StateAction.loadingState(true));
      //   let res = await orderDetailServices.createOrderDetail({
      //     IdOrder: selectedOrder?.IdOrder,
      //     IdProduct: product?.IdProduct,
      //     Amount: 1,
      //   });
      //   if (res?.Status) {
      //     dispatch(actions.OrderPageActions.loadSelectedOrder());
      //     dispatch(actions.StateAction.loadingState(false));
      //   } else {
      //     dispatch(actions.StateAction.loadingState(false));
      //   }
      // }
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <div onClick={() => handleClickProduct(product)} className="card-image-product">
      <Image
        className="image-card-image-product"
        preview={false}
        width={140}
        height={100}
        src={url}
      ></Image>
      <div style={{ fontWeight: "600" }}>{product?.Title}</div>
    </div>
  );
};

export default ItemProduct;
