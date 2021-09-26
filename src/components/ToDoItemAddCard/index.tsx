import React, { useState } from "react";
import { Card, CardContent, Fab, TextField } from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import styles from "./ToDoItemAddCard.module.css";

type ToDoItemAddCardPropsType = {
    onAddItem: (content:string) => void
}
export default function ToDoItemAddCard({onAddItem}:ToDoItemAddCardPropsType) {

    const [content, setContent] = useState('');

    const onAdd = () => {
        onAddItem && onAddItem(content);
        setContent('');
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.code == 'Enter'){
            onAdd();
        }
    }

    const handleBtnClick = () => {
        onAdd();
    }

    return (
        <Card className={styles.card}>
            <CardContent>
                <TextField
                    onKeyDown={handleEnterPress}
                    value={content} onChange={handleTextChange}
                    className={styles.textInput} id="standard-basic" label="Add new item" variant="standard" />
                <Fab onClick={handleBtnClick}
                    color="primary" aria-label="add" size="small" disabled={!content}>
                    <AddIcon />
                </Fab>
            </CardContent>
        </Card>
    );
}