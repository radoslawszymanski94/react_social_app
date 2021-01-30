import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";
import { routes } from "../../routes";

const StyledBreadcrumb = styled(Breadcrumb)`
  margin: 0 0 16px 0;
`;

const Bread = withRouter((props) => {
  const { location } = props;
  const breadcrumbNameMap = {
    "/posts": "Posts",
    "/account": "Account details",
    "/login": "Login",
    "/register": "Register",
    "/account": "Account",
    "/friends": "Add Friend",
  };
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((item, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return <StyledBreadcrumb>{breadcrumbItems}</StyledBreadcrumb>;
});

export default Bread;
