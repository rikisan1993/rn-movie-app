import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import {connect} from 'react-redux';

import { ListItem } from './components';
import { fetchMovies } from '../../redux/actions/movies-action';

const keyExtractor = item => item.id + '';

const Loading = React.memo(() => (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Loading Movies...</Text></View>))


const renderItem = ({navigation}) => ({item}) => (
    <TouchableOpacity onPress={() => navigation.push('Detail', {id: item.id})}>
        <ListItem data={item} stye={styles.item} />
    </TouchableOpacity>
);

const mapStateToProps = state => ({
    movies: state.movies
})

export const Home = connect(mapStateToProps, {fetchMovies})(({ navigation, fetchMovies, movies: { isLoading, movieList }  }) => {
    
    React.useEffect(() => {
        fetchMovies();
    }, [fetchMovies])

    if(isLoading) {
        return <Loading />
    }
    
    return (
        <View>
            <FlatList
                updateCellsBatchingPeriod={30000}
                maxToRenderPerBatch={5}
                removeClippedSubviews={true}
                style={styles.listContainer}
                data={movieList}
                renderItem={renderItem({navigation})}
                keyExtractor={keyExtractor} />
        </View>
    )
})

const styles = StyleSheet.create({
    listContainer: {
        marginTop: 72
    }
})