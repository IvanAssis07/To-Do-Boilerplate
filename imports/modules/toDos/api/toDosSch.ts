import { IDoc } from '/imports/typings/IDoc';

export const toDosSch = {
    name: {
        type: String,
        label: 'Nome',
        defaultValue: '',
        optional: false,
    },
    description: {
        type: String,
        label: 'Descrição',
        defaultValue: '',
        optional: false,
    },
    type: {
      type: String,
      label: 'Tipo',
      defaultValue: '',
      optional: false,
      options:[
        {value:'pessoal',label:'Pessoal'},
        {value:'publica',label:'Pública'},
      ],
    },
};

export interface IToDos extends IDoc {
    name: string;
    description: string;
    type: string;
}
