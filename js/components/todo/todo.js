import { LitElement, html, css } from 'lit-element';

import { addTask } from '../../queries/tacheQuery.js'

export default class AppToDo extends LitElement {

  constructor() {
    super();
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
      }
      body {
        margin: 0;
        min-width: 250px;
      }
      
      * {
        box-sizing: border-box;
      }
      
      ul {
        margin: 0;
        padding: 0;
      }
      
      .ullist{
        display: inline-flex;
        width: 100%;
        height: 100%;
        align-items: center;
      }

      li{
        width: 90%;
      }

      .suppr{
        width:10%;
      }
      
      ul li {
        cursor: pointer;
        position: relative;
        padding: 12px 8px 12px 40px;
        list-style-type: none;
        background: #eee;
        font-size: 18px;
        transition: 0.2s;
        
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      ul li:nth-child(odd) {
        background: #f9f9f9;
      }
      
      ul li:hover {
        background: #ddd;
      }
      
      ul li.checked {
        background: #888;
        color: #fff;
        text-decoration: line-through;
      }
      
      ul li.checked::before {
        content: '';
        position: absolute;
        border-color: #fff;
        border-style: solid;
        border-width: 0 2px 2px 0;
        top: 10px;
        left: 16px;
        transform: rotate(45deg);
        height: 15px;
        width: 7px;
      }
      
      .close {
        position: absolute;
        right: 0;
        top: 0;
        padding: 12px 16px 12px 16px;
      }
      
      .close:hover {
        background-color: #f44336;
        color: white;
      }
      
      .header {
        background-color: #f44336;
        padding: 30px 40px;
        color: white;
        text-align: center;
      }
      
      .header:after {
        content: "";
        display: table;
        clear: both;
      }
      
      input {
        margin: 0;
        border: none;
        border-radius: 0;
        width: 75%;
        padding: 10px;
        float: left;
        font-size: 16px;
      }
      
      .addBtn {
        padding: 10px;
        width: 25%;
        background: #d9d9d9;
        color: #555;
        float: left;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        transition: 0.3s;
        border-radius: 0;
      }
      
      .addBtn:hover {
        background-color: #bbb;
      }
    `;
  }
  
  render() {
    return html`
        <div id="myDIV" class="header">
          <h2 style="margin:5px">To Do List</h2>
          <input type="text" id="myInput" placeholder="Entrez votre nouvelle tache ...">
          <span @click="${this.newTask}" class="addBtn">Ajouter</span>
        </div>
    `;
  }

  newTask() {

    let tache = this.shadowRoot.getElementById('myInput');
    
    addTask({
      "todo": tache.value,
      "checked" : ""
    });

    tache.value = "";
  }

}

customElements.define('app-todo', AppToDo);