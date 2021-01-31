import styled,{createGlobalStyle} from 'styled-components';
import { WHITE,PRIMARY, SECONDARY } from './common/styles/colors';

export const AppWrapper = styled.div`
width: 100%;
height: 120vh;
display: flex;
`;

export const GlobalStyle = createGlobalStyle`

  #root{
    font-family:almoni-regular;
  }
  .title{
      font-family:rivkabau-bold;
  }
`
export const AppStyled = styled.div`
background-color:${WHITE};

ul[role="menu"]{
  background-color:${PRIMARY};
}
.ant-menu-item, .ant-menu-item-selected{
  background-color:${WHITE};
  color:${SECONDARY};
  font-weight:600;
}
`