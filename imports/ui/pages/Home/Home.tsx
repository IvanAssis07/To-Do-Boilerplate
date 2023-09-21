import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { useUserAccount } from '/imports/hooks/useUserAccount';
import { toDosApi } from '../../../modules/toDos/api/toDosApi';
import { IConfigList } from '../../../../imports/typings/IFilterProperties';
import { IToDos } from '../../../modules/toDos/api/toDosSch';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Task } from '../../components/Task/Task';
import { AppContext } from '../../AppGeneralComponents';

const Home = () => {
	const { userId: loggedUserId, user } = useUserAccount();
  const { showModal, showDeleteDialog, closeComponent } = React.useContext(AppContext);

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
				<h1>Olá, {user?.username}</h1>
				<p>Seus projetos muito mais organizados.</p>
				<h3>Atividades recentes</h3>
				{tasks && (
					<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
						{tasks.map((item: IToDos, index: number) => (
							<Task 
                key={index}
                task={item}
                showDeleteDialog={showDeleteDialog}
                showModal={showModal}
                loggedUserId={loggedUserId}
                closeComponent={closeComponent}
              />
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
