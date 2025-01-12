import React from "react";
import { Pressable, Text, Image, ImageSourcePropType } from "react-native";

interface ButtonProps {
  text: string;
  onPress: (data: any) => void;
  buttonStyle?: string;
  textStyle?: string;
  image?: ImageSourcePropType;
  withImage?: boolean;
}

export default function Button({
  text,
  onPress,
  buttonStyle,
  textStyle,
  image,
  withImage,
}: ButtonProps) {
  return (
    <Pressable className={`active:opacity-90 ${buttonStyle}`} onPress={onPress}>
      {withImage ? (
        <Image source={image} className="w-[24px] h-[24px] mr-[20px]" />
      ) : null}
      <Text className={textStyle}>{text}</Text>
    </Pressable>
  );
}
