import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { routes } from "../../routes";
import { authenticate } from "../../actions";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

const StyledWrapper = styled.div`
  width: 35%;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.secondary};
  font-weight: bold;
`;

const StyledHeading = styled.h1`
  text-align: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px 20px;

  input {
    margin-top: 5px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
  }

  button {
    width: 100%;
    margin: 15px 0;
    padding: 7px 12px;
    border-radius: 5px;
    background-color: #fff;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: 0.5s ease;
    text-transform: uppercase;

    &:hover {
      background-color: ${({ theme }) => theme.secondary};
      color: #fff;
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 0 0 30px 0;
`;

const StyledLink = styled(Link)`
  display: block;
  margin: 20px 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: bold;
  color: black;
  text-transform: uppercase;
  text-align: center;
`;

const Login = () => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={({ username, password }) => {
        dispatch(authenticate(username, password)).then(() =>
          setRedirect(true)
        );
      }}
    >
      {({ handleChange, handleBlur, values }) => {
        if (redirect) {
          return <Redirect to={routes.posts} />;
        }
        return (
          <StyledWrapper>
            <StyledHeading>Sign in</StyledHeading>
            <StyledForm>
              <StyledInput
                type="text"
                name="username"
                placeholder="Login"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <StyledInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <button type="submit">sign in</button>
            </StyledForm>
            <StyledLink to={routes.register}>I want my account!</StyledLink>
          </StyledWrapper>
        );
      }}
    </Formik>
  );
};

export default Login;
