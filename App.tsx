import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Login from './screens/Login';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from './redux/store/store';
import QuestionnaireDetails from './screens/QuestionnaireDetails';
import Question from './screens/Question';
import CompletedScreen from './screens/Completed';
import Questions from './screens/Questions';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home"
                screenOptions={{
                  contentStyle: {
                    backgroundColor: "#F5F6F8"
                  }
                }}
              >
                <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='questionnaireDetails'
                  component={QuestionnaireDetails}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="question" component={Question}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="completed" component={CompletedScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="questions" component={Questions}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
