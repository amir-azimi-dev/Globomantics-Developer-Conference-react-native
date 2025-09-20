import { FC, useReducer } from "react";
import { Image, Text, TextInput, View, Alert } from "react-native";
import { Link } from "expo-router";
import { Button } from "~/components/Button";
import { useSignInMutation } from "~/RTK/graphql/generated";

type State = {
    email: string;
    password: string;
};

type Action = { type: "SET_EMAIL" | "SET_PASSWORD", payload: string };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_EMAIL": {
            return { ...state, email: action.payload };
        };
        case "SET_PASSWORD": {
            return { ...state, password: action.payload };
        }
        default: {
            return state;
        }
    }
};

const SignIn: FC = () => {
    const [state, dispatch] = useReducer(reducer, { email: "", password: "" });
    const [signIn] = useSignInMutation();

    const inputChangeHandler = (field: "email" | "password", newValue: string): void => {
        dispatch({ type: field === "email" ? "SET_EMAIL" : "SET_PASSWORD", payload: newValue });
    };

    const signInHandler = async (): Promise<void> => {
        if (!state.email.trim() || !state.password.trim()) return;

        const result = await signIn({ credentials: state });
        if (result.error) return Alert.alert("Invalid Data", "Authentication Failed! Check Your Entered Data.");

        const { token, user } = result.data.signIn;
        console.log(token, user, "***");
    };

    return (
        <View className="flex-1 justify-center items-center p-3">
            <Image
                source={require("../assets/globomantics-logo-bug-darkblue.png")}
                resizeMode="contain"
                className="w-52 max-w-full"
            />
            <Text className="font-bold text-3xl text-center">Sign In</Text>

            <View className="w-full mb-4">
                <Text className="mb-1 font-bold">Email</Text>
                <TextInput
                    inputMode="email"
                    placeholder="Email Address"
                    value={state.email}
                    onChangeText={inputChangeHandler.bind(this, "email")}
                    className="p-3 border border-gray-400 rounded-lg font-bold text-lg"
                />
            </View>
            <View className="w-full">
                <Text className="mb-1 font-bold">Password</Text>
                <TextInput
                    inputMode="text"
                    placeholder="Password"
                    secureTextEntry
                    value={state.password}
                    onChangeText={inputChangeHandler.bind(this, "password")}
                    className="p-3 border border-gray-400 rounded-lg font-bold text-lg"
                />
            </View>

            <Button title="Sign In" className="w-full mt-5" onPress={signInHandler} />

            <Text className="mt-5">
                Don't have an account? {" "}
                <Link href="/sign-up" className="font-bold">Sign Up</Link>
            </Text>
        </View>
    );
};

export default SignIn;