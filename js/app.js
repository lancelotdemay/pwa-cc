import AppToDo from '/js/components/todo/todo.js';
import AppToDoList from '/js/components/todolist/todolist.js';
import { openDB } from 'idb';
import checkConnectivity from '/js/connection.js';
import { queue, addTask, clearQueue, removeTask } from '/js/queries/tacheQuery.js';

(async function(document) {
  const app = document.querySelector('#app');
  const skeleton = app.querySelector('.skeleton');
  const listPage = app.querySelector('[page=list]');

  checkConnectivity(3, 2000);
  
  document.addEventListener('connection-changed', ({ detail }) => {
    if (detail.online && queue.length > 0) {
      addOfflineData(queue)
    }

    console.log(detail.online);
  });
  skeleton.removeAttribute('active');
  listPage.setAttribute('active', '');
  
  document.addEventListener('dataChanged', newTask);
  
  try {

    const database = await openDB('app-store', 1, {
      upgrade(db) {
        db.createObjectStore('tache');
      }
    });
    
    await fetchData();

    const tache = await database.get('tache', 'task');
    
    const todoList = new AppToDo();
    listPage.appendChild(todoList);
    
    tache.map(item => {
      const tacheElement = new AppToDoList();
      
      tacheElement.initTodo(item.id,
        item.todo,
        item.checked);
        
      listPage.appendChild(tacheElement);
  
      return tacheElement;
    });
    
  } catch (error) {
    console.error(error, ':(');
  }
  
  async function newTask(data) {
    try {
      
      let item = data.detail;

      fetchData();

      const tacheElement = new AppToDoList();

      tacheElement.initTodo(item.id,
        item.todo,
        item.checked);
        
      listPage.appendChild(tacheElement);

    } catch (error) {
      console.error(error);
    }
  }

  async function addOfflineData(list) {
    try {
      const database = await openDB('app-store', 1);
  
      list.forEach(task => {
        fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
              "Content-type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(task)
        }).then((data) => {
          return data.text();
        })
      });

      clearQueue();

      return list;
    } catch (error) {
      console.error(error);
      return null;
    }
  
  }
  
  async function fetchData() {

    try {

      const data = await fetch('/data/db.json');
      const json = await data.json();
      const tacheJson = json.tasks;

      const database = await openDB('app-store', 1);

      if (navigator.onLine) {
        await database.put('tache', tacheJson, 'task')
      }

      return tacheJson;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
})(document);