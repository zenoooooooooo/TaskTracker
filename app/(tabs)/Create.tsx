import { View, Text, TextInput, Alert } from "react-native";
import { Button } from "@/components";
import { useForm, Controller, FieldValues } from "react-hook-form";
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { auth, db } from "@/firebaseConfig";
import { User } from "firebase/auth";
const Create = () => {
  const [visible, setVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      errors: "",
    },
  });

  function createNewTask(data: FieldValues) {
    const user: User | null = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "Log in first before creating a task");
      return;
    }

    addDoc(collection(db, "tasks"), {
      userId: user.uid,
      title: data.title,
      description: data.description,
      completed: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
      .then((docRef) => {
        console.log(docRef.id);
        Alert.alert("Success", "Task created successfully!");
        reset();
      })
      .catch((err) => {
        const error = err as FirebaseError;
        console.error(error.message);
      });
  }

  return (
    <View className="bg-[#1e90ff] flex-1 p-6 justify-center">
      <View className="rounded-lg bg-white p-4 border-l-4 border-l-[#003366]">
        <Text className="text-2xl font-bold mb-[20px]">Create New Task</Text>
        {errors.title && (
          <Text className="text-[#DC143C] font-bold mb-[5px]">
            *{errors.title.message?.toString()}
          </Text>
        )}
        <Controller
          control={control}
          name="title"
          rules={{ required: "Title is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border-gray-400 border-[1px] rounded-lg px-[10px] mb-[10px]"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="lightgray"
              placeholder="Title"
            />
          )}
        />
        {errors.description && (
          <Text className="text-[#DC143C] font-bold mb-[5px]">
            *{errors.description.message?.toString()}
          </Text>
        )}
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline={true}
              numberOfLines={4}
              className="border-gray-400 rounded-lg border-[1px] px-[10px] h-[100px] align-top mb-[10px]"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={visible}
              placeholderTextColor="lightgray"
              placeholder="Description"
            />
          )}
        />

        <Button
          text="Create"
          onPress={handleSubmit(createNewTask)}
          buttonStyle="bg-[#003366] w-full mt-[10px]"
          textStyle="rounded-lg text-[#fff] p-[10px] text-center"
        />
      </View>
    </View>
  );
};

export default Create;
