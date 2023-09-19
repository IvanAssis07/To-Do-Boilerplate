import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { toDosApi } from '../../api/toDosApi';
import SimpleForm from '../../../../ui/components/SimpleForm/SimpleForm';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import SelectField from '../../../../ui/components/SimpleFormFields/SelectField/SelectField';
import ToggleSwitchField from '/imports/ui/components/SimpleFormFields/ToggleField/ToggleSwitchField';
import Print from '@mui/icons-material/Print';
import Close from '@mui/icons-material/Close';
import { PageLayout } from '/imports/ui/layouts/PageLayout';
import { IToDos } from '../../api/toDosSch';
import { IDefaultContainerProps, IDefaultDetailProps, IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { useTheme } from '@mui/material/styles';
import { showLoading } from '/imports/ui/components/Loading/Loading';
import { toDosDetailStyle } from './style/toDosDetailStyle';
import { useUserAccount } from '/imports/hooks/useUserAccount';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface IToDosDetail extends IDefaultDetailProps {
	toDosDoc: IToDos;
	save: (doc: IToDos, _callback?: any) => void;
}

const ToDosDetail = (props: IToDosDetail) => {
	const { isPrintView, screenState, loading, toDosDoc, save, navigate } = props;

	const theme = useTheme();

	const handleSubmit = (doc: IToDos) => {
		save(doc);
	};

  const { userId: loggedUserId } = useUserAccount();

	return (
		<PageLayout
			key={'ExemplePageLayoutDetailKEY'}
			title={
				screenState === 'view' ? 'Visualizar tarefa' : screenState === 'edit' ? 'Editar tarefa' : 'Criar tarefa'
			}
			onBack={() => navigate('/toDos')}
			actions={[
				!isPrintView ? (
					<span
						key={'ExempleDetail-spanPrintViewKEY'}
						style={{
							cursor: 'pointer',
							marginRight: 10,
							color: theme.palette.secondary.main
						}}
						onClick={() => {
							navigate(`/toDos/printview/${toDosDoc._id}`);
						}}>
						<Print key={'ExempleDetail-spanPrintKEY'} />
					</span>
				) : (
					<span
						key={'ExempleDetail-spanNotPrintViewKEY'}
						style={{
							cursor: 'pointer',
							marginRight: 10,
							color: theme.palette.secondary.main
						}}
						onClick={() => {
							navigate(`/toDos/view/${toDosDoc._id}`);
						}}>
						<Close key={'ExempleDetail-spanCloseKEY'} />
					</span>
				)
			]}>
			<SimpleForm
				key={'ExempleDetail-SimpleFormKEY'}
				mode={screenState}
				schema={toDosApi.getSchema()}
				doc={toDosDoc}
				onSubmit={handleSubmit}
				loading={loading}>

				<FormGroup key={'fieldsOne'}>
					<TextField sx={ toDosDetailStyle.input } key={'f1-tituloKEY'} placeholder="Nome" name="name" />
					<TextField sx={ toDosDetailStyle.input } key={'f1-descricaoKEY'} placeholder="Descrição" name="description" />
				</FormGroup>
				{/* <FormGroup key={'fieldsTwo'}>
					<SelectField key={'f2-tipoKEY'} placeholder="Selecione um tipo" name="type" />
				</FormGroup> */}
        <FormGroup key={'fieldsTwo'}>
          <ToggleSwitchField key={'f2-tipoKEY'} name="private"/>
        </FormGroup>
				<div
					key={'Buttons'}
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'left',
						paddingTop: 20,
						paddingBottom: 20
					}}>
					{!isPrintView ? (
						<Button
							key={'b1'}
							style={{ marginRight: 10 }}
							onClick={
								screenState === 'edit'
									? () => navigate(`/toDos/view/${toDosDoc._id}`)
									: () => navigate(`/toDos/list`)
							}
							color={'secondary'}
							variant="contained">
							{screenState === 'view' ? 'Voltar' : 'Cancelar'}
						</Button>
					) : null}

					{!isPrintView && screenState === 'view' &&  (loggedUserId === toDosDoc.createdby) ? (
						<Button
							key={'b2'}
							onClick={() => {
								navigate(`/toDos/edit/${toDosDoc._id}`);
							}}
							color={'primary'}
							variant="contained">
							{'Editar'}
						</Button>
					) : null}
					{!isPrintView && screenState !== 'view' ? (
						<Button key={'b3'} color={'primary'} variant="contained" id="submit">
							{'Salvar'}
						</Button>
					) : null}
				</div>
			</SimpleForm>
		</PageLayout>
	);
};

interface IToDosDetailContainer extends IDefaultContainerProps {}

export const ToDosDetailContainer = withTracker((props: IToDosDetailContainer) => {
	const { screenState, id, navigate, showNotification } = props;

	const subHandle = !!id ? toDosApi.subscribe('toDosDetail', { _id: id }) : null;
	let toDosDoc = id && subHandle?.ready() ? toDosApi.findOne({ _id: id }) : {};

	return {
		screenState,
		toDosDoc,
		save: (doc: IToDos, _callback: () => void) => {
			const selectedAction = screenState === 'create' ? 'insert' : 'update';
      console.log(doc);
      
			toDosApi[selectedAction]({...doc, completed: false}, (e: IMeteorError, r: string) => {
				if (!e) {
					// navigate(`/toDos/view/${screenState === 'create' ? r : doc._id}`);
          navigate('/toDos');
					showNotification &&
						showNotification({
							type: 'success',
							title: 'Operação realizada!',
							description: `O exemplo foi ${doc._id ? 'atualizado' : 'cadastrado'} com sucesso!`
						});
				} else {
					console.log('Error:', e);
					showNotification &&
						showNotification({
							type: 'warning',
							title: 'Operação não realizada!',
							description: `Erro ao realizar a operação: ${e.reason}`
						});
				}
			});
		}
	};
})(showLoading(ToDosDetail));
