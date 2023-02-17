import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

interface IProps {
    children: React.ReactElement
}


export interface ITask {
    id: string;
    title: string;
}

export interface ITasksContext {
    tasksList: ITask[]
    addTask(task: ITask): void;
    removeTask(id: string): void;
}

const tasksData = '@MyTasksLucas126:Tasks'

export const TasksContext = React.createContext<ITasksContext>(
    {} as ITasksContext
);


export const TasksProviderComponent: React.FunctionComponent<IProps> = ({ children }) => {
    const [tasksList, setTasksList] = useState<ITask[]>([]);

    useEffect(() => {
        async function loadTasks() {
            const taskList = await AsyncStorage.getItem(tasksData)

            if (taskList) {
                setTasksList(JSON.parse(taskList))
            }
        }

        loadTasks();
    }, [])

    const addTask = async (task: ITask) => {
        try {  
            const newTaskList = [...tasksList, task];

            setTasksList(newTaskList);

            await AsyncStorage.setItem(tasksData, JSON.stringify(newTaskList));
        } catch (error) {
            throw new Error(error as string)
        }
    };

    const removeTask = async (id: string) => {
        // o filter percore a lista e retorna todos os itens que obedecem a condição.
        const newTaskList = tasksList.filter(task => task.id !== id);
        setTasksList(newTaskList);

        await AsyncStorage.setItem(tasksData, JSON.stringify(newTaskList));
    }

    return (
        <TasksContext.Provider value={ { tasksList, addTask, removeTask } }>
            {children}
        </TasksContext.Provider>
    );
};


export function useTaskList(): ITasksContext {
    //se esse hook for chamado em um componente que não é filho do provider desse contexto, a linha abaixo não vai funcionar.
    const context  =  React.useContext(TasksContext);

    if (!context) {
        throw new Error('useTaskList deve ser usado em um TasksProvider');
    }

    return context;
}
