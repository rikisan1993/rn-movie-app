import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, FlatList, ScrollView } from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import { Stars } from './component';

const DEVICE = Dimensions.get('window');

import { base_url, getCredits } from '../../constants';

export const Detail = ({route}) => {
    const [casts, setCasts] = React.useState([]);
    const [crews, setCrews] = React.useState([]);
    const [movie, setMovie] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        setMovie(route.params.movie)
        const {id} = route.params.movie;
        fetch(getCredits(movie.id))
            .then(res => res.json())
            .then(({cast, crew}) => {
                setCasts(cast);
                setCrews(crew);
                setIsLoading(false);
                setIsError(false);
            })
            .catch(err => {
                setIsError(true);
                console.log({err})
            })
    })  
    
    const getBackdropURI = path => {        
        return `${base_url}w1280${path}`
    }

    const getPosterURI = path => {        
        return `${base_url}w342${path}`
    }

    const getProfileURI = path => {        
        return `${base_url}w185${path}`
    }

    const getReleaseYear = date => {
        return `(${date.split('-')[0]})`;
    }

    if(isLoading) {
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Loading Movie Details ... </Text></View>
    }

    if(isError) {
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Failed to load Movie Details</Text></View>
    }

    const {
        backdrop_path, 
        genres, 
        poster_path, 
        release_date, 
        title, 
        vote_average, 
        overview 
    } = movie;

    return (
            <ScrollView>
            <CachedImage 
                source={{uri:getBackdropURI(backdrop_path)}} 
                style={styles.backdrop}
                blurRadius={1}
                resizeMode={'cover'} />
            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <View style={styles.posterContainer}>
                        <CachedImage
                        source={{uri: getPosterURI(poster_path)}}
                        style={styles.poster}
                        resizeMode='cover' />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <Text style={styles.year}>
                            {getReleaseYear(release_date)}
                        </Text>
                        <View style={styles.genreContainer}>
                        {genres.map((genre, index) =>(
                            <View style={styles.genreWrapper} key={index}>
                                <Text style={styles.genre}>{genre}</Text>
                            </View>
                        ))}
                        </View>
                        <View style={{ justifyContent: 'flex-end'}}>
                            <Stars value={vote_average}/>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Introduction</Text>
                    <Text style={styles.overview}>{overview}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cast</Text>
                    <View style={styles.castContainer}>
                        <FlatList
                            updateCellsBatchingPeriod={1000}
                            maxToRenderPerBatch={5}
                            removeClippedSubviews={true}
                            data={(casts || []).filter(caster => !!caster.profile_path)}
                            renderItem={({item}) => {
                                return (
                                    <View style={styles.castImageContainer}>
                                        <View style={{ backgroundColor: '#ccc', borderRadius: 8, overflow: 'hidden', marginBottom: 8}}>
                                            <CachedImage style={styles.castImage} source={{uri: getProfileURI(item.profile_path)}} />
                                        </View>
                                        <Text style={styles.castName}>{item.name}</Text>
                                        <Text style={styles.castCharacterName}>{item.character}</Text> 
                                    </View>
                                )
                            }}
                            horizontal={true}
                            keyExtractor={item => item.id + ''}
                            showsHorizontalScrollIndicator={false} />
                    </View>
                </View>

                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Crew</Text>
                    <View style={styles.castContainer}>
                        <FlatList
                            updateCellsBatchingPeriod={1000}
                            maxToRenderPerBatch={5}
                            removeClippedSubviews={true}
                            data={(crews || []).filter(crew => crew.profile_path != null)}
                            renderItem={({item}) => {
                                return (
                                    <View style={styles.castImageContainer}>
                                        <View style={{ backgroundColor: '#ccc', borderRadius: 8, overflow: 'hidden', marginBottom: 8}}>
                                            <CachedImage style={styles.castImage} source={{uri: getProfileURI(item.profile_path)}} />
                                        </View>
                                        <Text style={styles.castName}>{item.name}</Text>
                                        <Text style={styles.castCharacterName}>{item.job}</Text> 
                                    </View>
                                )}
                            }
                            horizontal={true}
                            keyExtractor={item => item.id + '' + item.credit_id}
                            showsHorizontalScrollIndicator={false} />
                    </View>
                </View>
            </View>
            </ScrollView>
    )
}

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
