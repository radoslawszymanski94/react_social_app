import React, { useState } from "react";
import styled from "styled-components";
import { Skeleton, List, Avatar, Popconfirm } from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, deletePost, getUser } from "../../actions";
import Comment from "./Comment/Comment";
import AddComment from "./AddComment/AddComment";
import { fadeIn } from "../../animations";
import { motion } from "framer-motion";
import * as api from "../../api";

const StyledList = styled(List)`
  width: 60%;
  margin: 15px auto;
  border-radius: 10px;
  border-left: 10px solid ${({ theme }) => theme.main};
  border-right: 10px solid ${({ theme }) => theme.main};

  .ant-list-item-meta-title {
    margin-bottom: 0px;
  }

  .ant-list-item-meta-description {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
  .noSelect {
    user-select: none;
  }
`;

const StyledListItem = styled(List.Item)`
  border-radius: 10px;
  background-color: #fff;
`;

const StyledIconElement = styled.span`
  cursor: pointer;
`;

const StyledDeleteButton = styled(DeleteOutlined)`
  position: absolute;
  right: 15px;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: red;
  cursor: pointer;
`;

const IconText = ({ icon, text, click, counter }) => (
  <StyledIconElement
    onClick={click}
    style={counter > 0 ? { color: "#05386B", fontWeight: "bold" } : null}
    className="noSelect"
  >
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </StyledIconElement>
);

const Card = ({
  avatar,
  user,
  content,
  time,
  id,
  comments,
  likeCount,
  handleTrigger,
}) => {
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(likeCount);
  const { postsCreated, userID } = useSelector((state) => state.users);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const postsList = [{ avatar, user, content, time, id, comments }];
  const likeHandler = (likes) => {
    setLikes(likes + 1);
    dispatch(updatePost(id, { "likeCount": likes + 1 }));
  };

  const deleteHandler = (postsCreated, id) => {
    dispatch(deletePost(id));
    api
      .updateUser(userID, {
        "postsCreated": postsCreated.filter((post) => post !== id),
      })
      .then(() => dispatch(getUser(userID)))
      .then(() => handleTrigger());
  };
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="show" exit="exit">
      <StyledList
        itemLayout="vertical"
        size="large"
        dataSource={postsList}
        renderItem={(item) => (
          <>
            <StyledListItem
              key={item.title}
              id={id}
              actions={[
                <IconText
                  icon={LikeOutlined}
                  text={likes}
                  key="list-vertical-like-o"
                  click={() => {
                    likeHandler(likes);
                  }}
                  counter={likes}
                />,
                <IconText
                  icon={MessageOutlined}
                  text={comments ? comments.length : 0}
                  key="list-vertical-message"
                  click={() => setCommentsVisible(!commentsVisible)}
                />,
              ]}
            >
              {postsCreated.some((post) => id === post) && (
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={() => deleteHandler(postsCreated, id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <StyledDeleteButton />
                </Popconfirm>
              )}
              <Skeleton loading={false} active avatar>
                <>
                  <List.Item.Meta
                    avatar={<Avatar src={avatar} />}
                    title={item.user}
                    description={time}
                  />
                  {content}
                </>
              </Skeleton>
            </StyledListItem>
            {commentsVisible && (
              <>
                <AddComment handleTrigger={handleTrigger} id={id} />
                {item.comments.map((comment) => (
                  <>
                    <Comment
                      itemIndex={comments.indexOf(comment) + 1}
                      commentText={comment}
                      loading={false}
                    />
                  </>
                ))}
              </>
            )}
          </>
        )}
      />
    </motion.div>
  );
};

export default Card;
