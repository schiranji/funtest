import React from 'react';
import { Formik } from 'formik';
import {Button} from 'baseui/button';
import { Input } from "baseui/input";
import { Container, FormGroup, Row, Col } from 'reactstrap';
import {requestBase} from '../utils';
import { useStyletron } from 'styletron-react';
import { useHistory, useLocation } from 'react-router-dom'
import { toaster } from 'baseui/toast';

const LoginFormGroup = ({children}) => {
  const [css] = useStyletron();

  return (
    <FormGroup
      className={css({
        marginBottom: "25px"
      })}>
      {children}
    </FormGroup>
  )
}

function Login() {
  const [css] = useStyletron();
  let location = useLocation();
  let history = useHistory();

  let { from } = location.state || { from: { pathname: "/" } };

  return(
    <Container>
      <Row className={css({
        margin: "100px 0 50px 0",
      })}>
        <Col>
          <h2 className="text-center">Login to Funzippy</h2>
        </Col>
      </Row>
      <Row className="justify-content-center"> 
        <Col className={css({
          boxShadow: "0 0 25px rgb(130, 130, 130, 0.3)",
          padding: "25px",
          borderRadius: "5px"
        })} md="6">
          <Formik
            onSubmit={async (values) => {
              const loginReq = await requestBase.post("/user/authenticate", {
                emailAddress: values.email,
                password: values.password,
                products: ["event"]
              }, {
                headers: {
                  "accept": "application/json",
                  "content-type": "application/json",
                },
              })

              console.log(loginReq.headers);
          
              if (loginReq.data.success === false) {
                toaster.negative(<p>"Failed to login, please try again"</p>)
                return
              }
          
              history.replace(from)
            }}
            initialValues={{
              email: "",
              password: ""
            }}>
              {({handleSubmit, handleChange, values}) => (
                <form onSubmit={handleSubmit}>
                  <LoginFormGroup>
                    <label>Your email</label>
                    <Input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={values.email}></Input>
                  </LoginFormGroup>
                  <LoginFormGroup>
                    <label>Your password</label>
                    <Input
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={values.password}></Input>
                  </LoginFormGroup>
                  <Button type="submit">Login</Button>
                </form>
              )}
          </Formik>
        </Col>
      </Row>
      <Row className={css({
        margin: "35px 0",
      })}>
        <Col>
          <p className="text-center">
            <a href={`${window.location.protocol}//${window.location.hostname}${window.location.port ? ":" + window.location.port : ""}`}>Return home</a>
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default Login;
