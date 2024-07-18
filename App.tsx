import {
  View,
  Image,
  FlatList,
  StatusBar,
  Pressable,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import TaskItem from './src/components/TaskItem';
import InputText from './src/components/InputText';

import PlusWhite from './src/assets/images/plus-white.png';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Array<{id: string; label: string}>>([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleAddTask = () => {
    if (task) {
      setTasks([...tasks, {id: `${tasks.length + 1}`, label: task}]);
      setTask('');
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#f2f2f2',
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
        }}>
        <InputText value={task} onChangeText={setTask} />
        <Pressable
          onPress={handleAddTask}
          style={{
            justifyContent: 'center',
            backgroundColor: '#aaaaaa',
            padding: 10,
            borderRadius: 30,
          }}>
          <Image source={PlusWhite} style={{height: 20, width: 20}} />
        </Pressable>
      </View>

      <FlatList
        keyExtractor={item => item.id}
        data={tasks}
        renderItem={({item}) => (
          <TaskItem
            key={item.id}
            label={item.label}
            removeTask={() => handleDeleteTask(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
