import styles from "./ToDoItemCard.module.css"
import { Card, IconButton } from "@mui/material";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@material-ui/icons";
import { useState, useContext } from "react";
import ToDoItemCardHeader from "./ToDoItemCardHeader";
import Status from "@utils/enums";
import { ToDoListContext } from "@utils/contexts";
import { isLate } from "@utils/helper";

export type ToDoItemType = {
    content: string,
    dueDate?: string,
    status: Status,
    id: number
}

export default function ToDoItemCard(item:ToDoItemType) {

    const [curItem, setCurItem] = useState(item);
    const {deleteItem} = useContext(ToDoListContext);

    const onStatusChange = () => {
        setCurItem({
            ...curItem,
            status: curItem.status == Status.DONE ? 
                (isLate(curItem.dueDate) ? Status.LATE : Status.UNFINISHED) : Status.DONE
        });
    }
    
    return (
        <Card variant="outlined" className={styles.card}>
            <div className={`${styles.status} ${styles[curItem.status]}`}>
                <IconButton onClick={onStatusChange} className={styles.checkDone}>
                    {curItem.status == Status.DONE ?
                        <CheckBoxOutlined/>:<CheckBoxOutlineBlank />
                    }
                </IconButton>
            </div>
            <ToDoItemCardHeader item={curItem} onDeleteItem={() => deleteItem(curItem.id)} />
        </Card>
    );
}
