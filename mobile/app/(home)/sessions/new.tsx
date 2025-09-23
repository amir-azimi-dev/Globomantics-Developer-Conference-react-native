import { FC, useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v3";
import { Button } from "~/components/Button";
import { useCreateSessionMutation } from "~/RTK/graphql/generated";
import { router } from "expo-router";


const sessionFormatOptions = ["Lecture", "Workshop", "Keynote"] as const;
const sessionLevelOptions = ["Beginner", "Intermediate", "Advanced"] as const;

const schema = z.object({
    title: z.string().min(3, "* Session Title must be at least 3 characters!"),
    description: z.string().min(3, "* Session Description must be at least 3 characters!"),
    format: z.enum(sessionFormatOptions, { required_error: "* Session Format is required!" }),
    level: z.enum(sessionLevelOptions, { required_error: "* Session Level is required!" })
});

type FormType = z.infer<typeof schema>;

const New: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { handleSubmit, control } = useForm<FormType>({ resolver: zodResolver(schema) });

    const [createSession] = useCreateSessionMutation();

    const createSessionHandler: SubmitHandler<FormType> = async (data): Promise<void> => {
        if (isLoading) return;

        setIsLoading(true);
        const result = await createSession({ session: data });
        setIsLoading(false);

        if (result.error) return Alert.alert("Error", "Error while creating session!");

        router.back();
    };

    return (
        <ScrollView className="flex-1 p-4 bg-slate-50">
            <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
                    <View className="mb-4">
                        <Text className={`mb-1 font-bold ${(invalid || error) ? "text-red-500" : "text-black"}`}>Title</Text>
                        <TextInput
                            className={`p-3 border rounded-lg font-bold text-lg ${(invalid || error) ? "border-red-500" : "border-gray-400"}`}
                            placeholder="Title"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                        {error && <Text className="mt-2 font-semibold text-red-500">{error.message}</Text>}
                    </View>
                )}
            />
            <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
                    <View className="mb-4">
                        <Text className={`mb-1 font-bold ${(invalid || error) ? "text-red-500" : "text-black"}`}>Description</Text>
                        <TextInput
                            className={`h-36 p-3 border rounded-lg font-bold text-lg ${(invalid || error) ? "border-red-500" : "border-gray-400"}`}
                            placeholder="Description"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            numberOfLines={5}
                            textAlignVertical="top"
                            multiline
                        />
                        {error && <Text className="mt-2 font-semibold text-red-500">{error.message}</Text>}
                    </View>
                )}
            />
            <Controller
                name="format"
                control={control}
                defaultValue="Workshop"
                render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
                    <View className="mb-4">
                        <Text className={`mb-1 font-bold ${(invalid || error) ? "text-red-500" : "text-black"}`}>Session Format</Text>
                        <View className="border border-gray-400 rounded-lg">
                            <Picker
                                selectedValue={value}
                                onValueChange={itemValue => onChange(itemValue)}
                                onBlur={onBlur}
                            >
                                {sessionFormatOptions.map(option => <Picker.Item key={option} label={option} value={option} />)}
                            </Picker>
                        </View>
                        {error && <Text className="mt-2 font-semibold text-red-500">{error.message}</Text>}
                    </View>
                )}
            />
            <Controller
                name="level"
                control={control}
                render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                    <View className="mb-4">
                        <Text className={`mb-1 font-bold ${(invalid || error) ? "text-red-500" : "text-black"}`}>Experience Level</Text>
                        {sessionLevelOptions.map(option => (
                            <View key={option} className="flex-row items-center gap-x-1 mb-1.5">
                                <Pressable
                                    className={`border border-neutral-200 rounded-full size-6 ${value === option ? "bg-primary-400" : "bg-stone-50"}`}
                                    onPress={onChange.bind(this, option)}
                                />
                                <Pressable
                                    onPress={onChange.bind(this, option)}
                                >
                                    <Text className="">{option}</Text>
                                </Pressable>
                            </View>
                        ))}
                        {error && <Text className="mt-2 font-semibold text-red-500">{error.message}</Text>}
                    </View>
                )
                }
            />

            <Button
                title="Create Session"
                className="mt-4"
                onPress={handleSubmit(createSessionHandler)}
            />
        </ScrollView >
    );
};

export default New;