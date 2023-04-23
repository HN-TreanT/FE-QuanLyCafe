import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./StaffPage.scss";
import Spin from "../../../../components/Spinning/Spinning";
import useAction from "../../../../redux/useActions";
import { useNavigate } from "react-router-dom";
import ContentStaffPage from "../../../../components/ContentStaffPage/ContenStaffPage";
import { RouterLinks } from "../../../../const";
const StaffPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = useAction();
  const selectedStateStaff = useSelector(
    (state: any) => state.staff.selectedStateStaff
  );
  const loading = useSelector((state: any) => state.state.loadingState);
  useEffect(() => {
    dispatch(actions.StaffActions.loadData());
  }, [dispatch, actions.StaffActions, selectedStateStaff]);
  const staffs = useSelector((state: any) => state.staff.staffs);
  const valueStaffs = staffs.map((staff: any) => {
    const date = new Date(staff?.CreatedAt);
    const formattedDate = date.toLocaleDateString("vi-VN");
    return {
      key: staff?.IdStaff,
      email: staff?.Email,
      nameStaff: staff?.Fullname,
      workShift: staff?.SelectedWorkShifts.map((w: any) => `${w.IdWorkShift},`)
        .join("")
        .slice(0, -1),
      address: staff?.Address,
      phoneNumber: staff?.PhoneNumber,
      createdAt: `${formattedDate}`,
    };
  });

  const handleClickButtonAddStaff = () => {
    // dispatch(actions.WorkshiftActions.loadData());
    navigate(RouterLinks.ADD_STAFF_PAGE);
  };
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
              <span> Thêm nhân viên</span>
            </Button>
          </div>
        </Col>
        <ContentStaffPage value={valueStaffs} />
      </Row>
    </div>
  );
};
export default StaffPage;
