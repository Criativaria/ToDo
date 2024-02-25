import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import NovaTarefa from "./components/novatarefa";
import NovaCategoria from "./components/novacategoria";
import Home from "./pages/Home";

const Stack = createNativeStackNavigator();

export default function Routes() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="novaTarefa" component={NovaTarefa} />
                <Stack.Screen name="novaCategoria" component={NovaCategoria} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}