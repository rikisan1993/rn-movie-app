import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import { AuthContext } from '../../auth-context';

export const Login = () => {

    const { signin } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text style={styles.logoPrefix}>The</Text>
                <Text style={styles.logoSuffix}>Movie App</Text>
            </View>
            <View style={styles.loginForm}>
                <View style={styles.inputWrapper}>
                    <Icon style={styles.loginIcon} name='envelope' size={20} />
                    <TextInput style={styles.loginInput} placeholder='e-mail address' />
                </View>
                
                <View style={styles.inputWrapper}>
                    <Icon style={styles.loginIcon} name='lock' size={20} />
                    <TextInput style={styles.loginInput} placeholder='password' secureTextEntry={true} />
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={() => signin({token: 'test'})}>
                    <Text style={styles.loginButtonText}>login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    logo: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        position: 'absolute',
        top: 100,
        flexWrap: 'wrap',
        width: 'auto'
    },
    logoPrefix: {
        textAlign: 'left',
        fontFamily: 'Lora-Regular',
        fontSize: 16
    },
    logoSuffix: {
        textAlign: 'left',
        fontSize: 42,
        fontFamily: 'Lora-Bold',
        marginTop: -15
    },
    loginForm: {
        position: 'absolute',
        bottom: 120,
        paddingHorizontal: 45,
        width: '100%'
    },
    inputWrapper: {
        flexDirection: 'row',
        backgroundColor: '#e3e3e3',
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        borderRadius: 4,
        marginVertical: 8
    },
    loginIcon: {
        marginRight: 16,
        color: '#999'
    },
    loginInput: {
        flex: 1
    },
    loginButton : {
        backgroundColor: '#28D8A1',
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginVertical: 8
    },
    loginButtonText: {
        color: '#fff',
        fontFamily: 'Source-Sans-Pro-Bold',
        fontSize: 14,
        textTransform: 'uppercase'
    }
})