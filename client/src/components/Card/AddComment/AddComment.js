import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { message } from "antd";
import { updatePost } from "../../../actions";
import { fadeIn } from "../../../animations/index";
import ValidationInfo from "../../AddPost/ValidationInfo/ValidationInfo";
import * as Yup from "yup";
import { motion } from "framer-motion";

const StyledForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 5px auto;

  .inputLabel {
    margin: 5px auto;
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
    margin: 5px auto;
    padding: 3px 7px;
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

const AddComment = ({ handleTrigger, id }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.users);
  const comments = useSelector((state) =>
    state.posts.filter((post) => post._id === id)
  );

  const validationSchema = Yup.object({
    text: Yup.string()
      .max(2000, "Comment must contain less than 2000 characters")
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
      text: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        updatePost(id, { "comments": [...comments[0].comments, values.text] })
      )
        .then(() => handleTrigger())
        .then(() => message.success("Comment added successfully!"));
      resetForm({});
    },
  });

  return (
    <StyledForm
      onSubmit={handleSubmit}
      variants={fadeIn}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <label htmlFor="text" className="inputLabel">
        Add comment
      </label>
      <textarea
        id="text"
        name="text"
        placeholder="Say something about this post."
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.text}
      />
      {errors.text && touched.text ? (
        <ValidationInfo animation={fadeIn}>{errors.text}</ValidationInfo>
      ) : null}
      <button type="submit" className="submitBtn">
        Add
      </button>
    </StyledForm>
  );
};

export default AddComment;
