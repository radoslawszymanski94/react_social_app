import React from "react";
import styled from "styled-components";
import GlobalStyles from "../theme/GlobalStyles";
import { theme } from "../theme/mainTheme";
import { ThemeProvider } from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import Bread from "../components/Bread/Bread";
import Footer from "../components/Footer/Footer";
import { Layout } from "antd";

const { Content } = Layout;

const StyledContent = styled(Content)`
  padding: 0 50px;
  margin-top: 64px;
  overflow: scroll;
`;

const StyledWrapper = styled.div`
  padding: 24px;
`;

const StyledLayout = styled(Layout)`
  height: 100vh;
`;

const MainTemplate = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledLayout>
        <Navbar />
        <StyledContent className="site-layout">
          <StyledWrapper className="site-layout-background">
            <Bread />
            {children}
          </StyledWrapper>
        </StyledContent>
        <Footer />
      </StyledLayout>
    </ThemeProvider>
  );
};

export default MainTemplate;
