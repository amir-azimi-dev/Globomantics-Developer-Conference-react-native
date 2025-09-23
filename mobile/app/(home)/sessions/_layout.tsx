import { Stack } from "expo-router";


const Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Sessions",
                }}
            />
            <Stack.Screen name="new" options={{
                title: "Create New Session",
                presentation: "modal"
            }} />
        </Stack>
    );
};

export default Layout;