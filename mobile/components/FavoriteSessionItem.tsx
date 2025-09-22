import { FC } from "react";
import { Text, View } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Session } from "~/types";

type FavoriteSessionItemPropsTypes = Session & { onRemoveFavorite: (id: string) => void };

const FavoriteSessionItem: FC<FavoriteSessionItemPropsTypes> = ({ id, title, onRemoveFavorite }) => {
    return (
        <View className="flex flex-row justify-between items-center p-4 bg-white">
            <View className="flex justify-center">
                <Text>{title}</Text>
            </View>
            <View className="flex flex-row items-center">
                <Feather.Button
                    name="share"
                    size={24}
                    color="black"
                    className="mr-0 pr-0 active:bg-slate-100"
                    backgroundColor="#fff"
                />
                <FontAwesome.Button
                    name="trash"
                    size={24}
                    color="red"
                    className="mr-0 pr-0"
                    backgroundColor="#fff"
                    onPress={onRemoveFavorite.bind(this, id)}
                />
            </View>
        </View>
    );
};

export default FavoriteSessionItem;