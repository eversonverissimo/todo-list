import { useState, useEffect } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { ToDoListContext } from '@utils/contexts'
import Status from "@utils/enums";
import { deleteItem, getItems, saveItem } from '@utils/services';
import { ToDoItemType } from "@components/ToDoItemCard";
import PageWrapper from '@components/PageWrapper'
import ToDoList from '@components/ToDoList'
import ServerAPI from '@server/ServerAPI';

export default function Home(props:InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [items, setItems] = useState<ToDoItemType[] | []>(props.items);

  const deleteItemFromList = (id:number) => {

    const idx = items.findIndex(item => item.id == id);
    if (idx >= 0){
      const curItem = items[idx];
      const temp = [...items];
      temp.splice(idx, 1);
      setItems(temp);
      deleteItem(curItem.id);
    }
  }

  const addItemToList = (content:string) => {
    const newId =items && items.length > 0 ? (Math.max.apply(Math, items.map(function(o) { return o.id; })) || 0) + 1 : 1;
    const newItem:ToDoItemType = {content: content, id: newId, status: Status.UNFINISHED};
    saveItem(newItem);

    setItems([...items,
      {content: content, status: Status.UNFINISHED, id: newId}
    ]);
  }

  return (
    <PageWrapper title="Your To Do items" description="A list of to do items">
      <ToDoListContext.Provider
        value={{items: items, updateItemList: setItems, deleteItem: deleteItemFromList, addItem: addItemToList, saveItem: saveItem}}>
        <ToDoList />
      </ToDoListContext.Provider>
    </PageWrapper>
  )
}

export const getServerSideProps = async() => {

  const items:ToDoItemType[] = await ServerAPI.getItems() as ToDoItemType[];

  return {
    props: {
      items
    }
  };
}