import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import * as Font from 'expo-font';
import { AuthContext } from '../../auth-context';

const customFonts = {
    'Lora-Bold': require('../../../assets/fonts/Lora-Bold.ttf'),
    'Lora-Regular': require('../../../assets/fonts/Lora-Regular.ttf'),
    'Source-Sans-Pro-Regular': require('../../../assets/fonts/SourceSansPro-Regular.ttf'),
    'Source-Sans-Pro-Bold': require('../../../assets/fonts/SourceSansPro-Bold.ttf')
}

export const Login = () => {
    const [fontsLoaded, setFontsLoaded] = React.useState(false);

    const loadFont = async () => {
        await Font.loadAsync(customFonts)
        setFontsLoaded(true);
    }

    React.useEffect(() => {
        loadFont()
    })

    const { signin } = React.useContext(AuthContext);

    if(fontsLoaded) {
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
    } else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Loading ...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top: 100,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '50%'
    },
    logoPrefix: {
        textAlign: 'left',
        width: '100%',
        fontFamily: 'Lora-Regular',
        fontSize: 16
    },
    logoSuffix: {
        textAlign: 'left',
        width: '100%',
        fontSize: 36,
        fontFamily: 'Lora-Bold',
        marginTop: -25
    },
    loginForm: {
        position: 'absolute',
        bottom: 120,
        paddingHorizontal: 45,
        width: '100%'
    },
    inputWrapper: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
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