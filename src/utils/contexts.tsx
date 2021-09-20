import { ToDoItemType } from "@components/ToDoItemCard";
import React from "react";

let items:ToDoItemType[] = []
export const ToDoListContext = React.createContext({
    items: items,
    updateItemList: (list:ToDoItemType[]) => {},
    deleteItem: (idx:number) => {},
    addItem: (content:string) => {}
});