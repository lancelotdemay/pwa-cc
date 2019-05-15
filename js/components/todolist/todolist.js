import { LitElement, html, css } from 'lit-element';

import { tacheChecked, removeTask } from '../../queries/tacheQuery.js'

export default class AppToDoList extends LitElement {
  constructor() {
    super();
    this.id = "";
    this.todo = "";
    this.checked = "";
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
        width: 100%;
      }

      .suppr{
        position: absolute;
        right: 0;
        top: 0;
      }

      ul li {
        cursor: pointer;
        position: relative;
        padding: 12px 8px 12px 40px;
        list-style-type: none;
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

  static get properties() {
    return {
      id: { type: String },
      todo: { type: String },
      checked: { checked: String }
    };
  }

  initTodo(id, todo, checked) {
    this.id = id;
    this.todo = todo;
    this.checked = checked;
  }

  render() {
    return html`
        <ul id="myUL" class="ullist">
          <li id="${this.id}" class="${this.checked}"  @click="${this.tacheFaite}" >"${this.todo}"</li> <p class="suppr" id="${this.id}"  @click="${this.supprTache}"> X </p>
        </ul>
    `;
  }
  
  tacheFaite() {
    
    var checked = "checked";
    if( this.checked == "checked" ){
        checked = "";
    }

    tacheChecked( {
      'id': this.id,
      'todo' : this.todo,
      'checked': checked
    });
    
    this.shadowRoot.getElementById(this.id).setAttribute("class", checked);
    
  }
  
  supprTache() {
    
    removeTask( {
      'id': this.id
    });
    
    this.shadowRoot.getElementById(this.id).parentElement.remove();
    
  }

}

customElements.define('app-todolist', AppToDoList);