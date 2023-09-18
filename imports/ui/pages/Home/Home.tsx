import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { toDosApi } from '../../../modules/toDos/api/toDosApi';
import { IConfigList } from '../../../../imports/typings/IFilterProperties';
import { IToDos } from '../../../modules/toDos/api/toDosSch';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Task } from '../../components/Task/Task';

const Home = () => {
	const tasks: (IToDos & { creatorName: string })[] | undefined = useTracker(() => {
		const subHandle = toDosApi.subscribe(
			'toDosList',
			{},
			{
				limit: 5,
				sort: { createdat: -1 }
			}
		);

		if (subHandle) {
			const tasks = toDosApi.find({}).fetch();
      
			return tasks;
		}
	}, []);

	const navigate = useNavigate();

	return (
		<>
			<Container>
				<h1>Olá, "nome do usuário"</h1>
				<p>Seus projetos muito mais organizados.</p>
				<h3>Atividades recentes</h3>
				{tasks && (
					<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
						{tasks.map((item: IToDos, index: number) => (
							<Task key={index} task={item} remove={() => {}} />
						))}
					</List>
				)}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center'
					}}>
					<Button id="submit" variant={'contained'} color={'primary'} onClick={() => navigate('/toDos')}>
						Minhas tarefas
					</Button>
				</Box>
			</Container>
		</>
	);
};

export default Home;
