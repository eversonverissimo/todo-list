import { InferGetServerSidePropsType } from 'next';
import PageWrapper from '@components/PageWrapper';
import { ToDoItemType } from "@components/ToDoItemCard";
import ToDoItemEditCard from '@components/ToDoItemEditCard';
import ServerAPI from '@server/ServerAPI';

export default function EditItemPage(props:InferGetServerSidePropsType<typeof getServerSideProps>) {

  const {item} = props as {item:ToDoItemType};

  return (
    <PageWrapper title={item.content} description="Edit your item">
      <ToDoItemEditCard {...item} />
    </PageWrapper>
  )
}

type paramsType = {
  params: {
    id: number
  }
}

export const getServerSideProps = async({ params }:paramsType) => {
  
  const item:ToDoItemType = await ServerAPI.getItem(params.id) as ToDoItemType;

  return {
    props: {
      item
    }
  };
}