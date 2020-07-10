import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from './components';
import { ScreenContainer } from '../../components';

import data from './sample/data.json';
export const Home = ({ navigation }) => {

    return (
        <ScreenContainer>
            <View>
                <FlatList
                style={styles.listContainer}
                    data={data.results}
                    renderItem={({item}) => <TouchableOpacity onPress={() => navigation.push('Detail', {movie: item})}>
                        <ListItem data={item} stye={styles.item} />
                    </TouchableOpacity>}
                    keyExtractor={item => item.id + ''} />
            </View>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        marginTop: 72
    }
})