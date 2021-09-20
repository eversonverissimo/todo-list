import { Button, Card, CardContent, Checkbox, Fab, Stack, TextField, Typography } from "@mui/material";
import styles from "./ToDoItemEditCard.module.css"
import React, { useState } from "react";
import Link from "next/link"
import { ToDoItemType } from "@components/ToDoItemCard";
import Status from "@utils/enums";
import { isLate } from "@utils/helper";
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Moment } from "moment";

export default function ToDoItemEditCard(item:ToDoItemType) {

    const [content, setContent] = useState(item.content);
    const [dueDate, setDueDate] = useState(item.dueDate);
    const [status, setStatus] = useState(item.status);

    const onEdit = () => {

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
        date && setDueDate(date.format('MM/DD/YYYY'))
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
                        onKeyDown={handleEnterPress}
                        value={content} onChange={handleTextChange}
                        className={styles.textInput} id="standard-basic" label="Content" variant="standard" />
                    
                    <DesktopDatePicker
                        label="Due Date"
                        inputFormat="MM/DD/yyyy"
                        value={dueDate}
                        onChange={handleCalendarChange}
                        renderInput={(params) => <TextField {...params} className={styles.dateInput} variant="standard" />}
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
                            <Link href='/'>Cancel</Link>
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </LocalizationProvider>
    );
}