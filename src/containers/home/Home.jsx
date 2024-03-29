import React, { useEffect, useState } from 'react';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector, batch } from 'react-redux';
import { PERMISSIONS, MODAL_TYPES } from '../../common/constants';
import {
  BLUE_CARD,
  ORANGE_CARD,
  PRIMARY,
  SECONDARY,
  YELLOW_CARD,
} from '../../common/styles/colors';
import HeaderPage from '../../components/header-page/HeaderPage';
import Task from '../../components/task/Task';
import {
  getDailyByDate,
  deletedTask,
  editTaskAction
} from '../../data/modules/schedule/schedule.action';
import {
  ContentStyled,
  HomeStyled,
  EmptyStyled,
  SelectionContainer,
} from './Home.styled';
import { getAllCamps } from '../../data/modules/camp/camp.action';
import {
  setModalState,
  closeModal,
} from '../../data/modules/modal/modal.actions';
import DeleteTaskModal from '../../components/modal/modals-content/DeleteTaskModal';
import EditTaskModal from '../../components/modal/modals-content/EditTaskModal'

const { Option } = Select;

export default function Home({ history }) {
  const { selectedDailyCalander } = useSelector(({ schedule }) => schedule);
  const { activeUser } = useSelector(({ auth }) => auth);
  const { camps } = useSelector(({ camp }) => camp);
  const [selectedCampId, setSelectedCampId] = useState('');
  const [currentDay, setCurrentDay] = useState(null);
  const dispatch = useDispatch();
  const colors = [PRIMARY, BLUE_CARD, ORANGE_CARD, YELLOW_CARD];
  const allowedToEdit = [PERMISSIONS.ADMIN, PERMISSIONS.GENERAL_MANAGER];
  useEffect(() => {
    const now = moment(+new Date()).format('YYYY-MM-DD');
    dispatch(getAllCamps());
    setCurrentDay(currentDay || now);
    console.log({activeUser});
    if(activeUser?.role === 1){
      setSelectedCampId(activeUser?.campId);
    }
    if (!allowedToEdit.includes(activeUser.role)) {
      getCampIdByUserRole();
    }
  }, []);

  useEffect(() => {
    if (!!selectedCampId && currentDay) {
      dispatch(getDailyByDate(selectedCampId, currentDay));
      return;
    }
  }, [selectedCampId, currentDay, selectedDailyCalander?.tasks?.length]);

  function getCampIdByUserRole() {
    if (!allowedToEdit.includes(activeUser?.role)) {
      setSelectedCampId(activeUser?.campId);
    } 
  }

  function currentDateChanged(date, dateString) {
    setCurrentDay(dateString);
  }

  function renderDailyScheduleSelection() {
    return !!activeUser &&
      currentDay &&
      allowedToEdit.includes(activeUser.role) ? (
      <SelectionContainer>
        <DatePicker
          defaultValue={moment(currentDay, 'YYYY-MM-DD')}
          style={{
            width: '15rem',
            display: 'flex',
            alignSelf: 'center',
            marginTop: '2rem',
            marginBottom: '1rem',
          }}
          onChange={currentDateChanged}
        />
        <Select
          allowClear
          style={{ width: '100%', marginBottom: '1.5rem' }}
          placeholder={'בחר מחנה'}
          onChange={(campId) => setSelectedCampId(campId)}
        >
          {camps?.map((camp) => (
            <Option key={camp?.camp_id}>{camp?.camp_name}</Option>
          ))}
        </Select>
      </SelectionContainer>
    ) : (
      <HeaderPage
        title={currentDay}
        size={1.2}
        color={PRIMARY}
        style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
      />
    );
  }

  const EmptyTask = () => (
    <EmptyStyled>
      <HeaderPage title={'לא קיימת פעילות ביום זה'} size={1.6} />
    </EmptyStyled>
  );

  async function deleteTask(taskId) {
    batch(async () => {
      await dispatch(
        deletedTask(selectedDailyCalander, taskId, selectedCampId)
      );
      dispatch(closeModal());
    });
  }
  function editTask(date, taskId) {
    console.log({ date, taskId, selectedCampId });
  }
  function deleteTaskHandler(taskId) {
    const { title } = selectedDailyCalander.tasks.find((t) => t.id === taskId);

    dispatch(
      setModalState({
        type: MODAL_TYPES.DANGER,
        isVisible: true,
        content: (
          <DeleteTaskModal
            taskName={title}
            onTaskDelete={() => deleteTask(taskId)}
            onCancel={() => dispatch(closeModal())}
          />
        ),
        onCancel: () => dispatch(closeModal()),
      })
    );
  }

  function editTaskHandler(task) {
    console.log({task});
    dispatch(
      setModalState({
        type: MODAL_TYPES.EDIT,
        isVisible: true,
        content: <EditTaskModal task={task} handleSubmit={(values) => handleEditSubmit(values,task)}/>,
        onCancel: () => dispatch(closeModal()),
        onOk: () => editTask(currentDay, task.id),
      })
    );
  }

  function handleEditSubmit(values,task){
    const newValues = {
      ...values,
      timeRange: values.timeRange.map(time => moment(time).format('HH:mm').toString())
    }
    const index = task.id - 1;
    dispatch(editTaskAction(selectedCampId,currentDay,index,newValues));
    dispatch(closeModal());
    
  }

  console.log({selectedCampId});

  return (
    <HomeStyled>
      <HeaderPage title={'- הלוז היומי -'} size={1.6} color={SECONDARY} />
      {renderDailyScheduleSelection()}
      <ContentStyled>
        {selectedDailyCalander?.tasks?.length ? (
          selectedDailyCalander.tasks.map((task, index) => (
            <Task
              editTask={(task) => editTaskHandler(task)}
              deleteTask={() => deleteTaskHandler(task.id)}
              allowedActions={allowedToEdit.includes(activeUser.role)}
              background={colors[index % colors.length]}
              task={task}
            />
          ))
        ) : (
          <EmptyTask />
        )}
      </ContentStyled>
    </HomeStyled>
  );
}
