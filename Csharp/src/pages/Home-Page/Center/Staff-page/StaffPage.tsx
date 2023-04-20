import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./StaffPage.scss";
import Spin from "../../../../components/Spinning/Spinning";
import useAction from "../../../../redux/useActions";
import { RouterLinks, serverConfig } from "../../../../const";
import { useNavigate } from "react-router-dom";
import ContentStaffPage from "../../../../components/ContentStaffPage/ContenStaffPage";
const StaffPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = useAction();
  const selectedStateStaff = useSelector(
    (state: any) => state.staff.selectedStateStaff
  );
  useEffect(() => {
    dispatch(actions.StaffActions.loadData());
  }, [dispatch, actions.StaffActions, selectedStateStaff]);
  const staffs = useSelector((state: any) => state.staff.staffs);
  const valueStaffs = staffs.map((staff: any) => {
    return {
      key: staff?.IdStaff,
      email: staff?.Email,
      nameStaff: staff?.Fullname,
      state: "Đang làm việc",
      address: staff?.Address,
      phoneNumber: staff?.PhoneNumber,
      createdAt: `${staff?.CreatedAt}`,
    };
  });
  console.log("check staff", staffs);
  const loading = useSelector((state: any) => state.state.loadingState);
  const handleClickButtonAddStaff = () => {};
  return (
    <div className="staff-page">
      {loading ? <Spin /> : " "}
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <div className="title-button-staff-page">
            <div className="title-staff-page">Nhân viên</div>
            <Button
              onClick={handleClickButtonAddStaff}
              type="primary"
              className="button-add-staff"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span> Thêm mặt hàng</span>
            </Button>
          </div>
        </Col>
        <ContentStaffPage value={valueStaffs} />
      </Row>
    </div>
  );
};
export default StaffPage;
