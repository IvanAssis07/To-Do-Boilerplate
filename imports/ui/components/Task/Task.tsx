import React, { useState, useContext } from 'react';
import { IToDos } from '../../../modules/toDos/api/toDosSch';
import { useNavigate, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

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
import { DialogContainer } from '../../GeneralComponents/DialogContainer';
import { AppContext } from '../../AppGeneralComponents';
interface ITaskProps {
	task: IToDos & { creatorName: string };
	loggedUserId: string | undefined | null;
}


export const Task = ({ task, loggedUserId }: ITaskProps) => {
	const onClick = (id: string | undefined) => {
		navigate('/toDos/view/' + id);
	};


  const appContext = useContext(AppContext);

  const callRemove = (doc: IToDos) => {
    const title = 'Remover exemplo';
		const message = `Deseja remover o exemplo "${doc.name}"?`;
    appContext.showDeleteDialog(title, message, doc, remove);
  }

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
  }

	const [completed, setCompleted] = useState(task.completed);

	const navigate = useNavigate();

	return (
		<>
			<Divider />
			<ListItem>
				{task.completed === true ? (
					<Checkbox
						sx={{ fontSize: 30 }}
						icon={<UncheckedCircleIcon />}
						checkedIcon={<CheckedCircleIcon />}
						onClick={() => setCompleted(!completed)}
					/>
				) : (
					<Checkbox
						sx={{ fontSize: 30 }}
						icon={<UncheckedCircleIcon />}
						checkedIcon={<CheckedCircleIcon />}
						onClick={() => setCompleted(!completed)}
					/>
				)}

				<ListItemIcon>
					<AssignmentIcon />
				</ListItemIcon>
				<ListItemText primary={task.name} secondary={task.creatorName} />
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
