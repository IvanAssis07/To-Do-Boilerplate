import { string } from 'prop-types';
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
    private: {
      type: Boolean,
      label: 'Tipo de tarefa',
      defaultValue: false,
      optional: false,
    },
    completed: {
      type: Boolean,
      label: 'Concluída',
      defaultValue: false,
      optional: true,
    },
};

export interface IToDos extends IDoc {
    name: string;
    description: string;
    private: boolean;
    completed: boolean;
}
