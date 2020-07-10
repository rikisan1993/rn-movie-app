import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

import { Login } from './screens';

export default () => (
    <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 30 }}>
            <Login />
        </View>
    </SafeAreaView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})