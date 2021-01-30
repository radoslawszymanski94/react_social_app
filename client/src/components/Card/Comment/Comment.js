import React from "react";
import { Skeleton, List } from "antd";
import styled from "styled-components";
import { motion } from "framer-motion";
import { fadeIn } from "../../../animations";

const StyledListItem = styled(List.Item)`
  background-color: #fff;
  border-radius: 10px;
`;

const Comment = ({ itemIndex, commentText, loading }) => {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="show" exit="exit">
      <StyledListItem>
        <Skeleton loading={loading} active>
          <List.Item.Meta description={`Comment #${itemIndex}`} />
          {commentText}
        </Skeleton>
      </StyledListItem>
    </motion.div>
  );
};

export default Comment;
