import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Spin, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { getUser } from "../../actions";
import { UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";
import * as api from "../../api";

const StyledUsersWrapper = styled.div``;

const StyledSpinner = styled(Spin)`
  width: 100%;
  margin: 0 auto;
  color: ${({ theme }) => theme.main};
`;

const StyledListElement = styled.div`
  position: relative;
  min-width: 30%;
  max-width: 50%;
  padding: 10px;
  margin: 15px auto;
  background-color: white;
  border-radius: 10px;
  border-left: 10px solid ${({ theme }) => theme.main};
  border-right: 10px solid ${({ theme }) => theme.main};
`;

const StyledAddFriendButton = styled(UserAddOutlined)`
  position: absolute;
  right: 10px;
  margin-left: 10px;
  padding: 4px;
  border-radius: 50%;
  font-size: ${({ theme }) => theme.fontSize.m};
  cursor: pointer;
  background-color: ${({ theme }) => theme.main};
`;

const StyledDeleteFriendButton = styled(UserDeleteOutlined)`
  position: absolute;
  right: 10px;
  margin-left: 10px;
  padding: 4px;
  border-radius: 50%;
  font-size: ${({ theme }) => theme.fontSize.m};
  cursor: pointer;
  background-color: red;
`;

const StyledHeading = styled.h1`
  margin-bottom: 40px;
  text-align: center;
  color: ${({ theme }) => theme.grey300};
  font-weight: bold;
`;

const AddFriends = () => {
  const dispatch = useDispatch();
  const { friends, userID, userInfo } = useSelector((state) => state.users);

  const { firstName, secondName } = userInfo;
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const handleAddFriend = (id) => {
    api
      .updateUser(userID, { "friends": [...friends, id] })
      .then(() => message.success("Friend added successfully!"))
      .then(() => dispatch(getUser(userID)))
      .catch(() => message.error("Friend is not added."));
  };

  const handleDeleteFriend = (id) => {
    api
      .updateUser(userID, {
        "friends": friends.filter((friend) => friend !== id),
      })
      .then(() => message.success("Friend deleted successfully!"))
      .then(() => dispatch(getUser(userID)))
      .catch(() => message.error("Friend is not deleted."));
  };
  useEffect(() => {
    api
      .getUsers()
      .then((res) => setUsers(res.data))
      .then(() => setIsLoading(false));
  }, []);
  return (
    <div>
      <StyledHeading>
        Find and add a friend to your friends list!
        <br />
        After adding, you will see your friend's posts on your wall.
      </StyledHeading>
      <StyledUsersWrapper>
        {isLoading ? (
          <StyledSpinner />
        ) : users.length === 0 ? (
          <Empty description={"No friends found."} />
        ) : (
          users.map(
            (user) =>
              `${user.userInfo.firstName} ${user.userInfo.secondName}` !==
                `${firstName} ${secondName}` && (
                <StyledListElement>
                  {`${user.userInfo.firstName} ${user.userInfo.secondName}`}
                  {!friends.includes(user._id) ? (
                    <StyledAddFriendButton
                      onClick={() => handleAddFriend(user._id)}
                    />
                  ) : (
                    <StyledDeleteFriendButton
                      onClick={() => handleDeleteFriend(user._id)}
                    />
                  )}
                </StyledListElement>
              )
          )
        )}
      </StyledUsersWrapper>
    </div>
  );
};

export default AddFriends;
