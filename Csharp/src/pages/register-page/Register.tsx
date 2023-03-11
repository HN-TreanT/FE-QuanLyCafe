import { Form, Input, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

import useAction from "../../redux/useActions";
import { authService } from "../../untils/networks/services/authService";
import { RouterLinks } from "../../const";
import "./registerPage.scss";
import { notification } from "../../components/notification";
import Spin from "../../components/Spinning/Spinning";
const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const actions = useAction();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.state.loadingState);
  const regisInfo = useSelector((state: any) => state.auth.login_info);
  const checkValidateForm = (value: any) => {
    const { username, password, displayName } = value;
    if (
      username === " " ||
      password === " " ||
      username === undefined ||
      password === undefined ||
      displayName === "" ||
      displayName === undefined
    ) {
      return false;
    } else {
      return true;
    }
  };
  const handleValuesChange = () => {
    const { username, password, displayName, confirmassword } =
      form.getFieldsValue();
    dispatch(
      actions.AuthActions.updateLoginInfo({
        username,
        password,
        displayName,
        confirmassword,
      })
    );
  };
  const handleLogin = async () => {
    if (regisInfo.password !== regisInfo.confirmassword) {
      notification({
        message: "password and confirm password not same",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
    } else {
      const info = {
        username: regisInfo.username,
        password: regisInfo.password,
        displayName: regisInfo.displayName,
      };
      const message = await authService.handleRegister(info);
      if (message.status) {
        notification({
          message: "Đăng ký thành công",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });

        form.getFieldsValue();
        return navigate(RouterLinks.LOGIN_PAGE);
        // return navigate(RouterLinks.LOGIN_PAGE);
      } else {
        notification({
          message: message.message,
          title: "Thông báo",
          position: "top-right",
          type: "warning",
        });
      }
    }
  };
  return (
    <>
      {loading ? <Spin /> : " "}
      <div className={`LoginPage ${loading ? "loading" : " "}`}>
        <div className="FormLogin">
          <div className="LoginTitle">Sign up</div>
          <Form
            layout="vertical"
            form={form}
            onValuesChange={handleValuesChange}
          >
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Display Name"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập tên của bạn",
                    },
                  ]}
                  name="displayName"
                >
                  <Input placeholder="display name" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="User name"
                  rules={[
                    {
                      required: true,
                      message: "Tên đăng nhập không được bỏ trống",
                    },
                  ]}
                  name="username"
                >
                  <Input placeholder="user name"></Input>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Mật khẩu không được bỏ trống",
                    },
                  ]}
                  name="password"
                >
                  <Input.Password
                    placeholder="password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Confirm password"
                  rules={[
                    {
                      required: true,
                      message: "Mật khẩu không được bỏ trống",
                    },
                  ]}
                  name="confirmassword"
                >
                  <Input.Password
                    placeholder="Confirm password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
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
                    {/* <Link to={RouterLinks.LOGIN_PAGE}> Sign up</Link> */}
                    Sign up
                  </Button>
                )}
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
