import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';


import { Login } from './screens';

export default () => {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginTop: 30 }}>
                    <Login />
                </View>
            </SafeAreaView>
        )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})