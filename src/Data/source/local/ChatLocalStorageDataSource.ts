import { FunctionResult } from '../../../CommonTypes/FunctionResult';
import { PublicDialogEntity } from '../../../Domain/entity/PublicDialogEntity';

const listChats: PublicDialogEntity[] = [
  {
    id: '1',
    name: 'Chat 1',
    customData: { todo: '' },
    lastMessage: { dateSent: 0, text: '', userId: 0 },
    ownerId: '',
    photo: '',
    type: 0,
    unreadMessageCount: 0,
    updatedAt: '',
  },
  {
    id: '2',
    name: 'Chat 2',
    customData: { todo: '' },
    lastMessage: { dateSent: 0, text: '', userId: 0 },
    ownerId: '',
    photo: '',
    type: 0,
    unreadMessageCount: 0,
    updatedAt: '',
  },
  {
    id: '3',
    name: 'Chat 3',
    customData: { todo: '' },
    lastMessage: { dateSent: 0, text: '', userId: 0 },
    ownerId: '',
    photo: '',
    type: 0,
    unreadMessageCount: 0,
    updatedAt: '',
  },
  {
    id: '4',
    name: 'Chat 4',
    customData: { todo: '' },
    lastMessage: { dateSent: 0, text: '', userId: 0 },
    ownerId: '',
    photo: '',
    type: 0,
    unreadMessageCount: 0,
    updatedAt: '',
  },
  {
    id: '5',
    name: 'Chat 5',
    customData: { todo: '' },
    lastMessage: { dateSent: 0, text: '', userId: 0 },
    ownerId: '',
    photo: '',
    type: 0,
    unreadMessageCount: 0,
    updatedAt: '',
  },
];
// request to local cash
const listCasheChats: PublicDialogEntity[] = [
  {
    id: '1',
    name: 'Cash Chat 1',
    customData: { todo: '' },
    lastMessage: { dateSent: 0, text: '', userId: 0 },
    ownerId: '',
    photo: '',
    type: 0,
    unreadMessageCount: 0,
    updatedAt: '',
  },
  {
    id: '2',
    name: 'Cash Chat 2',
    customData: { todo: '' },
    lastMessage: { dateSent: 0, text: '', userId: 0 },
    ownerId: '',
    photo: '',
    type: 0,
    unreadMessageCount: 0,
    updatedAt: '',
  },
  {
    id: '3',
    name: 'Chat 3 from Cash',
    customData: { todo: '' },
    lastMessage: { dateSent: 0, text: '', userId: 0 },
    ownerId: '',
    photo: '',
    type: 0,
    unreadMessageCount: 0,
    updatedAt: '',
  },
  {
    id: '4',
    name: 'Chat 4 from Cash',
    customData: { todo: '' },
    lastMessage: { dateSent: 0, text: '', userId: 0 },
    ownerId: '',
    photo: '',
    type: 0,
    unreadMessageCount: 0,
    updatedAt: '',
  },
  {
    id: '5',
    name: 'Chat 5 from Cash',
    customData: { todo: '' },
    lastMessage: { dateSent: 0, text: '', userId: 0 },
    ownerId: '',
    photo: '',
    type: 0,
    unreadMessageCount: 0,
    updatedAt: '',
  },
  {
    id: '6',
    name: 'Chat 6 from Cash',
    customData: { todo: '' },
    lastMessage: { dateSent: 0, text: '', userId: 0 },
    ownerId: '',
    photo: '',
    type: 0,
    unreadMessageCount: 0,
    updatedAt: '',
  },
];
// request preloaded
const preloadedChats: PublicDialogEntity[] = [
  {
    id: '1',
    name: 'Preload Chat 1',
    customData: { todo: '' },
    lastMessage: { dateSent: 0, text: '', userId: 0 },
    ownerId: '',
    photo: '',
    type: 0,
    unreadMessageCount: 0,
    updatedAt: '',
  },
  {
    id: '2',
    name: 'Preload Chat 2',
    customData: { todo: '' },
    lastMessage: { dateSent: 0, text: '', userId: 0 },
    ownerId: '',
    photo: '',
    type: 0,
    unreadMessageCount: 0,
    updatedAt: '',
  },
  {
    id: '3',
    name: 'Preload Chat 3',
    customData: { todo: '' },
    lastMessage: { dateSent: 0, text: '', userId: 0 },
    ownerId: '',
    photo: '',
    type: 0,
    unreadMessageCount: 0,
    updatedAt: '',
  },
];

export function getOne(
  id: number,
): Promise<FunctionResult<PublicDialogEntity>> {
  console.log('StorageDataSource. getOne');
  try {
    const filteredData = listChats.filter((item) => item.id === id.toString());

    console.log(
      `getOne id = ${id}, filtredData = ${JSON.stringify(filteredData)}`,
    );

    return Promise.resolve({
      error: null,
      result: filteredData.length > 0 ? filteredData[0] : [],
    });
  } catch (err) {
    return Promise.resolve({ error: err, result: [] });
  }
}
export function getOneFromCash(
  id: number,
): Promise<FunctionResult<PublicDialogEntity>> {
  console.log('StorageDataSource. getOneFromCash');
  try {
    const filteredData = listCasheChats.filter(
      (item) => item.id === id.toString(),
    );

    console.log(
      `getOneFromCash id = ${id}, filtredData = ${JSON.stringify(
        filteredData,
      )}`,
    );

    return Promise.resolve({
      error: null,
      result: filteredData.length > 0 ? filteredData[0] : [],
    });
  } catch (err) {
    return Promise.resolve({ error: err, result: [] });
  }
}
//
export function getOneFromPreload(
  id: number,
): Promise<FunctionResult<PublicDialogEntity>> {
  console.log('StorageDataSource. getOneFromPreload');
  try {
    const filteredData = preloadedChats.filter(
      (item) => item.id === id.toString(),
    );

    console.log(
      `getOne id = ${id}, filtredData = ${JSON.stringify(filteredData)}`,
    );

    return Promise.resolve({
      error: null,
      result: filteredData.length > 0 ? filteredData[0] : [],
    });
  } catch (err) {
    return Promise.resolve({ error: err, result: [] });
  }
}
//
export function getAll(): Promise<FunctionResult<PublicDialogEntity[]>> {
  console.log('StorageDataSource. getAll');
  try {
    return Promise.resolve({ error: null, result: listChats });
  } catch (err) {
    return Promise.resolve({ error: err, result: [] });
  }
}
export function getAllFromCash(): Promise<
  FunctionResult<PublicDialogEntity[]>
> {
  console.log('StorageDataSource. getAllFromCash');
  try {
    return Promise.resolve({ error: null, result: listCasheChats });
  } catch (err) {
    return Promise.resolve({ error: err, result: [] });
  }
}
//
export function getAllFromPreload(): Promise<
  FunctionResult<PublicDialogEntity[]>
> {
  console.log('StorageDataSource. getAllFromPreload');
  try {
    return Promise.resolve({ error: null, result: preloadedChats });
  } catch (err) {
    return Promise.resolve({ error: err, result: [] });
  }
}
