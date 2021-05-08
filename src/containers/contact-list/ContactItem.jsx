import React from 'react';
import {ContactItemStyled, InfoStlyed, InfoText, PhoneStyled } from './Contact.styled';
import { SECONDARY, PRIMARY } from '../../common/styles/colors';
import phone from '../../assets/icons/phone.svg';

const roleMapping = {
    ADMIN:{role:"מנהל קייטנה",color:'#219EBC'},
    CAMP_MANAGER:{role:"רכז מחנה",color:'#219EBC'},
    INSTRUCTION:{role:"מדריך",color:'#023047'},
    CHILDREN: {role:'חניך',color:'#FFB703'}
}

const Phone = () => (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" width="19" height="19" viewBox="0 0 19 19">
  <defs>
    <clipPath id="clip-path">
      <rect width="19" height="19" fill="none"/>
    </clipPath>
  </defs>
  <g id="Phone" clip-path="url(#clip-path)">
    <rect id="Rectangle_320" data-name="Rectangle 320" width="19" height="19" fill="none"/>
    <path id="Path_110" data-name="Path 110" d="M11.027,13.571l2.036-1.866a.623.623,0,0,1,.509-.17l.339.17,4.75,2.205c.339.17.339.339.339.679a4.3,4.3,0,0,1-1.357,3.054A4.86,4.86,0,0,1,14.08,19a10.337,10.337,0,0,1-4.75-1.187A22.239,22.239,0,0,1,4.58,14.42a28.9,28.9,0,0,1-2.545-3.732,23.449,23.449,0,0,1-1.7-3.732A10.44,10.44,0,0,1,0,3.732,4.458,4.458,0,0,1,1.188,1.188,5.159,5.159,0,0,1,4.411,0a.881.881,0,0,1,.679.339l2.545,4.75a.592.592,0,0,0,.17.339.623.623,0,0,1-.17.509L5.429,7.973a.757.757,0,0,0,0,.848,16.2,16.2,0,0,0,2.036,2.714,17.129,17.129,0,0,0,2.714,2.205C10.518,13.911,10.857,13.911,11.027,13.571Z" fill="#fff"/>
  </g>
</svg>

)

export default function ContactListItem({name,phone,type = 'CHILDREN'}){

    return(
        <ContactItemStyled backgroundColor={roleMapping[type]?.color}>
               <PhoneStyled href={`tel:${phone}`}>
                <Phone/>
            </PhoneStyled>
            <InfoStlyed>
    <InfoText size={1.2} fontWeight={600}>{name}</InfoText>
    <InfoText size={0.8}>{roleMapping[type]?.role}</InfoText>
    <InfoText size={0.8}>{phone}</InfoText>
            </InfoStlyed>
         
        </ContactItemStyled>
    )
}