import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { ScreenContainer } from './src/components';
import reducers from './src/redux/reducers';
import App from './src';

const createThunkStore = applyMiddleware(thunk)(createStore);
const store = createThunkStore(reducers)  

export default () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScreenContainer style={{ marginTop: 30, flex: 1 }}>
                <Provider store={store}>
                    <App />
                </Provider>
            </ScreenContainer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})