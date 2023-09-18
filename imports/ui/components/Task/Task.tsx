import React from 'react';
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

interface ITaskProps {
	task: IToDos & { nomeUsuario: string };
  remove: (doc: IToDos) => void;
}

export const Task = ({ task, remove }: ITaskProps) => {
  const onClick = (id: string | undefined) => {
    navigate('/toDos/view/' + id);
  };

  const navigate = useNavigate();
  
  return (
    <>
      <Divider />
      <ListItem>
        <Checkbox sx={{ fontSize: 30 }} icon={<UncheckedCircleIcon />} checkedIcon={<CheckedCircleIcon />} />
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary={task.name} secondary={task.nomeUsuario} />
        <IconButton
          onClick={() => remove(task)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={() => onClick(task._id)}
        >
          <MoreVertIcon />
        </IconButton>
      </ListItem>
    </>
  )
};
