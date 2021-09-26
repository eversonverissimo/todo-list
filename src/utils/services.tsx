import { ToDoItemType } from '@components/ToDoItemCard';
import Axios from 'axios'

export const getItems = () => Axios.get<ToDoItemType[]>('/api/items');
export const getItem = (id:number) => Axios.get<ToDoItemType[]>(`/api/item?id=${id}`);
export const saveItem = (item:ToDoItemType) => Axios.post('/api/item/save', item);
export const deleteItem = (id:number) => Axios.delete(`/api/item/delete?id=${id}`);
