import { useContext } from "react";

import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { ITask, useTaskList } from "../context/TasksContext";



export function TaskList() {
    const { tasksList, removeTask } = useTaskList()

    function handleRemoveTask(id: string) {
      Alert.alert('Tem certeza?', 'Deseja realmente excluir a tarefa?', [
        {
          text: 'Cancelar',
          onPress: () => {}
        },
        {
          text: 'Excluir',
          onPress: () => removeTask(id)
        }
      ]);
    }

    return (
        <FlatList 
          className='bg-blue-1000 w-max p-1 pt-2 mt-6 rounded-lg first:rounded-md'
          data={tasksList as unknown as ITask[]} 
          ListEmptyComponent={<Text className='mx-auto pt-3 justify-center items-center text-sky-800 text-2xl'>Nenhuma tarefa cadastrada...</Text>}
          renderItem={({item}) => 
            <>
              <TouchableOpacity className='flex-row items-center justify-between'>
                <Text className=' text-white mx-3 px-2 py-3 text-2xl'>
                  {item.title} 
                </Text>
                
                <TouchableOpacity className='mr-4' onPress={() => handleRemoveTask(item.id)}>
                  <Ionicons name="md-trash" size={24} color="#67a4e0"/>
                </TouchableOpacity>
              </TouchableOpacity>
              <View className='w-11/12 mx-auto h-0.5 bg-blue-900 '></View>
            </>
          }
          keyExtractor={item => item.id}
        />
    );
}