import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { fetchMovie } from '../../redux/actions/movie-action';
import { Stars } from './component';

const DEVICE = Dimensions.get('window');

const Loading = () => (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Loading Movie Details ... </Text></View>);

const Genre = React.memo(({ genre }) => (
    <View style={styles.genreWrapper}>
        <Text style={styles.genre}>{genre}</Text>
    </View>
))

const genreMapper = genres => [...genres].map((genre, index) => <Genre genre={genre} key={index} />);

const Credits = React.memo(({profile_uri, name, job, character}) => (
    <View style={styles.castImageContainer}>
        <View style={{ backgroundColor: '#ccc', borderRadius: 8, overflow: 'hidden', marginBottom: 8}}>
            <Image style={styles.castImage} source={{uri: profile_uri}} />
        </View>
        <Text style={styles.castName}>{name}</Text>
        <Text style={styles.castCharacterName}>{character || job}</Text> 
    </View>
))

const renderCredits = ({item}) => <Credits profile_uri={item.profile_uri} name={item.name} job={item.job} character={item.character} />

const keyExtractor = item => item.id + '' + (item.credit_id || '')

const mapStateToProps = state => ({
    movie: state.movie
})

export const Detail = connect(mapStateToProps, {fetchMovie})(({ route, fetchMovie, movie: { casts, crews, isLoading, movie }}) => {
    React.useEffect(() => {
        const {id} = route.params
        fetchMovie({id});
    }, [fetchMovie])
    
    if(isLoading || !movie) {
        return <Loading />
    }

    return (
            <ScrollView>
            <Image 
                source={{uri: movie.backdrop_uri}} 
                style={styles.backdrop}
                blurRadius={1}
                resizeMode={'cover'} />
            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <View style={styles.posterContainer}>
                        <Image
                        source={{uri: movie.poster_uri}}
                        style={styles.poster}
                        resizeMode='cover' />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>
                            {movie.title}
                        </Text>
                        <Text style={styles.year}>
                            {movie.release_year}
                        </Text>
                        <View style={styles.genreContainer}>{genreMapper(movie.genres)}</View>
                        <View style={{ justifyContent: 'flex-end'}}>
                            <Stars value={movie.vote_average}/>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Introduction</Text>
                    <Text style={styles.overview}>{movie.overview}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cast</Text>
                    <View style={styles.castContainer}>
                        <FlatList
                            updateCellsBatchingPeriod={60000}
                            maxToRenderPerBatch={5}
                            removeClippedSubviews={true}
                            data={casts}
                            renderItem={renderCredits}
                            horizontal={true}
                            keyExtractor={keyExtractor}
                            showsHorizontalScrollIndicator={false} />
                    </View>
                </View>

                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Crew</Text>
                    <View style={styles.castContainer}>
                        <FlatList
                            updateCellsBatchingPeriod={60000}
                            maxToRenderPerBatch={5}
                            removeClippedSubviews={true}
                            data={crews}
                            renderItem={renderCredits}
                            horizontal={true}
                            keyExtractor={keyExtractor}
                            showsHorizontalScrollIndicator={false} />
                    </View>
                </View>
            </View>
            </ScrollView>
    )
})

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        backgroundColor: 'white',
        paddingHorizontal: 8,
        marginTop: -24
    },
    posterContainer: {
        marginRight: 16
    },
    backdrop: {
        width: DEVICE.width,
        height: 200,
        opacity: .7
    },
    poster: {
        width: 140,
        height: 180,
        borderRadius: 8,
        marginTop: -72
    },
    headContainer: {
        padding: 16,
        flexDirection: 'row'
    },
    title: {
        fontFamily: 'Source-Sans-Pro-Bold',
        fontSize: 24,
        textTransform: 'uppercase',
        color: '#333'
    },
    year: {
        fontSize: 12,
        fontFamily: 'Source-Sans-Pro-Regular'
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    },
    genreWrapper: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 8,
        marginVertical: 4
    },
    genre: {
        paddingHorizontal:3,
        textTransform: 'lowercase',
        fontSize: 12,
        backgroundColor: '#ccc',
        color: '#fff',
        fontFamily: 'Source-Sans-Pro-Regular'
    },
    section: {
        marginVertical: 12,
        paddingHorizontal: 24
    },  
    sectionTitle: {
        fontFamily: 'Source-Sans-Pro-Bold',
        fontSize: 18,
        marginVertical: 8,
        color: '#333'
    },
    overview: {
        lineHeight: 24,
        fontFamily:'Source-Sans-Pro-Regular',
        color: '#333'
    },
    castContainer: {

    },
    castImage: {
        width: 80,
        height: 100,
        borderRadius: 8
    },
    castImageContainer: {
        marginRight: 8,
        width: 80,
    },
    castName: {
        fontSize:12,
        fontFamily:'Source-Sans-Pro-Regular',
    },
    castCharacterName: {
        fontSize: 12,
        opacity: .5,
        fontFamily:'Source-Sans-Pro-Regular',
    }
})
