import { useContext } from "react";
import {ToDoListContext} from '@utils/contexts';
import { SentimentDissatisfied } from "@material-ui/icons";
import { Typography } from "@mui/material";
import ToDoItemAddCard from "@components/ToDoItemAddCard";
import ToDoItemCard, { ToDoItemType } from "@components/ToDoItemCard";

export default function ToDoList() {
    const {items, addItem} = useContext(ToDoListContext);

    return (
        <div className="to-do-list-wrapper">
            <ToDoItemAddCard onAddItem={addItem} />
            {items && items.length > 0 ? items.map((item:ToDoItemType, idx) =>
                <ToDoItemCard key={`to-do-item-` + item.id} {...item} />
            )
            :
            <Typography color="text.secondary" fontSize={25} align="center">
                No item to be listed
                <div style={{marginTop: 20}}><SentimentDissatisfied /></div>
            </Typography>
            }
        </div>
    );
}