import { NextApiRequest, NextApiResponse } from "next";
import { ToDoItemType } from "@components/ToDoItemCard";
import ServerAPI from "@server/ServerAPI";

const getItems = async (req: NextApiRequest, res: NextApiResponse) => {

  const items:ToDoItemType[] = await ServerAPI.getItems() as ToDoItemType[];
  res.send(items);
};

export default getItems;