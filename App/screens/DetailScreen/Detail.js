import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, FlatList, ScrollView } from 'react-native';

import { ScreenContainer } from '../../components';
import data from './sample/data.json';
import config from './sample/configuration.json';
import { cast, crew } from './sample/cast.json';

import { Stars } from './component';

const DEVICE = Dimensions.get('window')

export const Detail = ({id}) => {
    
    const getBackdropURI = path => {
        const { base_url, backdrop_sizes} = config.images;
        return `${base_url}${backdrop_sizes[2]}${path}`
    }

    const getPosterURI = path => {
        const { base_url, poster_sizes} = config.images;
        return `${base_url}${poster_sizes[3]}${path}`
    }

    const getProfileURI = path => {
        const { base_url, profile_sizes} = config.images;
        return `${base_url}${profile_sizes[1]}${path}`
    }

    const getReleaseYear = date => {
        return `(${date.split('-')[0]})`;
    }

    return (
        <ScreenContainer>
            <ScrollView>
            <Image 
                source={{uri:getBackdropURI(data.backdrop_path)}} 
                style={styles.backdrop}
                blurRadius={1}
                resizeMode={'cover'} />
            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <View style={styles.posterContainer}>
                        <Image
                        source={{uri: getPosterURI(data.poster_path)}}
                        style={styles.poster}
                        resizeMode='cover' />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>
                            {data.title}
                        </Text>
                        <Text style={styles.year}>
                            {getReleaseYear(data.release_date)}
                        </Text>
                        <View style={styles.genreContainer}>
                        {data.genres.map(({id, name}) =>(
                            <View style={styles.genreWrapper} key={id}>
                                <Text style={styles.genre}>{name}</Text>
                            </View>
                        ))}
                        </View>
                        <View style={{ justifyContent: 'flex-end'}}>
                            <Stars value={data.vote_average}/>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Introduction</Text>
                    <Text style={styles.overview}>{data.overview}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cast</Text>
                    <View style={styles.castContainer}>
                        <FlatList
                            data={cast.filter(caster => !!caster.profile_path)}
                            renderItem={({item}) => {
                                return (
                                    <View style={styles.castImageContainer}>
                                        <View style={{ backgroundColor: '#ccc', borderRadius: 8, overflow: 'hidden', marginBottom: 8}}>
                                            <Image style={styles.castImage} source={{uri: getProfileURI(item.profile_path)}} />
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
                            data={crew.filter(crew => crew.profile_path != null)}
                            renderItem={({item}) => {
                                return (
                                    <View style={styles.castImageContainer}>
                                        <View style={{ backgroundColor: '#ccc', borderRadius: 8, overflow: 'hidden', marginBottom: 8}}>
                                            <Image style={styles.castImage} source={{uri: getProfileURI(item.profile_path)}} />
                                        </View>
                                        <Text style={styles.castName}>{item.name}</Text>
                                        <Text style={styles.castCharacterName}>{item.job}</Text> 
                                    </View>
                                )
                            }}
                            horizontal={true}
                            keyExtractor={item => item.id + '' + item.credit_id}
                            showsHorizontalScrollIndicator={false} />
                    </View>
                </View>
            </View>
            </ScrollView>
        </ScreenContainer>
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
