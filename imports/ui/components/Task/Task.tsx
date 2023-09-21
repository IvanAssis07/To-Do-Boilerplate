import React, { useState } from 'react';
import { IToDos } from '../../../modules/toDos/api/toDosSch';
import { useNavigate, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import CheckedCircleIcon from '@mui/icons-material/CheckCircleOutline';
import UncheckedCircleIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { toDosApi } from '/imports/modules/toDos/api/toDosApi';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { showNotification } from '../../GeneralComponents/ShowNotification';
import { IDefaultDetailProps } from '/imports/typings/BoilerplateDefaultTypings';
import CloseIcon from '@mui/icons-material/Close';
interface ITaskProps extends IDefaultDetailProps {
	task: IToDos & { creatorName: string };
	loggedUserId: string;
}

export const Task = ({ task, loggedUserId, showDeleteDialog, showModal }: ITaskProps) => {
	const navigate = useNavigate();

	const onClick = (id: string | undefined) => {
		// navigate('/toDos/view/' + id);
    showModal && showModal({
      url:`/toDos/view/${id}`, 
      modalOnClose:true,
    });
	};

	const callRemove = (doc: IToDos) => {
		const title = 'Remover exemplo';
		const message = `Deseja remover o exemplo "${doc.name}"?`;
		showDeleteDialog && showDeleteDialog(title, message, doc, remove);
	};

	const remove = (doc: IToDos) => {
		toDosApi.remove(doc, (error: IMeteorError) => {
			if (error) {
				console.log('Error: ', error);
				showNotification({
					type: 'warning',
					title: 'Operação não realizada!',
					description: `Erro ao realizar a operação: ${error.reason}`
				});
			} else {
				showNotification({
					type: 'success',
					title: 'Operação realizada!',
					description: `A tarefa foi removida com sucesso!`
				});
			}
		});
	};

	const [completed, setCompleted] = useState(task.completed);

	const handleCheckBoxClick = () => {
		task.completed = !completed;
    // console.log('Task:', task);
    
		toDosApi.update(task, (e: IMeteorError) => {
      // console.log("Inside update\n",task);
			if (e) {
				console.log('Error: ', e);
				showNotification({
					type: 'warning',
					title: 'Operação não realizada!',
					description: `Erro ao realizar a operação: ${e.reason}`
				});
			} else {
        setCompleted(!completed);
				showNotification({
					type: 'success',
					title: 'Operação realizada!',
					description: `Estado da tarefa alterado com sucesso!`
				});
			}
		});
	};

	return (
		<>
			<Divider />
			<ListItem
        key={task._id}
      >
				<Checkbox
					sx={{ fontSize: 30 }}
					icon={<UncheckedCircleIcon />}
					checkedIcon={<CheckedCircleIcon />}
					checked={completed}
          disabled={loggedUserId !== task.createdby}
					onClick={() => {
						handleCheckBoxClick();
					}}
				/>
				<ListItemIcon>
					<AssignmentIcon />
				</ListItemIcon>
				<ListItemText
					disableTypography
					primary={
						<Typography variant="body2" style={completed ? { textDecoration: 'line-through' } : {}}>
							{task.name}
						</Typography>
					}
					secondary={
						<Typography variant="body2" style={completed ? { textDecoration: 'line-through' } : {}}>
							{task.creatorName}
						</Typography>
					}
				/>
				{task.private === true && <LockPersonIcon sx={{ marginRight: '6px' }} fontSize="small" />}
				{loggedUserId === task.createdby && (
					<IconButton onClick={() => callRemove(task)}>
						<DeleteIcon />
					</IconButton>
				)}
				<IconButton onClick={() => onClick(task._id)}>
					<MoreVertIcon />
				</IconButton>
			</ListItem>
		</>
	);
};
