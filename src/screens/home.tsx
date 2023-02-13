import { useState, useEffect, useContext } from 'react';

import { Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

import { TaskList } from '../components/TaskList';
import { TasksContext } from '../context/TasksContext';


export function Home() {
  const [newTask, setNewTask]     = useState<string>()

  const { addTask } = useContext(TasksContext)

  function handleAddTasks() {
    const task = {
      id: `${new Date().getTime()}`, 
      title: newTask ? newTask : 'Tarefa vazia'
    }

    addTask(task);
  }

  useEffect(() => {
    console.log(newTask)
  }, [newTask])

  return (
    <SafeAreaView className='flex-1 bg-black-1100'>
      <View className="flex-1 bg-semi-blacky px-8 py-12">
        
        <Text className="text-blue-300 text-2xl font-bold">Hellow World!</Text>
        <TextInput 
          className="p-4 w-max h-16 bg-blue-1000 text-white text-2xl rounded-md mt-8 border-0 focus:border-blue-400 focus:border-2" 
          placeholder='Digite algo...' placeholderTextColor="#637fab" 
          onChangeText={setNewTask}
        />
        
        <TouchableOpacity 
          className="bg-blue-300 justify-center items-center  w-max h-16 rounded-lg mt-4" 
          activeOpacity={0.75}
          onPress={handleAddTasks}
        >
          <Text className='font-semibold text-2xl'>Enviar</Text>
        </TouchableOpacity>

        <Text className="text-blue-300 mt-8 text-2xl font-bold">Minhas Tarefas!</Text>


        <TaskList />

        
      </View>
    </SafeAreaView>
  );
}

