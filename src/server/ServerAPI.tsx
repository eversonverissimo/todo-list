import { ToDoItemType } from '@components/ToDoItemCard';
import { NoParamCallback, readdir, writeFile, unlink } from 'fs';
import { readFile } from 'fs/promises';

const DB_URL:string = "/home/node/db-fs";

export default class ServerAPI {

    static getItems() {

        return new Promise((resolve, reject) => {
    
            readdir(DB_URL, (err, files) => {
                if (err){
                    reject(err);
                    return;
                }
    
                const promises:Promise<any>[] = [];
                const items:ToDoItemType[] = [];
                files.forEach(fileName => {
                    if (fileName && fileName.startsWith('td_')){
                        promises.push(readFile(`${DB_URL}/${fileName}`).then((data:any) => {
                            items.push(JSON.parse(data));
                            }).catch((err:any) => {
                                reject(err);
                            })
                        );
                    }
                });
    
                Promise.all(promises).then(()=>{
                    resolve(items.sort((itemA, itemB) => itemA.id - itemB.id));
                });
            });
    
        });
    
    }
    
    static getItem(id:number) {
    
        return new Promise((resolve, reject) => {
            readFile(`${DB_URL}/td_${id}.json`).then((data:any) => {
                resolve(JSON.parse(data));
                }).catch((err:any) => {
                    reject(err);
                });
        });
    
    }
    
    static saveItem(item:ToDoItemType, callback:NoParamCallback) {
    
        writeFile(`${DB_URL}/td_${item.id}.json`, JSON.stringify(item), callback);
    }
    
    static deleteItem(id:number, callback:NoParamCallback) {
    
        unlink(`${DB_URL}/td_${id}.json`, callback);
    }
    
}