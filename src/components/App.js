import { owl } from "@odoo/owl";
import { Task } from "./Task";

const { Component, tags } = owl;
const { xml, css } = tags;
const { useRef, useDispatch, useState, useStore } = owl.hooks;


const APP_TEMPLATE = xml`
    <div class="todolist" t-on-toggle-task="toggleTask" t-on-delete-task="deleteTask">
        <h1>
            TodoList
            <span>Get things done, one item at a time.</span>
        </h1>
        <ul t-if="tasks.length" >
            <t t-foreach="displayedTasks" t-as="task" t-key="task.id">
                <Task task="task"/>
            </t>
        </ul>
        <p t-else="" class="emptylist">Your todo list is empty.</p>
        <form name="newform">
            <label for="newitem">Add to the todo list</label>
            <input type="text" placeholder="Enter a new task" t-ref="add-input"/>
            <button type="button" t-on-click="addTask">Add item</button>
        </form>
        <div class="task-panel" t-if="tasks.length">
            <div class="task-counter">
                <t t-esc="displayedTasks.length"/>
                <t t-if="displayedTasks.length lt tasks.length">
                    / <t t-esc="tasks.length"/>
                </t> task(s)
            </div>
            <div class="task-filter">
                <span t-foreach="['all', 'active', 'completed']"
                    t-as="f" t-key="f"
                    t-att-class="{active: filter.value===f}"
                    t-on-click="setFilter(f)"
                    t-esc="f"/>
            </div>
               
        </div>
    </div>
`;

const APP_STYLE = css`
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    html, body {
        background:#f7f1f1;
        font-size:1.1rem;
        font-family:'Quicksand', sans-serif;
        height:100%;
    }
    .todolist {
        margin:4rem auto;
        padding:2rem 3rem 3rem;
        max-width:500px;
        background:#FF6666;
        color:#FFF;
        box-shadow:-20px -20px 0px 0px rgba(100,100,100,.1);
    }
    .todolist h1 {
        font-weight:normal;
        font-size: 2.6rem;
        letter-spacing:0.05em;
        border-bottom:1px solid rgba(255,255,255,.3); 
    }
    .todolist h1 span {
        display:block;
        font-size:0.8rem;
        margin-bottom:0.7rem;
        margin-left:3px;
        margin-top:0.2rem;   
    }
    .todolist ul {
        margin-top:2.6rem;
        list-style:none;
    }
    .todolist .emptylist {
        margin-top:2.6rem;
        text-align:center;
        letter-spacing:.05em;
        font-style:italic;
        opacity:0.8;
        
    }
    
    /* FORM */
    form {
        margin-top:3rem;
        display:flex;
        flex-wrap:wrap;
    }
    form label {
        min-width:100%;
        margin-bottom:.5rem;
        font-size:1.3rem;
    }
    form input {
	flex-grow:1;
	border:none;
        background:#f7f1f1;
        padding:0 1.5em;
        font-size:initial;
    }
    form button {
        padding:0 1.3rem;
        border:none;
        background:#FF6666;
        color:white;
        text-transform:uppercase;
        font-weight:bold;
        border:1px solid rgba(255,255,255,.3);
        margin-left:5px;
        cursor:pointer;
        transition:background .2s ease-out;
    }
    form button:hover {
        background:#FF5E5E;
    }
    form input, 
    form button {
        font-family:'Quicksand', sans-serif;
        height:3rem;
    }
    .task-panel{
        margin-top:1em;
    }
    .task-filter{
        margin-top:1em;
    }
    .task-filter span{
        border: 1px solid #ffffff2e;
        padding: 0 10px;
        margin: 1em 0.5em 0 0;
    }
    .task-filter span.active{
        border: 1px solid white;
    }
`;

export class App extends Component {
    static components = { Task };
    static template = APP_TEMPLATE;
    static style = APP_STYLE;

    inputRef = useRef("add-input");

    tasks = useStore((state) => state.tasks);
    dispatch = useDispatch();

    filter = useState({ value: "all" })

    get displayedTasks() {
        switch (this.filter.value) {
            case "active": return this.tasks.filter(t => !t.isCompleted);
            case "completed": return this.tasks.filter(t => t.isCompleted);
            case "all": return this.tasks;
        }
    }

    addTask() {
        const new_task = this.inputRef.el.value.trim();
        console.log(new_task);
        this.dispatch("addTask", new_task);
        this.inputRef.el.value = "";
    }

    setFilter(filter) {
        this.filter.value = filter;
    }

    mounted() {
        this.inputRef.el.focus();
    }
}
