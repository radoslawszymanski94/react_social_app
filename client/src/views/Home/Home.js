import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import { useSelector } from "react-redux";
import work from "../../images/work.png";

const StyledImage = styled.img`
  display: block;
  height: 280px;
  margin: 0 auto;
`;

const StyledHeading = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.grey300};
  font-weight: bold;
`;

const StyledParagraph = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.grey300};
  font-weight: bold;
`;

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.secondary};
  text-transform: uppercase;
`;

const Home = () => {
  const userID = useSelector((state) => state.users.userID);
  return (
    <div>
      <StyledHeading>
        Welcome to <StyledSpan>social app</StyledSpan>!
        <br />
        Connect with your friends and read interesting posts.
      </StyledHeading>
      <StyledImage
        src={work}
        alt="Man scrolling on social media on his laptop."
      />
      {userID === null && (
        <StyledParagraph>
          To sign in go to <Link to={routes.login}>Log in</Link> page. If you
          are not registered, click this link:
          <Link to={routes.register}>Register</Link>.
        </StyledParagraph>
      )}
    </div>
  );
};

export default Home;
