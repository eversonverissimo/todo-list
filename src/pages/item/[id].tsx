import PageWrapper from '@components/PageWrapper'
import Status from "@utils/enums";
import ToDoItemCard, { ToDoItemType } from "@components/ToDoItemCard";
import { InferGetStaticPropsType } from 'next';
import ToDoItemEditCard from '@components/ToDoItemEditCard';

export default function EditItemPage(props:InferGetStaticPropsType<typeof getStaticProps>) {

  const {item} = props as {item:ToDoItemType};

  return (
    <PageWrapper title="Your To Do items" description="A list of to do items">
      <ToDoItemEditCard {...item} />
    </PageWrapper>
  )
}

type paramsType = {
  params: {
    id: number
  }
}

export async function getStaticPaths() {

  const items:ToDoItemType[] = [
    { content: "Unfinished On Time", dueDate: "10/20/2021", status: Status.UNFINISHED, id: 1},
    { content: "Unfinished No Date", status: Status.UNFINISHED, id: 2},
    { content: "Unfinished Late", dueDate: "08/12/2021", status: Status.LATE, id: 3},
    { content: "Done", dueDate: "09/05/2021", status: Status.DONE, id: 4},
  ];

  const paths = items.map((item) => (
    {params: {id: item.id.toString()}}
  ));

  return { paths, fallback: false }
}

export const getStaticProps = async({ params }:paramsType) => {
  
  const items:ToDoItemType[] = [
    { content: "Unfinished On Time", dueDate: "10/20/2021", status: Status.UNFINISHED, id: 1},
    { content: "Unfinished No Date", status: Status.UNFINISHED, id: 2},
    { content: "Unfinished Late", dueDate: "08/12/2021", status: Status.LATE, id: 3},
    { content: "Done", dueDate: "09/05/2021", status: Status.DONE, id: 4},
  ];

  let item:ToDoItemType = { content: '', status: Status.UNFINISHED, id: 0};
  for(let i = 0; i < items.length; i++){
    if (items[i].id == params.id){
      item = items[i];
    }
  }

  return {
    props: {
      item
    }
  };
}