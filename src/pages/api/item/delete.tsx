import { NextApiRequest, NextApiResponse } from "next";
import ServerAPI from "@server/ServerAPI";

const deleteItem = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'DELETE') {
        return res.status(400).send('Invalid HTTP method');
    }

    const {id} = req.query;
    ServerAPI.deleteItem(Number(id), err => {
        if (err){
            res.send("Your request was invalid, please try again");
        }
        res.send("Your request was successfully processed");
    });
};

export default deleteItem;