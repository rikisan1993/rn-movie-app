import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

import Icon from '@expo/vector-icons/FontAwesome5';

import { ScreenContainer } from '../../components';

export const Login = () => {
    return (
        <ScreenContainer>
            <View style={styles.logo}>
                <Text>The</Text>
                <Text>Movie App</Text>
            </View>
            <View style={styles.loginForm}>
                <View style={styles.inputWrapper}>
                    <Icon name='envelope' size={40} />
                    <TextInput />
                </View>
            </View>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    logo: {

    },
    loginForm: {

    }
})