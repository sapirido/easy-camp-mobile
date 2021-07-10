import styled,{createGlobalStyle} from 'styled-components';
import { WHITE,PRIMARY, SECONDARY } from './common/styles/colors';

export const AppWrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
overflow: hidden;
overflow-y: scroll;
`;

export const GlobalStyle = createGlobalStyle`

  #root{
    font-family:almoni-regular;
  height: 100%;

  }
  .title{
      font-family:rivkabau-bold;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius:16px;
  }
`
export const AppStyled = styled.div`
background-color:${WHITE};
height:100%;

ul[role="menu"]{
  background-color:${PRIMARY};
}
.ant-menu-item, .ant-menu-item-selected{
  background-color:${WHITE};
  color:${SECONDARY};
  font-weight:600;
}
`