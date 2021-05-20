import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactStyled, ListStyled } from './Contact.styled';
import { SearchContainer } from '../../common/styles/common.styled';
import HeaderPage from '../../components/header-page/HeaderPage';
import { SECONDARY } from '../../common/styles/colors';
import ContactListItem from './ContactItem';
import { PERMISSIONS } from '../../common/constants';
import {getAllContacts,getCampContacts,getEmployeesContacts,getGroupContacts,getTransportContacts} from '../../data/modules/contact/contact.actions';
import {Input} from 'antd';
const {Search} = Input;

export default function ContactList({}){

    const dispatch = useDispatch();
    const { contacts } = useSelector(({contact}) => contact);
    const { activeUser } = useSelector(({auth}) => auth);
    const [contactArray,setContact] = useState([]);


    useEffect(() => {
        getContactsByRole();
    },[]);

    useEffect(() => {
       if(!contactArray.length){
        setContact(contacts);
       }
    },[contacts]);

    function searchHandler(value){
        if(value === ''){
            setContact(contacts);
            return;
        }
        const filteredContacts = contacts.filter(contact => contact.name?.startsWith(value) || contact.childrenName?.startsWith(value))
        setContact(filteredContacts);
    }
    console.log({contacts});
    function getContactsByRole(){
        switch(activeUser.role){
            case PERMISSIONS.PARENT:
                dispatch(getEmployeesContacts())
            break;
            case PERMISSIONS.INSTRUCTION:
                dispatch(getGroupContacts(activeUser.campId,activeUser.id))
                break;
            case PERMISSIONS.TRANSPORT_MANAGER:
                dispatch(getTransportContacts(activeUser.transportId))
                break;
            case PERMISSIONS.CAMP_MANAGER:
                dispatch(getCampContacts(activeUser.campId));
                break;
            case PERMISSIONS.GENERAL_MANAGER:
            case PERMISSIONS.ADMIN:
                dispatch(getAllContacts());
                break;
            default:
             console.log('role not mapped');
        }
    }

    function getSortedContacts(){
        if(!contactArray?.length) return [];
        const sortedArray = contactArray.sort((a,b) => (b?.role || 0) - (a?.role || 0));
        return sortedArray;
    }
    return(
        <ContactStyled>
        <HeaderPage  title={'- צור קשר -'} size={1.6} color={SECONDARY}/>
        <SearchContainer>
            <Search onChange={e => searchHandler(e.target.value)} placeholder={'חיפוש'} onSearch={searchHandler} style={{width:'100%',minWidth:'100%'}}/>
        </SearchContainer>
            <ListStyled>
            {getSortedContacts().map(({type,phone,name,childrenName,familyName},index) => (
                <ContactListItem type={type} phone={phone} name={name || childrenName + ' ' + familyName} key={index}/>
            ))}
            </ListStyled>
        </ContactStyled>
    )
}