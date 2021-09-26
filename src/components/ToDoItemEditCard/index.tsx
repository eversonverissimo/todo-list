import React, { useState } from "react";
import Link from "next/link"
import { useRouter } from 'next/router';
import Status from "@utils/enums";
import { isLate } from "@utils/helper";
import { saveItem } from "@utils/services";
import { ToDoItemType } from "@components/ToDoItemCard";
import moment, { Moment } from "moment";
import AdapterMoment from '@mui/lab/AdapterMoment';
import { LocalizationProvider, DesktopDatePicker} from '@mui/lab';
import { Button, Card, CardContent, Checkbox, Stack, TextField, Typography } from "@mui/material";
import styles from "./ToDoItemEditCard.module.css"

const HOME_URL = '/';

export default function ToDoItemEditCard(item:ToDoItemType) {

    const router = useRouter();
    const [content, setContent] = useState(item.content);
    const [dueDate, setDueDate] = useState(item.dueDate || null);
    const [status, setStatus] = useState(item.status);

    const onEdit = () => {
        saveItem({...item, content: content, dueDate: dueDate, status: status}).then(()=>{
        router.push(HOME_URL);
        }).catch(err=>{
            console.log("An error occurred when trying to edit the item", err);
        });
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.code == 'Enter'){
            onEdit();
        }
    }

    const handleCalendarChange = (date:(Moment | null)) => {
        setDueDate(date ? date.format('MM/DD/YYYY') : null);
        if (status != Status.DONE){
            setStatus(date && isLate(date.format('MM/DD/YYYY')) ? Status.LATE : Status.UNFINISHED);
        }
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked){
            setStatus(Status.DONE);

        } else {
            setStatus(isLate(dueDate) ? Status.LATE : Status.UNFINISHED);
        }
    };

    const handleBtnClick = () => {
        onEdit();
    }

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Card className={styles.card}>
                <CardContent>
                    <TextField
                        required={true}
                        onKeyDown={handleEnterPress}
                        value={content} onChange={handleTextChange}
                        className={styles.textInput} id="standard-basic" label="Content" variant="standard" />
                    
                    <DesktopDatePicker
                        label="Due Date"
                        inputFormat="MM/DD/yyyy"
                        value={dueDate ? moment(dueDate) : null}
                        onChange={handleCalendarChange}
                        renderInput={(params) => 
                            <TextField {...params} className={styles.dateInput} required={false} variant="standard" />}
                    />

                    <Checkbox checked={status == Status.DONE} className={styles.statusCheck} 
                        onChange={handleStatusChange} />
                    <Typography className={styles.statusLabel}>Completed</Typography>

                    <Stack spacing={2} direction="row">
                        <Button onClick={handleBtnClick} className={styles.saveBtn}
                            variant="contained" disabled={!content}>
                            Save
                        </Button>
                        <Button className={styles.saveBtn}
                            variant="outlined" disabled={!content}>
                            <Link href={HOME_URL}>Cancel</Link>
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </LocalizationProvider>
    );
}