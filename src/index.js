import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import { Login, Home, Detail, Profile } from './screens';
import { AboutButton, Title } from './components';

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

const App = ({auth}) => {

    return (
        <NavigationContainer>
            <RootStackScreen userToken={auth.usertoken} />
        </NavigationContainer>
    )
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(App);
