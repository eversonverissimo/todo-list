import { NextApiRequest, NextApiResponse } from "next";
import { ToDoItemType } from "@components/ToDoItemCard";
import ServerAPI from "@server/ServerAPI";

const getItem = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'GET') {
        return res.status(400).send('Invalid HTTP method');
    }

    try {
        const {id} = req.query;
        const item:ToDoItemType = await ServerAPI.getItem(Number(id)) as ToDoItemType;
        res.send(item);
    }
    catch(err){
        res.send("Your request was invalid, please try again");
    }
};

export default getItem;