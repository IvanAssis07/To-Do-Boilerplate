// region Imports
import { Recurso } from '../config/Recursos';
import { Meteor } from 'meteor/meteor';
import { toDosSch, IToDos } from './toDosSch';
import { userprofileServerApi } from '/imports/userprofile/api/UserProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
import { IContext } from '/imports/typings/IContext';
import { getUser } from '/imports/libs/getUser';
class ToDosServerApi extends ProductServerBase<IToDos> {
	constructor() {
		super('toDos', toDosSch, {
			resources: Recurso
		});
		// this.beforeUpdate = this.beforeUpdate.bind(this);
    this.beforeRemove = this.beforeRemove.bind(this);

		this.addTransformedPublication(
			'toDosList',
			(filter = {}, optionsPub = {}) => {
				const userId = Meteor.userId();

				if (!userId) {
					return;
				}

				return this.defaultListCollectionPublication(
					{
						...filter,
						$or: [{ private: false }, { private: true, createdby: userId }]
					},
					{
						...optionsPub,
						projection: { name: 1, description: 1, createdby: 1, private: 1, completed: 1 }
					}
				);
			},
			(doc: IToDos & { creatorName: string }) => {
				const userProfileDoc = userprofileServerApi.getCollectionInstance().findOne({ _id: doc.createdby });
				return { ...doc, creatorName: userProfileDoc?.username };
			}
		);

		this.addPublication('toDosDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {});
		});

		this.addRestEndpoint(
			'view',
			(params, options) => {
				console.log('Params', params);
				console.log('options.headers', options.headers);
				return { status: 'ok' };
			},
			['post']
		);

		this.addRestEndpoint(
			'view/:toDosId',
			(params, options) => {
				console.log('Rest', params);
				if (params.toDosId) {
					return self
						.defaultCollectionPublication(
							{
								_id: params.toDosId
							},
							{}
						)
						.fetch();
				} else {
					return { ...params };
				}
			},
			['get']
		);
	}

	// beforeUpdate(docObj: IToDos, context: IContext) {
  //   // console.log("Before update: ", docObj);
    
	// 	const user = getUser();
	// 	if (!docObj.createdby || (user && user._id !== docObj.createdby)) {
	// 		throw new Meteor.Error('Acesso negado', `Vocẽ não tem permissão para alterar esses dados`);
	// 	}

	// 	return super.beforeUpdate(docObj, context);
	// }

  beforeRemove(docObj: IToDos, context: IContext) {
		const user = getUser();
    // console.log(docObj);
    
		if (!docObj.createdby || (user && user._id !== docObj.createdby)) {
			throw new Meteor.Error('Acesso negado', `Vocẽ não tem permissão para alterar esses dados`);
		}

		return super.beforeRemove(docObj, context);
	}
}

export const toDosServerApi = new ToDosServerApi();
