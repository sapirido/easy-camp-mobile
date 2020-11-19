import React,{useState} from 'react';
import { Steps, Button, message } from 'antd';
import { CreateCampStyled,ManagerFormStyled,TeamCreateStyled,StepsStyled,StepContent,StepActionStyled } from './CreateCamp.styled';
import { MainText,HeaderStyled,DescriptionText } from '../../../common/styles/common.styled';
import CampMangerForm from '../../../components/forms/CampMangerForm';
import CampGeneralInfo from '../../../components/forms/CampGeneralInfo';

const {Step} = Steps;

export default function PlusOutlined({}){
    const [campName,setCampName] = useState('');
    const [campNumber,setNumber] = useState('');
    const [managerName,setManagerName] = useState('');
    const [managerId,setManagerId] = useState('');
    const [managerPhone,setManagerPhone] = useState('');
    const [managerEmail,setManagerEmail] = useState('');

    const campMangerFormProps = {managerName,setManagerName,managerId,setManagerId,managerPhone,setManagerPhone,managerEmail,setManagerEmail};

    const steps = [
        {
            title:'פרטי המחנה',
            content:<CampGeneralInfo campName={campName} setCampName={setCampName} campNumber={campNumber} setCampNumber={setNumber}/>
        },
        {
            title:'פרטי רכז המחנה',
            content:<CampMangerForm {...campMangerFormProps}/>
        },
        {
            title:'פרטי מדריכי המחנה',
            content:<CampMangerForm/>
        },
        {
            title:'ציוות ילדים לקבוצות',
            content:<CampMangerForm/>
        }
    ]

    const [current,setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    }

    const prev = () =>{
        setCurrent(current - 1);
    }

    return(
        <CreateCampStyled>
            <HeaderStyled>
                <MainText>
                    יצירת מחנה
                </MainText>
                <TeamCreateStyled>
            <StepsStyled>
                <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      </StepsStyled>
      <StepContent>
          {steps[current].content}
      </StepContent>
      <StepActionStyled>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </StepActionStyled>
                </TeamCreateStyled>
            </HeaderStyled>
        </CreateCampStyled>
    )
}