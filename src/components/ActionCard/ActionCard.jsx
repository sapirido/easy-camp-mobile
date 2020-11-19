import { Avatar, Card } from 'antd';
import React from 'react';
import * as animationData from '../../assets/lottie/group.json';
import { ActionCardStyled } from './ActionCard.styled';
const {Meta} = Card;

export default function ActionCard({activeUser,title,actions,description}){

    return(
        <ActionCardStyled>
        <Card
        className={'action-card'}
        style={{ width: 300,boxShadow:'5px 5px 10px' }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={actions}
      >
        <Meta
          avatar={<Avatar src={activeUser.photoURL} />}
          title={title}
          description={description}
        />
      </Card>
      </ActionCardStyled>
    
    )
}