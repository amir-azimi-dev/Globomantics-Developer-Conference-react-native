import { forwardRef } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type ButtonProps = { title: string } & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(({ title, ...touchableProps }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      {...touchableProps}
      className={`${styles.button} ${touchableProps.className}`}>
      <Text className={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
});

Button.displayName = "Button";

const styles = {
  button: "px-8 py-4 items-center bg-indigo-500 rounded-[28px] shadow-md",
  buttonText: "text-white text-lg font-bold text-center",
};
