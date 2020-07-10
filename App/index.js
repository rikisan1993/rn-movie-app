import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './auth-context';

import { Login, Home, Detail, Profile } from './screens';
import { AboutButton, ScreenContainer, Title } from './components';

const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} options={{
            headerTitle: () => <Title title='Movie List' />,
            headerTransparent: true,
            headerRight: () => <AboutButton onPress={() => navigation.navigate('Profile')} />
        }} />
        <HomeStack.Screen name="Detail" component={Detail} options={{
            title: '',
            headerTransparent: true,
            headerRight: () => <AboutButton onPress={() => navigation.navigate('Profile')} />
        }} />
        <HomeStack.Screen name="Profile" component={Profile} options={{
            title: '',
            headerTransparent: true
        }} />
    </HomeStack.Navigator>
)

const RootStack = createStackNavigator();
const RootStackScreen = ({userToken}) => (
    <RootStack.Navigator headerMode='none'>
        {!userToken 
            ? (<RootStack.Screen name="Auth" component={Login} />) 
            : (<RootStack.Screen name="Home" component={HomeStackScreen} />)}                
    </RootStack.Navigator>
)

export default () => {
    const [userToken, setUserToken] = React.useState(null);

    const authContext = React.useMemo(() => {
        return {
            signin: ({token}) => setUserToken(token),
            signout: () => setUserToken(null),
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScreenContainer style={{ marginTop: 30, flex: 1 }}>
                <AuthContext.Provider value={authContext}>
                    <NavigationContainer>
                        <RootStackScreen userToken={userToken} />
                    </NavigationContainer>
                </AuthContext.Provider>
            </ScreenContainer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})