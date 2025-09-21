import React from "react";
import { Image, Text, View } from "react-native";
import { Link, Redirect } from "expo-router";
import { Button } from "~/components/Button";
import { useAppSelector } from "~/RTK/state/store";

const Index: React.FC = () => {
    const userInfo = useAppSelector(state => state.auth);

    if (userInfo.token) return <Redirect href="/(home)" />;

    return (
        <View className="flex-1 justify-center items-center px-4">
            <Image
                source={require("../assets/globomantics-logo-darkblue.png")}
                resizeMode="contain"
                className="w-full h-20 mb-5"
            />

            <Text className="mb-3 font-bold text-2xl text-center">Globomantics Developer Conference</Text>
            <Text className="mb-6 text-center text-lg">
                Explore speakers and sessions. Create an account to submit a session of your own!
            </Text>

            <Link href="/sign-in" asChild>
                <Button title="Sign In to Get Started" />
            </Link>

            <Text className="mt-5">
                Don't have an account? {" "}
                <Link href="/sign-up" className="font-bold">Sign Up</Link>
            </Text>
        </View>
    )
};

export default Index;