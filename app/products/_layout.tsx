import { Tabs } from "expo-router";

export default function ProductsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: { display: "none" },
            }}
        >
            <Tabs.Screen
                name="masculino"
                options={{ title: "Masculino" }}
            />
            <Tabs.Screen
                name="feminino"
                options={{ title: "Feminino" }}
            />
        </Tabs>
    );
}