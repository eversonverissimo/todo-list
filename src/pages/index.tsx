import {useState} from 'react'
import PageWrapper from '@components/PageWrapper'
import ToDoList from '@components/ToDoList'
import {ToDoListContext} from '@utils/contexts'
import Status from "@utils/enums";
import { ToDoItemType } from "@components/ToDoItemCard";
import { InferGetStaticPropsType } from 'next';

export default function Home(props:InferGetStaticPropsType<typeof getStaticProps>) {

  const [items, setItems] = useState<ToDoItemType[] | []>(props.items);

  const deleteItem = (idx:number) => {
    const temp = [...items];
    temp.splice(idx, 1);
    setItems(temp);
  }

  const addItem = (content:string) => {
    const maxId = Math.max.apply(Math, items.map(function(o) { return o.id; }))

    setItems([...items,
      {content: content, status: Status.UNFINISHED, id: maxId+1}
    ]);
  }

  return (
    <PageWrapper title="Your To Do items" description="A list of to do items">
      <ToDoListContext.Provider
        value={{items: items, updateItemList: setItems, deleteItem: deleteItem, addItem: addItem}}>
        <ToDoList />
      </ToDoListContext.Provider>
    </PageWrapper>
  )
}

export const getStaticProps = async() => {

  const items:ToDoItemType[] = [
    { content: "Unfinished On Time", dueDate: "10/20/2021", status: Status.UNFINISHED, id: 1},
    { content: "Unfinished No Date", status: Status.UNFINISHED, id: 2},
    { content: "Unfinished Late", dueDate: "08/12/2021", status: Status.LATE, id: 3},
    { content: "Done", dueDate: "09/05/2021", status: Status.DONE, id: 4},
  ];

  return {
    props: {
      items
    }
  };
}