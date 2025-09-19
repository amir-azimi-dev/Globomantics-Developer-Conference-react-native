import { FC } from "react";
import { Text, View } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { Session } from "~/types";

const SessionItem: FC<Session> = ({ id, title }) => {
    return (
        <View className="flex flex-row justify-between items-center p-4 bg-white">
            <View className="flex justify-center">
                <Text>{title}</Text>
            </View>
            <View className="flex flex-row items-center">
                <FontAwesome.Button
                    name={true ? "heart" : "heart-o"}
                    iconStyle={{ color: true ? "red" : "black" }}
                    size={24}
                    color="black"
                    className="mr-0 pr-0 active:bg-slate-100"
                    backgroundColor="#fff"
                />
                <Feather.Button
                    name="share"
                    size={24}
                    color="black"
                    className="mr-0 pr-0 active:bg-slate-100"
                    backgroundColor="#fff"
                />
                <Feather.Button
                    name="more-vertical"
                    size={24}
                    color="black"
                    className="mr-0 pr-0 active:bg-slate-100"
                    backgroundColor="#fff"
                />
            </View>
        </View>
    );
};

export default SessionItem;