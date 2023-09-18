// region Imports
import { Recurso } from '../config/Recursos';
import { toDosSch, IToDos } from './toDosSch';
import { userprofileServerApi } from '/imports/userprofile/api/UserProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
import { Mongo, MongoInternals } from 'meteor/mongo';
class ToDosServerApi extends ProductServerBase<IToDos> {
    constructor() {
        super('toDos', toDosSch, {
            resources: Recurso,
        });

        const self = this;

        this.addTransformedPublication(
            'toDosList',
            (filter = {} , optionsPub = {}) => {
                return this.defaultListCollectionPublication(filter, {
                    ...optionsPub,
                    projection: { name: 1, description: 1, createdby: 1 },
                });
            },
            (doc: IToDos & { creatorName: string }) => {
                const userProfileDoc = userprofileServerApi
                    .getCollectionInstance()
                    .findOne({ _id: doc.createdby });
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
                            _id: params.toDosId,
                          },
                          {})
                        .fetch();
                } else {
                    return { ...params };
                }
            },
            ['get'],
        );
    }
}

export const toDosServerApi = new ToDosServerApi();
