import React, { useEffect, useState } from 'react';
import {GreetingContainerStyled, GreetingContentStyled, GreetingBoxStyled, GreetingTextStyled} from './Login.styled'

export default function GreetingPopup({role}){



    function renderSwitch(role){
        switch (role) {
            case 1: return '!ברוך הבא הורה יקר'
            case 2: return '!ברוך הבא מדריך יקר'
            case 3: return '!ברוך הבא רכז נסיעות יקר'
            case 4: return '!ברוך הבא רכז מחנה יקר'
            case 5: return '!ברוך הבא רכז כללי יקר'
            case 6: return '!ברוך הבא מנהל יקר'
        }
    }

    return (
        <GreetingContainerStyled>
            <GreetingContentStyled>
                <GreetingBoxStyled>
                    <GreetingTextStyled>
                        {renderSwitch(role)}
                 </GreetingTextStyled>
                </GreetingBoxStyled>
            </GreetingContentStyled>
        </GreetingContainerStyled>

    )
}