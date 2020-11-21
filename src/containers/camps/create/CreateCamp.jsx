import { Button, message, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HeaderStyled, MainText } from '../../../common/styles/common.styled';
import CampChildrenForm from '../../../components/forms/CampChildrensForm';
import CampGeneralInfo from '../../../components/forms/CampGeneralInfo';
import CampInstractions from '../../../components/forms/CampInstractions';
import CampMangerForm from '../../../components/forms/CampMangerForm';
import InstructionsTransfer from '../../../components/InstructionsTransfer/InstructionsTranfer';
import { CreateCampStyled, StepActionStyled, StepContent, StepsStyled, TeamCreateStyled } from './CreateCamp.styled';
import {saveCamp} from '../../../data/modules/camp/camp.action';

const {Step} = Steps;

export default function CreateCamp({}){
    const [campName,setCampName] = useState('');
    const [campNumber,setNumber] = useState('');
    const [managerName,setManagerName] = useState('');
    const [managerId,setManagerId] = useState('');
    const [managerPhone,setManagerPhone] = useState('');
    const [managerEmail,setManagerEmail] = useState('');
    const [instructions,setInstructions] = useState([]);
    const [childrens,setChildrens] = useState([]);
    const [groups,setGroups] = useState([]);
    const [validateStep,setValidateStep] = useState(-1);
    const [current,setCurrent] = useState(0);
    const dispatch = useDispatch();

useEffect(() => {
    setValidationStep();
}, [childrens,instructions,groups])

    const campMangerFormProps = {managerName,setManagerName,managerId,setManagerId,managerPhone,setManagerPhone,managerEmail,setManagerEmail};

    const steps = [
        {
            title:'פרטי המחנה',
            content:<CampGeneralInfo checkValidation={setValidationStep} campName={campName} setCampName={setCampName} campNumber={campNumber} setCampNumber={setNumber}/>
        },
        {
            title:'פרטי רכז המחנה',
            content:<CampMangerForm {...campMangerFormProps} checkValidation={setValidationStep}/>
        },
        {
            title:'פרטי מדריכי המחנה',
            content:<CampInstractions setInstructions={handleInstructions}/>
        },
        {
        title:'הוספת חניכים',
        content:<CampChildrenForm setChildrens={handleChildrens}/>
        },
        {
            title:'ציוות חניכים לקבוצות',
            content:<InstructionsTransfer childrens={childrens} instructions={instructions} setGroups={setGroups}/>
        },
    ]
    


    const next = () => {
  
        setCurrent(current + 1);
    }

    const prev = () =>{
        setCurrent(current - 1);
    }
   async function handleCreateCamp(){
        const camp = {
            camp_name:campName,
            camp_id:campNumber,
            camp_manager:{
                name:managerName,
                id:managerId,
                email:managerEmail,
                phone:managerPhone,
                type:'CAMP_MANAGER'
            },
            groups,
            instructions
        }
      const done = await dispatch(saveCamp(camp));
        if(done){
            message.success('המחנה נשמר בהצלחה');
        }else{
            message.error('אופס! הייתה בעיה בשמירת המחנה יש לפנות למנהל המערכת')
        }
    }

    function checkGeneralValidation(){
        if(campName.length === 0) return false;
        if(campNumber.length === 0) return false;
        return true;
    }

    function handleChildrens(childs){
        setChildrens(childs);
        setValidationStep();
    }

    function handleInstructions(instructions){
        setInstructions(instructions);
        setValidationStep();  
    }
    function checkManagerValidation(){
        const phoneRegex =/^((\+|00)?972\-?|0)(([23489]|[57]\d)\-?\d{7})$/;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(managerName.length === 0){
            message.error('עלייך להזין שם עבור רכז המחנה')
            return false;
        } 
        if(!isValidIsraeliID(managerId)){
          message.error('תעודת זהות אינה תקינה');
          return false;
        } 
        if(!phoneRegex.test(managerPhone)){
            message.error('מספר הטלפון אינו תקין')
            return false;
        } 
        if(!emailRegex.test(String(managerEmail).toLocaleLowerCase())){
            message.error('האימייל שהזנת אינו תקין');
            return false;
        } 
        return true;
        
    }

    function isValidIsraeliID(id) {
        var id = String(id).trim();
        if (id.length > 9 || id.length < 5 || isNaN(id)) return false;
    
        // Pad string with zeros up to 9 digits
          id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    
          return Array
                .from(id, Number)
                  .reduce((counter, digit, i) => {
                    const step = digit * ((i % 2) + 1);
                    return counter + (step > 9 ? step - 9 : step);
                }) % 10 === 0;
    }

    function checkInstructionValidation(){
        return !!instructions.length;
    }

    function checkChildrenValidation(){
        return !!childrens.length;
    }
    function checkGroupingValidation(){
        return !!groups.length;
    }
    function setValidationStep(){
        let valid = false;
        switch(current){
            case 0:
                valid = checkGeneralValidation()
                break;
            case 1:
                valid = checkManagerValidation()
                break;
            case 2:
                valid = checkInstructionValidation()
                break;
            case 3:
                valid = checkChildrenValidation();
                break;
            case 4:
                valid = checkGroupingValidation();
                break;
            case 5:
                valid = true;
                break;
            default:
                valid = false;
                break;
        }
        console.log({valid});
        if(valid){
            setValidateStep(current);
        }
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
          <Button type="primary" disabled={!(validateStep === current)} onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleCreateCamp}>
            צור מחנה
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