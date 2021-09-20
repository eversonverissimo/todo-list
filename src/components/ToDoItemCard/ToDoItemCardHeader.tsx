import styles from "./ToDoItemCard.module.css"
import moment from "moment"
import { Button, CardHeader, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ToDoItemType } from ".";
import Router from 'next/router'
import EventIcon from '@material-ui/icons/Event';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';

type headerPropsType = {
    item: ToDoItemType,
    onDeleteItem: () => void
}

export default function ToDoItemCardHeader({item, onDeleteItem}:headerPropsType) {
    const redirect = () => {
        Router.push(`/item/${item.id}`);
    }
    
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <CardHeader
                className={styles.cardHeader}
                action={
                    <>
                        <IconButton onClick={onDeleteItem}>
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