import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { toDosApi } from '../../api/toDosApi';
import SimpleForm from '../../../../ui/components/SimpleForm/SimpleForm';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import ToggleSwitchField from '/imports/ui/components/SimpleFormFields/ToggleField/ToggleSwitchField';
import { IToDos } from '../../api/toDosSch';
import { IDefaultContainerProps, IDefaultDetailProps, IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { useTheme } from '@mui/material/styles';
import { showLoading } from '/imports/ui/components/Loading/Loading';
import { toDosDetailStyle } from './style/toDosDetailStyle';
import { useUserAccount } from '/imports/hooks/useUserAccount';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface IToDosDetail extends IDefaultDetailProps {
	toDosDoc: IToDos;
	save: (doc: IToDos, _callback?: any) => void;
}

const ToDosDetail = (props: IToDosDetail) => {
	const { isPrintView, screenState, loading, toDosDoc, save, navigate, closeComponent } = props;

	const theme = useTheme();

	const handleSubmit = (doc: IToDos) => {
		save(doc);
	};

  const { userId: loggedUserId } = useUserAccount();

	return (
    <>
      <IconButton
          aria-label="close"
          onClick={closeComponent}
          sx={toDosDetailStyle.closeButton}
        >
          <CloseIcon />
      </IconButton>
      <SimpleForm
        key={'ExempleDetail-SimpleFormKEY'}
        mode={screenState}
        schema={toDosApi.getSchema()}
        doc={toDosDoc}
        onSubmit={handleSubmit}
        loading={loading}
        >
        <FormGroup key={'fieldsOne'}>
          <TextField sx={ toDosDetailStyle.input } key={'f1-tituloKEY'} placeholder="Nome" name="name" />
          <TextField sx={ toDosDetailStyle.input } key={'f1-descricaoKEY'} placeholder="Descrição" name="description" />
        </FormGroup>
        <FormGroup key={'fieldsTwo'}>
          <ToggleSwitchField key={'f2-tipoKEY'} name="private" />
        </FormGroup>
        <div
          key={'Buttons'}
          style={ toDosDetailStyle.buttonContainer }>
          {!isPrintView ? (
            <Button
              key={'b1'}
              size='medium'
              style={{ marginRight: 10 }}
              onClick={
                screenState === 'edit'
                  ? () => navigate(`/toDos/view/${toDosDoc._id}`)
                  : () => closeComponent && closeComponent()
              }
              color={'secondary'}
              variant="contained">
              {screenState === 'view' ? 'Voltar' : 'Cancelar'}
            </Button>
          ) : null}
          {!isPrintView && screenState === 'view' &&  (loggedUserId === toDosDoc.createdby) ? (
            <Button
              size='medium'
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
            <Button key={'b3'} size='medium' color={'primary'} variant="contained" id="submit">
              {'Salvar'}
            </Button>
          ) : null}
        </div>
      </SimpleForm>
    </>
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
      
			toDosApi[selectedAction]({...doc, completed: false}, (e: IMeteorError, id: string) => {
				if (!e) {
					navigate(`/toDos/view/${screenState === 'create' ? id : doc._id}`);         
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
