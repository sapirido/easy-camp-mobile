import { Card } from 'antd';
import React, { useState } from 'react';

export default function TabsCard({title,tabsList,contentList,onEditClicked}){

    const [key,setKey] = useState(tabsList[0].key);

   
    return(
        <Card
        title={title}
        tabList={tabsList}
        activeTabKey={key}
        onTabChange={key => setKey(key)}
        >
            {contentList[key]}
        </Card>
    )
}