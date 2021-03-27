import styled,{createGlobalStyle} from 'styled-components';
import { SECONDARY } from '../../common/styles/colors';

export const ModalGlobalStyled = createGlobalStyle`
.ant-modal-mask{
  background:rgba(33, 158, 188,0.6);
}
.ant-modal-wrap {
  top:15rem;
}
.ant-modal-content{
  width: 90%;
  margin: auto;
  border-radius:18px;
}
`

export const ModalContentStyled = styled.div`
text-align:center;
display:flex;
justify-content:center;
flex-direction:column;
`

export const ButtonsStyled = styled.div`
display:flex;
justify-content:space-evenly;
width:80%;
margin:auto;
`

export const ContentStyled = styled.div`
text-align:center;
color:${SECONDARY};
font-size:1.1rem;
padding:1rem;
`