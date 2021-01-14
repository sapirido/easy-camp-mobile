import styled from 'styled-components';
import { TEXT_COLOR,PRIMARY } from '../../common/styles/colors';

export const LoginStyled = styled.div`
height:100%;
width:100%;
padding:3rem;

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
font-size:2.8rem;
color:#707070;
font-family:rivkabau-regular;
`

export const SelctionStyled = styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
font-family:almoni-regular;
padding-top:3rem;
.ant-select > .ant-select-selector{
    border-radius:1.5rem;
    border:2px solid ${PRIMARY};
}
`