import React, { useState } from "react";
import { Alert, SafeAreaView, Text, TextInput, View } from "react-native";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Button, Line } from "@/components";
import app from "@/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

export default function AuthenticationPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(true);
  const [visible, setVisible] = useState(false);

  async function signIn(data: FieldValues) {
    //     setLoading(true);
    //     try {
    //       await auth().signInWithEmailAndPassword(data.email, data.password);
    //     } catch (e: any) {
    //       console.error("Sign in error: " + e);
    //       alert("Sign in error: " + e);
    //     } finally {
    //       setLoading(false);
    //     }
  }

  async function signUp(data: FieldValues) {
    setLoading(true);
    let error;
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(({ user }) => {
        updateProfile(user, {
          displayName: data.username,
        });
      })
      .catch((err) => {
        error = err as FirebaseError;
        console.error(error.message);
      });
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(({ user }) => {
        Alert.alert("User account created", user.uid);
      })
      .catch((err) => {
        error = err as FirebaseError;
        console.error(error.message);
      });

    setLoading(false);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1e90ff] justify-center items-center">
      {login ? (
        <View className="w-[80%] p-[20px]">
          <Text className="text-[#F3EFE0] text-[30px] font-bold mb-[20px] text-center">
            Login
          </Text>
          {errors.email && (
            <Text className="text-[#DC143C] font-bold mb-[5px]">
              *{errors.email.message?.toString()}
            </Text>
          )}
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-white rounded-lg border-[2px] text-white px-[10px] mb-[10px]"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="lightgray"
                placeholder="Email"
              />
            )}
          />
          {errors.password && (
            <Text className="text-[#DC143C] font-bold mb-[5px]">
              *{errors.password.message?.toString()}
            </Text>
          )}
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-white rounded-lg border-[2px] text-white px-[10px] mb-[10px]"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={visible}
                placeholderTextColor="lightgray"
                placeholder="Password"
              />
            )}
          />

          <Button
            text="Sign in"
            onPress={handleSubmit(signIn)}
            buttonStyle="bg-[#003366] mt-[10px]"
            textStyle="rounded-lg text-[#fff] p-[10px] text-center"
          />

          <Text className="text-[#F3EFE0] mt-[10px] text-right">
            Don&apos;t have an account?&nbsp;
            <Text
              className="text-[#F3EFE0] underline"
              onPress={() => setLogin((prev) => !prev)}
            >
              Sign up
            </Text>
          </Text>
        </View>
      ) : (
        <View className="w-[80%] p-[20px]">
          <Text className="text-[#F3EFE0] text-[30px] font-bold mb-[20px] text-center">
            Register
          </Text>
          {errors.username && (
            <Text className="text-[#DC143C] font-bold mb-[5px]">
              *{errors.username.message?.toString()}
            </Text>
          )}
          <Controller
            control={control}
            name="username"
            rules={{ required: "Username is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-white rounded-lg border-[2px] text-white px-[10px] mb-[10px]"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="lightgray"
                placeholder="Username"
              />
            )}
          />

          {errors.email && (
            <Text className="text-[#DC143C] font-bold mb-[5px]">
              *{errors.email.message?.toString()}
            </Text>
          )}
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-white rounded-lg border-[2px] text-white px-[10px] mb-[10px]"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="lightgray"
                placeholder="Email"
              />
            )}
          />

          {errors.password && (
            <Text className="text-[#DC143C] font-bold mb-[5px]">
              *{errors.password.message?.toString()}
            </Text>
          )}
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-white rounded-lg border-[2px] text-white px-[10px] mb-[10px]"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={visible}
                placeholderTextColor="lightgray"
                placeholder="Password"
              />
            )}
          />

          <Button
            text="Sign Up"
            onPress={handleSubmit(signUp)}
            buttonStyle="bg-[#003366] mt-[10px]"
            textStyle="rounded-lg text-[#fff] p-[10px] text-center"
          />
          <Text className="text-[##F3EFE0] mt-[10px] text-right">
            Have an account?&nbsp;
            <Text
              className="text-[#F3EFE0] underline"
              onPress={() => setLogin((prev) => !prev)}
            >
              Sign in
            </Text>
          </Text>
        </View>
      )}
      <Line />
      <Button
        text="Sign in with Google"
        image={require("@/assets/images/Google.png")}
        buttonStyle="flex flex-row mt-[10%] border-white rounded-lg p-[10px] bg-white items-center"
        textStyle="font-bold"
        onPress={() => console.log("CLICKED!")}
        withImage
      />
    </SafeAreaView>
  );
}
