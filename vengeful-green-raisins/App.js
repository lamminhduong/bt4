import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity, Switch, Picker, ScrollView } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('Personal');
  const [searchQuery, setSearchQuery] = useState('');

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { key: Math.random().toString(), value: task, completed: false, category }]);
    setTask('');
  };

  const toggleCompletion = (taskKey) => {
    setTasks(tasks.map(item => 
      item.key === taskKey ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteTask = (taskKey) => {
    setTasks(tasks.filter(item => item.key !== taskKey));
  };

  const filteredTasks = searchQuery.trim() === '' 
    ? tasks 
    : tasks.filter(t => t.value.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>TODO LIST</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Search tasks" 
        value={searchQuery} 
        onChangeText={setSearchQuery} 
      />
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      >
        <Picker.Item label="Công việc đơn giản" value="Công việc đơn giản" />
        <Picker.Item label="Công việc trung bình" value="Công việc trung bình" />
        <Picker.Item label="Công việc phức tạp" value="Công việc phức tạp" />
      </Picker>
      <TextInput 
        style={styles.input} 
        placeholder="Enter task" 
        value={task} 
        onChangeText={setTask} 
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList 
        data={filteredTasks}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={item.completed ? styles.completedTask : undefined}>
              {`[${item.category}] ${item.value}`}
            </Text>
            <View style={styles.actions}>
              <Switch 
                value={item.completed} 
                onValueChange={() => toggleCompletion(item.key)} 
              />
              <TouchableOpacity onPress={() => deleteTask(item.key)}>
                <Text style={styles.deleteButton}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
    backgroundColor: '#0000FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor:'#008080'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#CC99FF',
    marginBottom: 10,
    paddingHorizontal: 8,
paddingVertical: 6,
     backgroundColor:'#00FF00'
  },
  picker: {
    height: 50,
    width: 150,
    marginBottom: 20,
   backgroundColor:'#336699'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  completedTask: {
    textDecorationLine: 'line-through',
    backgroundColor:'#FF00FF'
  },
  deleteButton: {
    marginLeft: 10,
    color: 'red',
  },
});
