import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, FlatList, ScrollView } from 'react-native';
import { Stars } from './component';

const DEVICE = Dimensions.get('window');

import { base_url, getCredits } from '../../constants';

const getProfileURI = path => {        
    return `${base_url}w185${path}`
}

const mapProfileURI = list => {
    return [...list].map(item => {
        item.profile_uri = getProfileURI(item.profile_path);
        return item;
    })
}

const Loading = React.memo(() => (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Loading Movie Details ... </Text></View>));

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

export const Detail = ({route}) => {
    const [casts, setCasts] = React.useState([]);
    const [crews, setCrews] = React.useState([]);
    const [movie, setMovie] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        let cancelled = false;
        setMovie(route.params.movie)
        fetch(getCredits(movie.id))
            .then(res => {
                if(cancelled) throw new Error('cancelled!')
                return res;
            })
            .then(res => res.json())
            .then(({cast, crew}) => ({cast: mapProfileURI(cast), crew: mapProfileURI(crew)}))
            .then(({cast, crew}) => {
                if(!cancelled) {
                    setCasts(([...cast] || []).filter(item => item.profile_path));
                    setCrews(([...crew] || []).filter(item => item.profile_path));
                }
            })
            .then(_ => {
                setIsLoading(false);
            })
            .catch(err => {})

        return () => {
            cancelled = true;
        }
    })  
    
    

    if(isLoading) {
        return <Loading />
    }

    const {
        backdrop_uri, 
        genres, 
        title, 
        vote_average, 
        overview,
        release_year,
        poster_uri
    } = movie;

    return (
            <ScrollView>
            <Image 
                source={{uri:backdrop_uri}} 
                style={styles.backdrop}
                blurRadius={1}
                resizeMode={'cover'} />
            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <View style={styles.posterContainer}>
                        <Image
                        source={{uri: poster_uri}}
                        style={styles.poster}
                        resizeMode='cover' />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <Text style={styles.year}>
                            {release_year}
                        </Text>
                        <View style={styles.genreContainer}>{genreMapper(genres)}</View>
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
