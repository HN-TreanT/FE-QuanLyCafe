import React, { useEffect, useState } from "react";
import { Row, Col, Input, Form, Button, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../../../redux/useActions";

const InfoMaterialImport: React.FC<any> = () => {
  const dispatch = useDispatch();
  const actions = useAction();
  const handleSaveInfoMaterial = () => {};
  return (
    <div className="info-material-import">
      <div style={{ padding: "10px" }}>
        <Form layout="vertical">
          <Row gutter={[0, 10]}>
            <Col span={6}></Col>
            <Col span={12}>
              <div>
                <span style={{ fontSize: "18px" }}>Tên mặt hàng</span>
              </div>
            </Col>
            <Col span={6}></Col>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <div
                    style={{
                      border: "0.5px solid black",
                      opacity: "0.05",
                    }}
                  ></div>
                  <span style={{ fontWeight: "500" }}>
                    Thông tin nhà cung cấp
                  </span>
                </Col>
                <Col span={24}>
                  <Form.Item label="Tên nhà cung cấp" name="NameProvider">
                    <Input></Input>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Số điện thoại" name="PhoneProvider">
                    <InputNumber style={{ width: "100%" }}></InputNumber>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <div
                    style={{
                      border: "0.5px solid black",
                      opacity: "0.05",
                    }}
                  ></div>
                  <span style={{ fontWeight: "500" }}>Thông tin mặt hàng</span>
                </Col>
                <Col span={24}>
                  <Form.Item label="Số lượng nhập" name="Amount">
                    <InputNumber style={{ width: "100%" }}></InputNumber>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Giá nhập" name="Price">
                    <InputNumber style={{ width: "100%" }}></InputNumber>
                  </Form.Item>
                </Col>
                <Col span={13}></Col>
                <Col span={11}>
                  <Button onClick={handleSaveInfoMaterial} type="primary">
                    Lưu thông tin
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default InfoMaterialImport;
