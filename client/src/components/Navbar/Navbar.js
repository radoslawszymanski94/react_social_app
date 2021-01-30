import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { routes } from "../../routes";
import { logout } from "../../actions";
import avatar from "../../images/avatar.jpg";

const { Header } = Layout;
const { SubMenu } = Menu;

const StyledProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const StyledHeader = styled(Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
`;

const StyledSubmenu = styled(SubMenu)`
  color: ${({ theme }) => theme.secondary};
  font-weight: bold;
  background-color: ${({ theme }) => theme.main};

  &:hover {
    background: ${({ theme }) => theme.secondary};
    color: white;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userID, userInfo } = useSelector((state) => state.users);
  return (
    <StyledHeader>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        style={{ float: "right" }}
      >
        <Menu.Item key={routes.home}>
          <NavLink to={routes.home}>Home</NavLink>
        </Menu.Item>
        {userID === null || !userID ? (
          <>
            <Menu.Item key={routes.login}>
              <NavLink to={routes.login}>Login</NavLink>
            </Menu.Item>
            <Menu.Item key={routes.register}>
              <NavLink to={routes.register}>Register</NavLink>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key={routes.posts}>
              <NavLink to={routes.posts}>Posts</NavLink>
            </Menu.Item>
            <Menu.Item key={routes.friends}>
              <NavLink to={routes.friends}>Add friends</NavLink>
            </Menu.Item>
            <StyledSubmenu
              title={
                userInfo ? `${userInfo.firstName} ${userInfo.secondName}` : ""
              }
              icon={
                <StyledProfileImage
                  src={userInfo ? userInfo.profileImage : avatar}
                />
              }
            >
              <Menu.Item key={routes.account}>
                <NavLink to={routes.account}>My account</NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to={routes.home} onClick={() => dispatch(logout())}>
                  Logout
                </NavLink>
              </Menu.Item>
            </StyledSubmenu>
          </>
        )}
      </Menu>
    </StyledHeader>
  );
};

export default Navbar;
