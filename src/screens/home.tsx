import { useState, useEffect } from 'react';

import { Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

interface Task {
  id: string;
  title: string;
}

export function Home() {
  const [newTask, setNewTask]     = useState<string>()
  const [tasksList, setTasksList] = useState<Task[]>([])
  const [count, setCount] = useState<number>(1)

  

  function handleAddTasks() {
    const task = {
      id: `${/*new Date().getTime()*/ count}`, 
      title: newTask ? newTask : 'Tarefa vazia'
    }

    setTasksList([...tasksList, task])
    setCount(count + 1)
  }

  useEffect(() => {
    console.log(newTask)
  }, [newTask])

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className="flex-1 bg-black px-8 py-12">
        
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


        <FlatList 
          className='bg-blue-1000 w-max p-1 pt-2 mt-6 rounded-lg first:rounded-md'
          data={tasksList} 
          ListEmptyComponent={<Text className='mx-auto pt-3 justify-center items-center text-sky-800 text-2xl'>Nenhuma tarefa cadastrada...</Text>}
          renderItem={({item}) => 
            <>
              <TouchableOpacity className='flex-row items-center justify-between'>
                <Text className=' text-white  mx-3 px-2 py-3 text-2xl'>
                  {item.title} 
                </Text>
                
                <View className='mr-4'>
                  <Ionicons name="md-trash" size={24} color="#67a4e0"/>
                </View>
              </TouchableOpacity>
              <View className='w-11/12 mx-auto h-0.5 bg-blue-900 '></View>
            </>
          }
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

