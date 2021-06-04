import React, { useState } from 'react';
import {DatePicker,Select} from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import HeaderPage from '../../components/header-page/HeaderPage';
import { SECONDARY } from '../../common/styles/colors';

const Option = Select;
export default function SelfTransport({}){

    const [date,setDate] = useState(moment(Date.now()).format('DD-MM-YYYY'));


    function currentDateChanged(date, dateString) {
        setDate(moment(date).format('DD-MM-YYYY'));
    }

    return(
        <SelfTransportWrapper>
        <HeaderPage  title={'- איסוף והגעה עצמית -'} size={1.6} color={SECONDARY}/>
        <DatePicker
        defaultValue={moment(date, 'YYYY-MM-DD')}
        style={{
          display: 'flex',
          alignSelf: 'center',
          marginTop: '2rem',
          marginBottom: '1rem',
        }}
        onChange={currentDateChanged}
      />
    </SelfTransportWrapper>
    )
}

const SelfTransportWrapper = styled.div`
flex-direction:column;
align-items:center;
height:fit-content;
overflow:scroll;
width: 100%;
text-align:center;
`