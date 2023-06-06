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
    const { username, password, displayName, email, confirmpassword } = value;
    if (
      username === " " ||
      password === " " ||
      username === undefined ||
      password === undefined ||
      email === "" ||
      email === undefined ||
      displayName === "" ||
      displayName === undefined ||
      confirmpassword === "" ||
      confirmpassword === undefined
    ) {
      return false;
    } else {
      if (password !== confirmpassword) {
        return false;
      }
      return true;
    }
  };
  // const handleValuesChange = () => {
  //   const { email, username, password, displayName, confirmassword } = form.getFieldsValue();
  //   dispatch(
  //     actions.AuthActions.updateLoginInfo({
  //       username,
  //       email,
  //       password,
  //       displayName,
  //       confirmassword,
  //     })
  //   );
  // };
  const handleRegister = async () => {
    try {
      const info = {
        Name: form.getFieldsValue().displayName,
        Username: form.getFieldsValue().username,
        Email: form.getFieldsValue().email,
        Password: form.getFieldsValue().password,
      };
      dispatch(actions.StateAction.loadingState(true));
      const message = await authService.handleRegister(info);
      if ((message.StatusCode = 1)) {
        notification({
          message: "Đăng ký thành công",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
        form.getFieldsValue();
        dispatch(actions.StateAction.loadingState(false));
        return navigate(RouterLinks.LOGIN_PAGE);
      } else {
        dispatch(actions.StateAction.loadingState(false));
        notification({
          message: message.Message,
          title: "Thông báo",
          position: "top-right",
          type: "error",
        });
      }
    } catch (err: any) {
      dispatch(actions.StateAction.loadingState(false));
      notification({
        message: "Server không phản hồi",
        title: "Thông báo",
        position: "top-right",
        type: "error",
      });
    }
  };
  return (
    <>
      {loading ? <Spin /> : " "}
      <div className={`LoginPage ${loading ? "loading" : " "}`}>
        <div className="FormLogin">
          <div className="LoginTitle">Sign up</div>
          <Form layout="vertical" form={form}>
            <Row gutter={[10, 0]}>
              <Col span={24}>
                <Form.Item
                  label="Tên hiển thị"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập tên của bạn",
                    },
                  ]}
                  name="displayName"
                >
                  <Input placeholder="Nhập tên hiển thị" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Tên đăng nhập"
                  rules={[
                    {
                      required: true,
                      message: "Tên đăng nhập không được bỏ trống",
                    },
                  ]}
                  name="username"
                >
                  <Input placeholder="Nhập tên đăng nhập"></Input>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Email không được bỏ trống",
                    },
                  ]}
                  name="email"
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Mật khẩu"
                  rules={[
                    {
                      required: true,
                      message: "Mật khẩu không được bỏ trống",
                    },
                  ]}
                  name="password"
                >
                  <Input.Password
                    placeholder="Nhập mật khẩu"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Xác nhận lại mật khẩu"
                  rules={[
                    {
                      required: true,
                      message: "Mật khẩu không được bỏ trống",
                    },
                    {
                      validator: async (_, value) => {
                        if (value) {
                          if (value !== form.getFieldsValue().password) {
                            throw new Error("Không giống mật khẩu! ");
                          }
                        }
                      },
                    },
                  ]}
                  name="confirmpassword"
                >
                  <Input.Password
                    placeholder=""
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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
                    onClick={handleRegister}
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
