import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import actions from "../../../../../redux/state/actions";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../../redux/useActions";
import { billServices } from "../../../../../untils/networks/services/billService";

const ModalAcountCustomer: React.FC<any> = ({
  value,
  isOpenModalCountCustomer,
  setIsOpenModalCountModal,
}) => {
  const dispatch = useDispatch();
  const actions = useAction();
  const selectedOrder = useSelector(
    (state: any) => state.orderpage.selectedOrder
  );
  const [disabled, setDisabled] = useState(true);
  const [amountCustomer, setAmountCustomer] = useState<any>(value ? value : 0);
  useEffect(() => {
    setAmountCustomer(value);
  }, [value]);

  return (
    <Modal
      title="Thêm số lượng khách hàng"
      open={isOpenModalCountCustomer}
      onCancel={() => setIsOpenModalCountModal(false)}
      footer={[
        <Button
          key="cancle"
          onClick={() => {
            setIsOpenModalCountModal(false);
          }}
        >
          Hủy
        </Button>,
        <Button
          disabled={disabled}
          key="submit"
          type="primary"
          onClick={async () => {
            if (selectedOrder?.IdOrder) {
              dispatch(
                actions.OrderPageActions.setInfoUpdateOrder({
                  IdOrder: selectedOrder?.IdOrder,
                  Amount: amountCustomer,
                })
              );
              dispatch(actions.OrderPageActions.updateOrder());
              setIsOpenModalCountModal(false);
            } else {
              let _response = await billServices.createOrder({
                Amount: 0,
              });
              let response: any = _response;
              if (response.Status) {
                dispatch(
                  actions.OrderPageActions.setSelectedOrder(response?.Data)
                );
                dispatch(
                  actions.OrderPageActions.setInfoUpdateOrder({
                    IdOrder: response?.Data?.IdOrder,
                    Amount: amountCustomer,
                  })
                );
                dispatch(actions.OrderPageActions.updateOrder());
                setIsOpenModalCountModal(false);
              }
            }
          }}
        >
          Lưu
        </Button>,
      ]}
    >
      <Input
        value={amountCustomer}
        onChange={(e: any) => {
          setAmountCustomer(e.target.value);
          if (e.target.value) {
            setDisabled(false);
          } else {
            setDisabled(true);
          }
        }}
        onKeyDown={(e) => {
          if (
            e.key === "-" ||
            e.key === "e" ||
            e.key === "+" ||
            e.key === "E"
          ) {
            e.preventDefault();
          }
        }}
        min={0}
        placeholder="Nhập số lượng khách hàng"
        type="number"
      ></Input>
    </Modal>
  );
};

export default ModalAcountCustomer;
