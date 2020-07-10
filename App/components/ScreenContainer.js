import React from 'react';
import { View, StyleSheet } from 'react-native';

export const ScreenContainer = ({children}) => <View style={styles.container}>{children}</View>

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})