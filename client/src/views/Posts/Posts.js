import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Spin, Empty } from "antd";
import Card from "../../components/Card/Card";
import avatarImage from "../../images/avatar.jpg";
import { getPost, clearPost } from "../../actions";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../api";
import AddPost from "../../components/AddPost/AddPost";

const StyledSpinner = styled(Spin)`
  width: 100%;
  margin: 0 auto;
  color: ${({ theme }) => theme.main};
`;

const Posts = () => {
  const dispatch = useDispatch();
  const { friends, postsCreated } = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const [isLoading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const handleTrigger = () => {
    setTrigger(!trigger);
  };
  const sortedPosts = posts.sort(
    (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
  );

  useEffect(() => {
    if (postsCreated !== null) {
      postsCreated.map((id) => dispatch(getPost(id)));
    }
    friends.map((el) =>
      api
        .getUser(el)
        .then((res) => res.data)
        .then((response) =>
          response.postsCreated.map((element) => dispatch(getPost(element)))
        )
    );
    setLoading(false);

    return () => {
      dispatch(clearPost());
    };
  }, [trigger, dispatch]);

  if (isLoading) {
    return (
      <>
        <AddPost handleTrigger={handleTrigger} />
        <StyledSpinner />
      </>
    );
  }

  return (
    <div>
      <div>
        <AddPost handleTrigger={handleTrigger} />
        {sortedPosts.length !== 0 ? (
          sortedPosts.map((post) => (
            <Card
              likeCount={post.likeCount}
              comments={post.comments}
              avatar={avatarImage}
              user={post.user}
              time={moment(post.createdAt).fromNow()}
              content={post.postBody}
              key={post._id}
              id={post._id}
              handleTrigger={handleTrigger}
            />
          ))
        ) : (
          <Empty description={"No posts found."} />
        )}
      </div>
    </div>
  );
};

export default Posts;
