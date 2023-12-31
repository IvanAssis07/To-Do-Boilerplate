import { AccountCircle } from '@mui/icons-material';
import { Box, Button, Container, Menu } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILayoutProps } from '/imports/typings/BoilerplateDefaultTypings';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuItem from '@mui/material/MenuItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { appTopMenuStyle } from './AppTopMenuStyle';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';

export const AppTopMenu = (props: ILayoutProps) => {
	const { user, showDrawer, showWindow, theme, themeOptions } = props;

	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<Object | null>(null);
	const open = Boolean(anchorEl);

	const openPage = (url: string) => () => {
		handleClose();
		navigate(url);
	};

	const viewProfile = () => {
		handleClose();
		showDrawer && showDrawer({ title: 'Usuário', url: `/userprofile/view/${user._id}` });
	};

	const viewProfileMobile = () => {
		handleClose();
		showWindow && showWindow({ title: 'Usuário', url: `/userprofile/view/${user._id}` });
	};

	const handleMenu = (event: React.SyntheticEvent) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box
			sx={{
				width: '100%',
				backgroundColor: theme.palette.primary.main,
				borderBottom: 1,
				borderBottomColor: theme.palette.secondary.contrastText
			}}>
			<Container
				sx={{
					width: '100%',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: 60,
					maxHeight: 60
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						marginLeft: 2
					}}>
					<Button id="newUser" variant={'text'} color={'onPrimary'} onClick={() => navigate('/')}>
						<HomeSharpIcon fontSize="large" />
						<h2>
							<span>ToDos List</span>
						</h2>
					</Button>
				</Box>
				<Button
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleMenu}
					color="inherit"
					id="Perfil"
					sx={appTopMenuStyle.containerAccountCircle}>
					<>
						<AccountCircle id="Perfil" name="Perfil" style={appTopMenuStyle.accountCircle} />
						<ArrowDropDownIcon
							style={{
								color: theme.palette.primary.contrastText,
								width: 17
							}}
						/>
					</>
				</Button>
				<Menu
					id="menu-appbar"
					anchorEl={anchorEl as Element}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left'
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left'
					}}
					open={open}
					onClose={handleClose}>
					{!user || !user._id
						? [
								<MenuItem sx={appTopMenuStyle.menuItem} key={'signin'} onClick={openPage('/signin')}>
									Entrar
								</MenuItem>
						  ]
						: [
								<MenuItem sx={appTopMenuStyle.menuItem} key={'userprofile'} onClick={viewProfile}>
									{user.username || 'Editar'}
								</MenuItem>,
								<MenuItem sx={appTopMenuStyle.menuItem} key={'signout'} onClick={openPage('/signout')}>
									<ExitToAppIcon fontSize="small" /> Sair
								</MenuItem>
						  ]}
				</Menu>
			</Container>
		</Box>
	);
};
