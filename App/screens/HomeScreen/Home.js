import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';

import { ListItem } from './components';
import { base_url } from '../../constants';

import { getMovies, genres } from '../../constants';


const keyExtractor = item => item.id + '';

const genreMap = {};
for(let i = 0; i < genres.length; i++) {
    genreMap[genres[i].id] = genres[i].name;
}

const getPosterURI = path => {
    return `${base_url}w342${path}`
}

const getReleaseYear = date => {
    return `(${date.split('-')[0]})`;
}

const getBackdropURI = path => {        
    return `${base_url}w1280${path}`
}

const mapPosterURI = list => {
    return list.map(movie => {
        movie.poster_uri = getPosterURI(movie.poster_path);
        return movie;
    })
}

const mapReleaseYear = list => {
    return list.map(movie => {
        movie.releaseYear = getReleaseYear(movie.release_date)
        return movie
    })
}

const mapMovieGenres = ({results: list}) => {
    return list.map(movie => {
        movie.genres = movie.genre_ids.map(id => genreMap[id]);
        return movie;
    })
}

const mapBackdropPath = list => {
    return list.map(movie => {
        movie.backdrop_uri = getBackdropURI(movie.backdrop_path);
        return movie;
    })
}

const Loading = React.memo(() => (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Loading Movies...</Text></View>))

export const Home = ({ navigation }) => {
    const [movieList, setMovieList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        let cancelled = false;
        fetch(getMovies())
            .then(res => {
                if(cancelled) throw new Error('effect cancelled!');
                return res
            })
            .then(res => res.json())
            .then(mapMovieGenres)
            .then(mapReleaseYear)
            .then(mapPosterURI)
            .then(mapBackdropPath)
            .then(setMovieList)
            
            .then(_ => setIsLoading(false))
            .catch(err => {})
        
        return () => {
            cancelled = true
        }
    })

    
    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => navigation.push('Detail', {movie: item})}>
            <ListItem data={item} stye={styles.item} />
        </TouchableOpacity>
    );

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
                    renderItem={renderItem}
                    keyExtractor={keyExtractor} />
            </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        marginTop: 72
    }
})