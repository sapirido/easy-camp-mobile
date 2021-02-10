import React from 'react';
import styled from 'styled-components';
import { PRIMARY,SECONDARY } from '../../common/styles/colors';
import general from '../../assets/images/general_schedule.jpg';
import HeaderPage from '../../components/header-page/HeaderPage';
import {BlockContainer} from '../../common/styles/common.styled';


const ImageWrapper = styled.div`
padding-top:3rem;
display:flex;
justify-content:center;
`
const Image = styled.img`
height:28rem;
width:22rem;
border-radius:16px;
`

export default function GeneralSchedule({}){

    return(
        <>
        <HeaderPage style={{position:'absolute',top:'9rem'}} title={'- תוכנית הקייטנה -'} size={1.6} color={SECONDARY}/>
        <BlockContainer>
            <ImageWrapper>
            <Image src={general}/>
            </ImageWrapper>
        </BlockContainer>
        </>
    )
}