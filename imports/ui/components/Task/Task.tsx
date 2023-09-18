import React, { useState } from 'react';
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

interface ITaskProps {
	task: IToDos & { creatorName: string };
	loggedUserId: string | undefined | null;
	remove: (doc: IToDos) => void;
}

export const Task = ({ task, remove, loggedUserId }: ITaskProps) => {
	const onClick = (id: string | undefined) => {
		navigate('/toDos/view/' + id);
	};

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
				{task.type === 'pessoal' && <LockPersonIcon sx={{ marginRight: '6px' }} fontSize="small" />}
				{loggedUserId === task.createdby && (
					<IconButton onClick={() => remove(task)}>
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
