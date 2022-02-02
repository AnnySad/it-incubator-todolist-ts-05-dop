import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(toDoID: string, id: string) {
        setTasks({...tasks, [toDoID]: tasks[toDoID].filter(f => f.id !== id)})
    }

    function addTask(toDoID: string, title: string) {
        let newTasks = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [toDoID]: [newTasks, ...tasks[toDoID]]})
    }

    function changeStatus(toDoID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [toDoID]: tasks[toDoID].map(m => m.id === taskId ? {...m, isDone: isDone} : m)})
    }

    function changeFilter(toDoID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === toDoID ? {...el, filter: value} : el))
    }

    const removeToDo = (toDoID: string) => {
        setTodolists(todolists.filter(f => f.id !== toDoID))
        delete tasks[toDoID]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todolists.map((t, index) => {

                    let tasksForTodolist = tasks[t.id];

                    if (t.filter === "active") {
                        tasksForTodolist = tasks[t.id].filter(t => t.isDone === false);
                    }
                    if (t.filter === "completed") {
                        tasksForTodolist = tasks[t.id].filter(t => t.isDone === true);
                    }
                    return (
                        <Todolist
                            key={t.id}
                            toDoID={t.id}
                            title={t.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={t.filter}
                            removeToDo={removeToDo}/>
                    )
                })
            }
        </div>
    );
}

export default App;
