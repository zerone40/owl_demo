import { owl } from "@odoo/owl";

const { Component, tags } = owl;
const { xml, css } = tags;
const { useDispatch } = owl.hooks;

const TASK_TEMPLATE = xml`
    <li class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
        <span class="label task" t-esc="props.task.label"/>
        <div class="actions">
            <input type="checkbox" t-att-checked="props.task.isCompleted" t-on-click="dispatch('toggleTask', props.task.id)"/>
            <span class="delete" t-on-click="dispatch('deleteTask', props.task.id)">删除</span>
        </div>
    </li>
`;

const TASK_STYLE = css`
    .todolist li {
        display:flex;
        margin:0 -3rem 4px;
        padding:1.1rem 3rem;
        justify-content:space-between;
        align-items:center;
        background:rgba(255,255,255,0.1);
    }
    .todolist .actions {
        flex-shrink:0;
        padding-left:0.7em;
    }
    .todolist .delete{
        margin-left:0.5em;
    }
    .todolist .label {
        position:relative;
        transition:opacity .2s linear;
    }
    .todolist .done .label {
        opacity:.6;
    }
    .todolist .done .label:before {
        content:'';
        position:absolute;
        top:50%;
        left:-.5rem;
        display:block;
        width:350px;
        height:1px;
        background:#FFF;
        animation:strikeitem .3s ease-out 0s forwards;
    }
`;

export class Task extends Component {
    static template = TASK_TEMPLATE;
    static style = TASK_STYLE;
    static props = ["task"];

    dispatch = useDispatch();
}