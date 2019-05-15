import { openDB } from 'idb';
import AppToDoList from '/js/components/todolist/todolist.js';

var queue = []

async function addTask(nouvelleTache) {
    try {
        if (navigator.onLine) {
            fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(nouvelleTache)
            }).then((data) => {
                return data.text();
            }).then((text) => {
                const event = new CustomEvent('dataChanged', {
                    detail: JSON.parse(text)
                });
                document.dispatchEvent(event);
                return 'done';
            }).catch((error) => {
                console.error(error);
                return error;
            });
        }else{
            /*const database = await openDB('app-store', 1, {
                upgrade(db) {
                  db.createObjectStore('tache', { keyPath: 'id', autoIncrement: false});
                }
              });
              
              var tx = database.transaction('tache', 'readwrite');
              var store = tx.objectStore('tache');
              console.log(store)
              store.add(nouvelleTache);

              return 'done';*/
              const tacheElement = new AppToDoList();
      
              tacheElement.initTodo(nouvelleTache.id,
                nouvelleTache.todo,
                nouvelleTache.checked);
                
            app.querySelector('[page=list]').appendChild(tacheElement);


            queue.push(nouvelleTache);
        }
    } catch (error) {
        console.error(error);
    }
}

async function tacheChecked(tache) {

    try {
        fetch("http://localhost:3000/tasks/"+tache.id, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(tache)
        }).then((data) => {
            const event = new CustomEvent('tacheChecked', {
                detail: tache.id
            });
            document.dispatchEvent(event);
        });
    } catch (error) {
        console.error(error);
    }
}

async function removeTask(tache) {

    try {
        fetch("http://localhost:3000/tasks/"+tache.id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(tache)
        });
    } catch (error) {
        console.error(error);
    }
}

async function clearQueue() {
    queue = []
}

export {
    queue,
    addTask,
    tacheChecked,
    removeTask,
    clearQueue
}