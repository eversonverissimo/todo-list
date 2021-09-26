# To Do List
This module allows you to easily add to-do items for you to track your activities, including setting up a due date and marking the activity as done.

## How to run this project
This was built in docker, set up in a docker compose file. It contains two volumes linked inside the project:
1. database: not tracked in git; it's where your items are physically saved.
2. src: the code itself

To run this project, on the root directory, run:
```docker-compose up```.
It will run on production mode by default. On production mode, it will first build the project (generating the pages) and then start the server.

If you want to switch it to dev mode, run instead:
```docker-compose -f docker-compose-dev.yml up```

## The architecture of the project
The architecture is as follows:

### /components
It contains the main components of the project, including a *PageWrapper*, that adds a header, a footer and some tags. The hierarchy is as follows:
1. Home Page: 
```
{
    Page Wrapper: {
        ToDoList: {
            ToDoItemAddCard: {

            },
            ToDoItemCard: {
                ToDoItemCardHeader
            }
        },
    }
}
```

2. Edit Page: 
```
{
    Page Wrapper: {
        ToDoItemEditCard
    }
}
```

### /pages
It contains the home page (index.tsx), the edit page (/item/[id].tsx) and the API to call the server services. The API REST services are:
* GET /api/items: list all items
* GET /api/item?id=[id]: get item with id informed on the query
* POST /api/item/save: it adds or updates an item (it creates a new file, or updates it, on /database)
* DELETE /api/item/delete: it removes an item (it removes the corresponding file from /database)

### /server
It's where the *fs* is called on the server. These methods are invoked by /api/* or by *getServerSideProps* functions.

### /styles
It only contains the global css. The component styles are inside their corresponding component folders.

### /utils
It has some useful files, such as:
* contexts: it contains the context used throughout the components (ToDoListContext), to share the list of items and their functions across the hierarchy of components.
* enums: where the Status enum is defined
* helper: it should contain helpful functions to be used for several components (there is only the isLate function for now)
* services: it's where the client side calls the API to the server side.
