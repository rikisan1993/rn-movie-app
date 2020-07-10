import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Font from 'expo-font';

const customFonts = {
    'Lora-Bold': require('../../assets/fonts/Lora-Bold.ttf'),
    'Lora-Regular': require('../../assets/fonts/Lora-Regular.ttf'),
    'Source-Sans-Pro-Regular': require('../../assets/fonts/SourceSansPro-Regular.ttf'),
    'Source-Sans-Pro-Bold': require('../../assets/fonts/SourceSansPro-Bold.ttf')
}

export const ScreenContainer = ({children, style}) => {
    const [fontsLoaded, setFontsLoaded] = React.useState(false);

    const loadFont = async () => {
        await Font.loadAsync(customFonts)
        setFontsLoaded(true);
    }

    React.useEffect(() => {
        loadFont()
    })

    if(fontsLoaded) {
        return (
            <View style={{...styles.container, ...style}}>{children}</View>
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
    container: {}
})