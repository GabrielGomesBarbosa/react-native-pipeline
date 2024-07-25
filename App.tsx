import {
  View,
  Text,
  Image,
  FlatList,
  StatusBar,
  Pressable,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import TaskItem from './src/components/TaskItem';
import InputText from './src/components/InputText';

import Ellipsis from './src/assets/images/ellipsis.png';
import PlusWhite from './src/assets/images/plus-white.png';
import {backgroundColor, primaryColor, name} from './resources/config.json';

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
        backgroundColor,
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: primaryColor,
          padding: 10,
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Image
          source={require('./resources/logo.png')}
          style={{height: 30, width: 30}}
        />
        <Text style={{fontSize: 18, fontWeight: '700'}}>{name}</Text>
        <Image source={Ellipsis} style={{height: 20, width: 20}} />
      </View>
      <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 20,
        }}>
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
              backgroundColor: primaryColor,
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
      </View>
    </SafeAreaView>
  );
}

export default App;
