import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    *, *::before, *::after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-size: 1.6rem;
        font-family: 'Open Sans', sans-serif;
    }

    /* Antd css override */
    .ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
        background-color: ${({ theme }) => theme.tertiary};
    }
    
    
    .ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover {
        background-color: ${({ theme }) => theme.secondary};
    } 

    .ant-layout-header, .ant-layout-header .ant-menu {
        background: ${({ theme }) => theme.main};
    }

    .ant-menu-dark .ant-menu-item, .ant-menu-dark .ant-menu-item-group-title, .ant-menu-dark .ant-menu-item > a, .ant-menu-dark .ant-menu-item > span > a {
        color: ${({ theme }) => theme.secondary};
        font-weight: bold;
        text-transform: uppercase;
    }

    .ant-menu.ant-menu-dark, .ant-menu-dark .ant-menu-sub, .ant-menu.ant-menu-dark .ant-menu-sub {
        background: ${({ theme }) => theme.main};
        color: ${({ theme }) => theme.secondary};
    }

    .ant-menu.ant-menu-dark .ant-menu-sub > li:hover {
        background: ${({ theme }) => theme.secondary};
    }

    .ant-menu-submenu.ant-menu-submenu-selected {
        color: ${({ theme }) => theme.secondary};
        background-color: ${({ theme }) => theme.tertiary};
    }

    .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
        background-color: ${({ theme }) => theme.tertiary};
        color: ${({ theme }) => theme.secondary};
    }
`;

export default GlobalStyles;
