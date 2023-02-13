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

    return (
        <TasksContext.Provider value={ { tasksList, addTask } }>
            {children}
        </TasksContext.Provider>
    );
}
