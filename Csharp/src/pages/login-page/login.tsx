import { Form, Input, Button, Row, Col, Switch } from "antd";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

import useAction from "../../redux/useActions";
import { RouterLinks } from "../../const";
import "./loginPage.scss";
import { useState } from "react";
import Spin from "../../components/Spinning/Spinning";
import React from "react";
const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const actions = useAction();
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.state.loadingState);
  const isLogin = useSelector((state: any) => state.state.loginState);

  const handleChecked = (checked: boolean) => {
    setChecked(checked);
  };
  const checkValidateForm = (value: any) => {
    const { username, password } = value;
    if (username === " " || password === " " || username === undefined || password === undefined) {
      return false;
    }
    return true;
  };
  const handleValuesChange = () => {
    const { username, password } = form.getFieldsValue();
    dispatch(actions.AuthActions.updateLoginInfo({ username, password }));
  };
  const handleLogin = () => {
    dispatch(actions.AuthActions.login());
    form.resetFields();
  };
  if (isLogin) {
    return <Navigate to={RouterLinks.HOME_PAGE} />;
  }
  return (
    <div>
      {loading ? <Spin /> : " "}
      <div className={`LoginPage ${loading ? "loading" : " "}`}>
        <div className="FormLogin">
          <div className="LoginTitle">Login</div>
          <Form form={form} onValuesChange={handleValuesChange}>
            <Row>
              <Col span={24}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Tên đăng nhập không được bỏ trống",
                    },
                  ]}
                  name="username"
                >
                  <Input placeholder="Tên đăng nhập"></Input>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Mật khẩu không được bỏ trống",
                    },
                  ]}
                  name="password"
                  //  initialValue={infoLogin.password}
                >
                  <Input.Password
                    placeholder="Nhập mật khẩu"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="CheckContainer">
              <Switch
                checked={checked}
                onChange={handleChecked}
                size="small"
                style={{ marginRight: "10px" }}
              />{" "}
              Remember me
              <span className="ForgetPassword">Quên mật khẩu?</span>
            </div>
            <div className="ButtonContainer">
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    disabled={!checkValidateForm(form.getFieldsValue())}
                    onClick={handleLogin}
                  >
                    Đăng nhập
                  </Button>
                )}
              </Form.Item>
            </div>
            <div className="linkSignUp">
              <p>Chưa đăng ký?</p>
              <Link to={RouterLinks.SIGN_UP}>Đăng ký</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
