import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';

export const Stars = React.memo(({value}) => {
        
    return (
        <View style={styles.container}>
            <Icon style={styles.star} name='star' size={16} />
            <Text style={styles.starText}>{value.toFixed(1)}</Text>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    star: {
        color: '#F8B43C',
        marginRight: 8
    },
    starText: {
        color: '#F8B43C',
        fontSize: 16,
        fontFamily: 'Source-Sans-Pro-Bold'
    }
})