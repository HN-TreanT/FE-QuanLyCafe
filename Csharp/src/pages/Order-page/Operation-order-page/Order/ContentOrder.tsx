import React from "react";
import { Row, Col, Image, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../redux/useActions";
import ItemOrder from "../../ItemOrder/ItemOrder";
import emptyOrder from "../../../../assets/empty-bill.svg";
const ContentOrder: React.FC<any> = ({ data }) => {
  const dispatch = useDispatch();
  const actions = useAction();
  const selectedPageOrders = useSelector((state: any) => state.orderpage.selectedPageOrders);
  const selectedOrder = useSelector((state: any) => state.orderpage.selectedOrder);
  const handleChangePag = (e: any) => {
    dispatch(actions.OrderPageActions.setSelectedPageOrders(e));
  };
  return (
    <div className="content-tab-order">
      <div className="list-order">
        <Row gutter={[40, 35]}>
          {Array.isArray(data?.Data) && data?.Data.length > 0 ? (
            data?.Data.map((item: any) => {
              return (
                <Col key={item?.IdOrder} span={8}>
                  <ItemOrder
                    style={item?.IdOrder === selectedOrder?.IdOrder ? "click-item-order" : ""}
                    data={item}
                  />
                </Col>
              );
            })
          ) : (
            <div className="empty-order-in-order-page">
              <Image src={emptyOrder} preview={false} />
              <div style={{ fontWeight: "600", paddingLeft: "6px" }}>
                Hôm nay chưa có yêu cầu nào!
              </div>
            </div>
          )}
        </Row>
      </div>
      <div className="pagination-order-tab">
        <Pagination
          onChange={handleChangePag}
          current={selectedPageOrders ? selectedPageOrders : 1}
          total={data?.TotalPage ? data?.TotalPage : 1}
          pageSize={6}
        />
      </div>
    </div>
  );
};
export default ContentOrder;
