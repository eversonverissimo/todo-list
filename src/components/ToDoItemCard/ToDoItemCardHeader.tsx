import { useContext } from "react";
import Router from 'next/router';
import moment from "moment"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EventIcon from '@material-ui/icons/Event';
import { CardHeader, IconButton, Typography } from "@mui/material";
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ToDoListContext } from "@utils/contexts";
import { ToDoItemType } from ".";
import styles from "./ToDoItemCard.module.css"

export default function ToDoItemCardHeader(item:ToDoItemType) {
    const {deleteItem} = useContext(ToDoListContext);
    const redirect = () => {
        Router.push(`/item/${item.id}`);
    }
    
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <CardHeader
                className={styles.cardHeader}
                action={
                    <>
                        <IconButton onClick={() => deleteItem(item.id)}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                        <IconButton onClick={redirect}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </>
                }
                title={
                    <Typography fontSize={14} marginBottom="5px" >
                        {item.content}
                    </Typography>
                }
                subheader={
                    <Typography fontSize={14} color="text.secondary">
                        {item.dueDate && 
                        <>
                            <EventIcon className={`${styles.eventIcon} ${item.dueDate ? styles.alwaysShow : ''}`}
                                fontSize="small">
                            </EventIcon>
                            {moment(item.dueDate).format("MM/DD/YYYY")}
                        </>
                        }
                    </Typography>
                }
            />
        </LocalizationProvider>
    );
}