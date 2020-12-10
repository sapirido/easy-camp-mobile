import styled from 'styled-components';

export const DailyCalanderStyled = styled.div`
width:100%;
height:100%;
padding:50px;
`

export const CreationStyled = styled.div`
display:flex;
justify-content:center;
padding-top:30px;
.plus{
    font-size:40px;
    border-radius:20px;
    box-shadow:7px 6px 28px 1px rgba(0, 0, 0, 0.24);
    cursor:pointer;
    outline: none; 
    transition: 0.2s all;
}
.plus:active{
    transform:scale(0.98);
    box-shadow:3px 2px 22px 1px rgba(0, 0, 0, 0.24);
}
`

export const CreateContentSyled = styled.div`

`
export const GeneralInfoStyled = styled.div`
display:flex;
justify-content:center;
padding-bottom:30px;
`

export const CardsStyled = styled.div`
padding-top:40px;
display:flex;
width:100%;
justify-content:space-between;
flex-wrap:wrap;
.ant-card-meta-detail{
    text-align:center;
}
`