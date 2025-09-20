import { FC } from "react";
import { Image, Text, View } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { Speaker } from "~/types";

const SpeakerItem: FC<Speaker> = ({ id, name }) => {
    return (
        <View className="flex flex-row justify-between items-center p-4 bg-white">
            <View className="flex-row justify-center items-center gap-x-3">
                <Image
                    source={{ uri: `https://i.pravatar.cc/150?u=${id}` }}
                    className="w-16 rounded-full aspect-square"
                />
                <Text className="font-semibold text-lg">{name}</Text>
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

export default SpeakerItem;