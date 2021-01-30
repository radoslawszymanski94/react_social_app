import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { message } from "antd";
import { getUser } from "../../actions";
import { fadeIn } from "../../animations/index";
import ValidationInfo from "./ValidationInfo/ValidationInfo";
import * as Yup from "yup";
import * as api from "../../api";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 20px auto;

  .inputLabel {
    margin: 10px auto;
    color: ${({ theme }) => theme.grey300};
    font-weight: bold;
    text-transform: uppercase;
  }

  textarea {
    padding: 5px;
    margin-top: 0;
    border: 2px solid ${({ theme }) => theme.grey300};
    border-radius: 5px;
  }

  .submitBtn {
    margin: 10px auto;
    padding: 7px 15px;
    border-radius: 5px;
    border: none;
    background-color: ${({ theme }) => theme.main};
    color: ${({ theme }) => theme.secondary};
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    transition: 0.5s linear;

    &:hover {
      background-color: ${({ theme }) => theme.secondary};
      color: white;
    }
  }

  .validationInfo {
    color: red;
  }
`;

const AddPost = ({ handleTrigger }) => {
  const dispatch = useDispatch();
  const { userInfo, userID, postsCreated } = useSelector(
    (state) => state.users
  );

  const validationSchema = Yup.object({
    postBody: Yup.string()
      .max(2000, "Post body must contain less than 2000 characters")
      .required("Required"),
  });
  const {
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    handleChange,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      user: userInfo ? `${userInfo.firstName} ${userInfo.secondName}` : "",
      postBody: "",
      userId: userID,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      api
        .createPost(values)
        .then((res) =>
          api.updateUser(userID, {
            postsCreated: [...postsCreated, res],
          })
        )
        .then(() => message.success("Post created successfully!"))
        .then(() => dispatch(getUser(userID)))
        .then(() => handleTrigger())
        .catch(() => message.error("Post is not created."));

      resetForm({});
    },
  });

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="text" className="inputLabel">
        Create post
      </label>
      <textarea
        id="postBody"
        name="postBody"
        placeholder="What are you thinking of?"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.postBody}
      />
      {errors.postBody && touched.postBody ? (
        <ValidationInfo animation={fadeIn}>{errors.postBody}</ValidationInfo>
      ) : null}
      <button type="submit" className="submitBtn">
        Create
      </button>
    </StyledForm>
  );
};

export default AddPost;
