import React from "react";
import { Image, Text, View } from "react-native";
import { Link } from "expo-router";
import { Button } from "~/components/Button";


const Index: React.FC = () => {
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

            <Link href="/(home)/sessions" asChild>
                <Button title="Get Started" />
            </Link>
        </View>
    )
};

export default Index;