import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';


import { Login, Home } from './screens';

export default () => {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginTop: 30 }}>
                    <Home />
                </View>
            </SafeAreaView>
        )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})