// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useContext, useEffect, useState } from 'react';
import { NavigateFunction, useLocation } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import Container from '@mui/material/Container';
import TextField from '../../../ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';

import { signinStyle } from './SigninStyle';
import { Box } from '@mui/material';
import { FixedMenuLayoutContext } from '../../layouts/FixedMenuLayout';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';

interface ISignIn {
	showNotification: (options?: Object) => void;
	navigate: NavigateFunction;
	user: IUserProfile;
}

export const SignIn = (props: ISignIn) => {
	const [redirectToReferer, setRedirectToReferer] = useState(false);

	const location = useLocation();

	const { handleExibirAppBar, handleOcultarAppBar } = useContext(FixedMenuLayoutContext);

	const { showNotification, navigate, user } = props;

	useEffect(() => {
		handleOcultarAppBar();
		return () => handleExibirAppBar();
	}, []);

	const handleSubmit = (doc: { email: string; password: string }) => {
		const { email, password } = doc;
		Meteor.loginWithPassword(email, password, (err: any) => {
			if (err) {
				showNotification({
					type: 'warning',
					title: 'Acesso negado!',
					description:
						err.reason === 'Incorrect password'
							? 'Email ou senha inválidos'
							: err.reason === 'User not found'
							? 'Este email não está cadastrado em nossa base de dados.'
							: ''
				});
			} else {
				showNotification({
					type: 'sucess',
					title: 'Acesso autorizado!',
					description: 'Login de usuário realizado em nossa base de dados!'
				});
				setRedirectToReferer(true);
			}
		});
	};

	React.useEffect(() => {
		if (!!user && !!user._id) navigate('/');
	}, [user]);

	React.useEffect(() => {
		if (location.pathname === '/signout') navigate('/signin');
	}, [location.pathname]);

	return (
		<>
			<Container sx={signinStyle.containerSignIn}>
				<Box sx={signinStyle.subContainerSignIn}>
					<Box>
						<h3 style={signinStyle.labelAccessSystem}>
							<img src="/images/wireframe/logo.png" style={signinStyle.imageLogo} />
							<span>Boas-vindas a sua lista de tarefas.</span>
							<span>Insira o seu e-mail e senha para efetuar o login:</span>
						</h3>
						<SimpleForm
							schema={{
								email: { type: 'String', label: 'Email', optional: false },
								password: { type: 'String', label: 'Senha', optional: false }
							}}
							onSubmit={handleSubmit}>
							<Box>
								<TextField
									sx={signinStyle.input}
									label="Email"
									fullWidth={true}
									name="email"
									type="email"
									placeholder="Digite seu email"
								/>
								<TextField
									label="Senha"
									fullWidth={true}
									name="password"
									placeholder="Digite sua senha"
									type="password"
								/>
								<Box sx={signinStyle.containerButtonOptions}>
									<Button id="submit" variant={'contained'} color={'primary'}>
										Entrar
									</Button>
								</Box>
							</Box>
						</SimpleForm>
						<Box style={signinStyle.containerRouterSignUp}>
							<Button
								id="forgotPassword"
								variant={'text'}
								color={'secondary'}
								onClick={() => navigate('/password-recovery')}>
								Esqueceu sua senha? Clique aqui
							</Button>
						</Box>
						<Box>
							<Button id="newUser" variant={'text'} color={'secondary'} onClick={() => navigate('/signup')}>
								É novo por aqui? Cadastre-se
							</Button>
						</Box>
					</Box>
				</Box>
			</Container>
		</>
	);
};
