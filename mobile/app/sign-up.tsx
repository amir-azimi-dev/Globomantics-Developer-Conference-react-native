import { FC, useEffect, useReducer } from "react";
import { Image, Text, TextInput, View, Alert } from "react-native";
import { Link, router } from "expo-router";
import { Button } from "~/components/Button";
import { useSignUpMutation } from "~/RTK/graphql/generated";
import { updateCredentials } from "~/RTK/slices/auth";
import { UseAppDispatch, useAppSelector } from "~/RTK/state/store";

type State = {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
};

type ActionTypes = "SET_NAME" | "SET_EMAIL" | "SET_PASSWORD" | "SET_REPEAT_PASSWORD";

type Action = { type: ActionTypes, payload: string };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_NAME": {
            return { ...state, name: action.payload };
        };
        case "SET_EMAIL": {
            return { ...state, email: action.payload };
        };
        case "SET_PASSWORD": {
            return { ...state, password: action.payload };
        }
        case "SET_REPEAT_PASSWORD": {
            return { ...state, repeatPassword: action.payload };
        };
        default: {
            return state;
        }
    }
};

const SignUp: FC = () => {
    const [state, dispatch] = useReducer(reducer, { name: "", email: "", password: "", repeatPassword: "" });
    const userInfo = useAppSelector(state => state.auth);
    const authDispatch = UseAppDispatch();

    const [signUp] = useSignUpMutation();

    useEffect(() => {
        if (userInfo.token) router.replace("/(home)");

    }, [userInfo.token]);

    const inputChangeHandler = (actionType: ActionTypes, newValue: string): void => {
        dispatch({ type: actionType, payload: newValue });
    };

    const signUpHandler = async (): Promise<void> => {
        if (
            !state.name.trim() ||
            !state.email.trim() ||
            !state.password.trim() ||
            state.password !== state.repeatPassword
        ) {
            return;
        }

        const result = await signUp({ credentials: { ...state, repeatPassword: undefined } });
        if (result.error) return Alert.alert("Invalid Data", "Authentication Failed! Check Your Entered Data.");

        const { token, user } = result.data.signUp;
        authDispatch(updateCredentials({ user, token }));
        router.replace("/(home)");
    };

    return (
        <View className="flex-1 justify-center items-center p-3">
            <Image
                source={require("../assets/globomantics-logo-bug-darkblue.png")}
                resizeMode="contain"
                className="w-52 max-w-full"
            />
            <Text className="font-bold text-3xl text-center">Sign Up</Text>

            <View className="w-full mb-4">
                <Text className="mb-1 font-bold">Full Name</Text>
                <TextInput
                    inputMode="text"
                    placeholder="Name"
                    value={state.name}
                    onChangeText={inputChangeHandler.bind(this, "SET_NAME")}
                    className="p-3 border border-gray-400 rounded-lg font-bold text-xl"
                />
            </View>
            <View className="w-full mb-4">
                <Text className="mb-1 font-bold">Email</Text>
                <TextInput
                    inputMode="email"
                    placeholder="Email Address"
                    autoCapitalize="none"
                    value={state.email}
                    onChangeText={inputChangeHandler.bind(this, "SET_EMAIL")}
                    className="p-3 border border-gray-400 rounded-lg font-bold text-xl"
                />
            </View>
            <View className="w-full mb-4">
                <Text className="mb-1 font-bold">Password</Text>
                <TextInput
                    inputMode="text"
                    placeholder="Password"
                    secureTextEntry
                    value={state.password}
                    onChangeText={inputChangeHandler.bind(this, "SET_PASSWORD")}
                    className="p-3 border border-gray-400 rounded-lg font-bold text-xl"
                />
            </View>
            <View className="w-full">
                <Text className="mb-1 font-bold">Repeat Password</Text>
                <TextInput
                    inputMode="text"
                    placeholder="Password Again"
                    secureTextEntry
                    value={state.repeatPassword}
                    onChangeText={inputChangeHandler.bind(this, "SET_REPEAT_PASSWORD")}
                    className="p-3 border border-gray-400 rounded-lg font-bold text-xl"
                />
            </View>

            <Button title="Sign Up" className="w-full mt-5" onPress={signUpHandler} />

            <Text className="mt-5">
                have an account? {" "}
                <Link href="/sign-in" className="font-bold">Sign In</Link>
            </Text>
        </View>
    );
};

export default SignUp;