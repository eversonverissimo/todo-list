import { useState, useContext } from "react";
import Status from "@utils/enums";
import { ToDoListContext } from "@utils/contexts";
import { isLate } from "@utils/helper";
import { Card, IconButton } from "@mui/material";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@material-ui/icons";
import ToDoItemCardHeader from "./ToDoItemCardHeader";
import styles from "./ToDoItemCard.module.css";

export type ToDoItemType = {
    content: string,
    dueDate?: string | null,
    status: Status,
    id: number
}

export default function ToDoItemCard(item:ToDoItemType) {

    const [curItem, setCurItem] = useState(item);
    const {saveItem} = useContext(ToDoListContext);

    const onStatusChange = () => {
        const item = {
            ...curItem,
            status: curItem.status == Status.DONE ? 
                (isLate(curItem.dueDate) ? Status.LATE : Status.UNFINISHED) : Status.DONE
        };
        setCurItem(item);
        saveItem(item);
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
            <ToDoItemCardHeader {...curItem} />
        </Card>
    );
}
