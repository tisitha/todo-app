import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import Task from "@/components/Task";
import Button from "@/components/Button";
import { dmode, lmode } from "@/components/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {

  const style = StyleSheet.create(
    {
      container: {
        flex: 1,
        backgroundColor: useColorScheme() === 'dark' ? dmode.primary : lmode.primary
      },
      screen: {
        paddingBottom: 180
      },
      subject: {
        padding: 20,
        fontSize: 25,
        color: useColorScheme() === 'dark' ? dmode.text : lmode.text,
        justifyContent: 'center'
      },
      taskPanel: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: useColorScheme() === 'dark' ? dmode.outline : lmode.outline,
        borderBottomWidth: 1,
        width: '100%',
      },
      inputPanel: {
        flexDirection: 'row',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 90
      },
      input: {
        backgroundColor: useColorScheme() === 'dark' ? dmode.primary : lmode.primary,
        flex: 1,
        borderRadius: 18,
        padding: 20,
        margin: 2,
        borderWidth: 1,
        borderColor: useColorScheme() === 'dark' ? dmode.outline : lmode.outline,
        color: useColorScheme() === 'dark' ? dmode.text : lmode.text,
      },
      addbtn: {
        justifyContent: 'center',
        right: 0,
        padding: 5,
        margin: 2,
        borderWidth: 1,
        borderColor: useColorScheme() === 'dark' ? dmode.outline : lmode.outline,
        borderRadius: 18,
        backgroundColor: useColorScheme() === 'dark' ? dmode.primary : lmode.primary
      }
    }
  )

  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>('');

  const storeData = async (value: string[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-list', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-list');
      setTasks(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { getData() }, []);
  useEffect(() => { storeData(tasks) }, [tasks]);

  const removeTask = (index: number) => {
    setTasks((prevTask) => prevTask.filter((_, i) => i !== index));
  };

  return (

    <View style={style.container}    >

      <View style={style.screen}>
        <Text style={style.subject}>Today's tasks</Text>
        <ScrollView>
          {tasks.map((task, index) => <View style={style.taskPanel} key={index}>
            <Task label={task} />
            <Button label="✖" onPress={() => removeTask(index)} />
          </View>)}
        </ScrollView>
      </View>
      <KeyboardAvoidingView style={style.inputPanel}>
        <TextInput
          onChangeText={setTask}
          value={task}
          placeholder="Enter task here"
          style={style.input}
          multiline={false}
          maxLength={1000}
        />
        <View style={style.addbtn}>
          <Button label="Add" onPress={() => { task != '' && setTasks([...tasks, task]); setTask('') }} />
        </View>

      </KeyboardAvoidingView>

    </View>
  );
}

