import { FC } from "react";
import { Text, View } from "react-native";

type UserSessionItemPropsTypes = {
    id: string;
    title: string;
    description: string;
    format: string;
    level: string;
};

const UserSessionItem: FC<UserSessionItemPropsTypes> = ({ title, description, format, level }) => {
    return (
        <View className="p-4 border border-gray-400 rounded-md">
            <View className="flex-row justify-between items-center mb-1">
                <Text className="font-semibold">{title}, {format}</Text>
                <Text>Level: <Text className="font-semibold">{level}</Text></Text>
            </View>
            <Text className="text-md">{description}</Text>
        </View>
    )
};

export default UserSessionItem;