import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome'

export const AboutButton = ({onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <Icon name='user' size={24} color='#333' style={{marginRight:24}} />
    </TouchableOpacity>
)