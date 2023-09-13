import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import CheckedCircleIcon from '@mui/icons-material/CheckCircleOutline';
import UncheckedCircleIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Container>
        <h1>Olá, "nome do usuário"</h1>
        <p>Seus projetos muito mais organizados.</p>
        <h3>Atividades recentes</h3>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Divider />
          <ListItem>
            <Checkbox sx={{ fontSize: 30 }} icon={<UncheckedCircleIcon />} checkedIcon={<CheckedCircleIcon />} />
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem>
            <Checkbox sx={{ fontSize: 30 }} icon={<UncheckedCircleIcon />} checkedIcon={<CheckedCircleIcon />} />
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem>
            <Checkbox sx={{ fontSize: 30 }} icon={<UncheckedCircleIcon />} checkedIcon={<CheckedCircleIcon />} />
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem>
            <Checkbox sx={{ fontSize: 30 }} icon={<UncheckedCircleIcon />} checkedIcon={<CheckedCircleIcon />} />
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem>
            <Checkbox sx={{ fontSize: 30 }} icon={<UncheckedCircleIcon />} checkedIcon={<CheckedCircleIcon />} />
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        </List>
        <Box 
          sx={{
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Button 
            id="submit" 
            variant={'contained'} 
            color={'primary'}
            onClick={() => navigate('/toDos')}  
          >
            Minhas tarefas
          </Button>
        </Box>
      </Container>
    </>
  )
};

export default Home;
