import { NextApiRequest, NextApiResponse } from "next";
import { ToDoItemType } from "@components/ToDoItemCard";
import ServerAPI from "@server/ServerAPI";

const saveItem = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') {
        return res.status(400).send('Invalid HTTP method');
    }

    const item:ToDoItemType = req.body;
    ServerAPI.saveItem(item, err => {
        if (err){
            res.send("Your request was invalid, please try again");
        }
        res.send("Your request was successfully processed");
    });
};

export default saveItem;