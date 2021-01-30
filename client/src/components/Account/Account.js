import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { message } from "antd";
import { getUser } from "../../actions";
import FileBase from "react-file-base64";
import { fadeIn } from "../../animations/index";
import ValidationInfo from "../../components/AddPost/ValidationInfo/ValidationInfo";
import * as Yup from "yup";
import * as api from "../../api";
import avatar from "../../images/avatar.jpg";

const StyledWrapper = styled.div`
  width: 40%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 10px;
  font-weight: bold;
  background-color: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.secondary};
`;

const StyledHeading = styled.h1`
  text-align: center;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px 20px;

  label {
    margin-top: 10px;
  }

  input {
    width: 100%;
    margin-top: 5px;
    padding: 10px;
    border: none;
    border-radius: 5px;
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
  }

  button:hover {
    background-color: ${({ theme }) => theme.secondary};
    color: #fff;
  }

  .validationInfo {
    color: red;
  }
`;

const StyledProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: 10px;
`;

const Account = () => {
  const dispatch = useDispatch();
  const { userInfo, userID } = useSelector((state) => state.users);
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(100, "Article title must contain less than 100 characters")
      .required("Required"),
    secondName: Yup.string()
      .max(2000, "Article text must contain less than 2000 characters")
      .required("Required"),
  });
  const {
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userInfo ? userInfo.firstName : "",
      secondName: userInfo ? userInfo.secondName : "",
      profileImage: userInfo ? userInfo.profileImage : "",
    },
    validationSchema,
    onSubmit: (values) => {
      api
        .updateUser(userID, { "userInfo": values })
        .then(() =>
          message.success(
            "User updated successfully! Updated data should display soon."
          )
        )
        .then(() => dispatch(getUser(userID)))
        .catch(() => message.error("User is not created."));
    },
  });

  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeading>Account Details</StyledHeading>
        <label htmlFor="firstName" className="inputLabel">
          First name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstName}
        />
        {errors.firstName && touched.firstName ? (
          <ValidationInfo animation={fadeIn}>{errors.firstName}</ValidationInfo>
        ) : null}
        <label htmlFor="secondName" className="inputLabel">
          Second name
        </label>
        <input
          id="secondName"
          name="secondName"
          type="text"
          placeholder="Surname"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.secondName}
        />
        {errors.secondName && touched.secondName ? (
          <ValidationInfo animation={fadeIn}>
            {errors.secondName}
          </ValidationInfo>
        ) : null}
        <label htmlFor="profileImage">Profile image</label>
        <StyledProfileImage src={userInfo ? userInfo.profileImage : avatar} />
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setFieldValue("profileImage", base64)}
        />
        <button type="submit" className="submitBtn">
          Save
        </button>
      </StyledForm>
    </StyledWrapper>
  );
};

export default Account;
