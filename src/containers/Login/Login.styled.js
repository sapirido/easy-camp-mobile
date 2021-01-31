import styled from 'styled-components';
import { TEXT_COLOR,PRIMARY,WHITE } from '../../common/styles/colors';

export const LoginStyled = styled.div`
height:100%;
width:100%;
padding-top:5rem;

`
export const ContentStyled = styled.div`
padding:5rem 2.5rem;
display:flex;
flex-direction:column;
justify-content:center;
text-align:center;
`

export const SwitcherStyled = styled.div`
padding-top:3rem;
`

export const HeaderStyled = styled.div`
display:flex;
justify-content:center;
flex-direction:column;
text-align:center;
`

export const TitleStyled = styled.span`
font-size:1.8rem;
color:#707070;
font-family:rivkabau-regular;
`

export const SelctionStyled = styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
font-family:almoni-regular;
padding-top:6rem;
.ant-select > .ant-select-selector {
    border-radius:1.5rem;
    border:2px solid ${PRIMARY};
  
}
.ant-select:not(.ant-select-disabled):hover .ant-select-selector{
    border:2px solid ${PRIMARY};
    border-radius:1.5rem;
}
`

export const IconStyled = styled.span`
color:${WHITE};
display:flex;
text-align:center;
align-items:center;
justify-content:${({justifyContent}) => justifyContent ? justifyContent : 'center'};
font-family:almoni-regular;
padding-top:0.4rem;
font-size:1rem;
font-weight:600;
width:${({width}) => width ? width : '3rem'};
`

export const FormStyled = styled.div`
padding-top:6.5rem;

`

export const ButtonsStyled = styled.div`
padding-top:3rem;
`