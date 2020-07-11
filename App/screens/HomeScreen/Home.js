import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Dimensions } from 'react-native';
import { ListItem } from './components';
import { ScreenContainer } from '../../components';

const DEVICE = Dimensions.get('window');

import { getMovies } from '../../constants';
export const Home = ({ navigation }) => {
    const [moveList, setMovieList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        fetch(getMovies())
            .then(res => res.json())
            .then(({results}) => {
                setIsLoading(false)
                setMovieList(results)
            })
            .catch(err => console.log({err}))
    })

    if(isLoading) {
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Loading Movies...</Text></View>
    }
    
    return (
        <ScreenContainer>
            <View>
                <FlatList
                    style={styles.listContainer}
                    data={moveList}
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