import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image'
import { Stars } from './Stars';
import Icon from '@expo/vector-icons/FontAwesome';

import { genres, base_url } from  '../../../constants';

export const ListItem = ({data}) => {
    const getPosterURI = path => {
        return `${base_url}w342${path}`
    }

    const getReleaseYear = date => {
        return `(${date.split('-')[0]})`;
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <FastImage source={{ uri: getPosterURI(data.poster_path) }} style={styles.image} />
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.title} numberOfLines={2} lineBreakMode={'clip'}>{data.title}</Text>
                <Stars value={data.vote_average} />
                <Text style={styles.year}>{getReleaseYear(data.release_date)}</Text>
                <View style={styles.genreContainer}>
                    {data.genres.map((name, index) =>(
                        <View style={styles.genreWrapper} key={index}>
                            <Text style={styles.genre}>{name}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.listButton}>
                    <TouchableOpacity>
                        <View style={styles.favButton}>
                            <Icon name='star' size={16} color={'#fff'} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.watchlistButton}>
                            <Text style={styles.watchlistText}>watchlist</Text>
                            <Icon name='plus' size={16} color={'#fff'} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 8,
    },
    imageContainer:{
        marginRight: 16,
    },
    image: {
        width: 150,
        height: 210,
        borderRadius: 4,
        overflow: 'hidden'
    },
    detailContainer: {
        flex: 1
    },
    title: {
        fontFamily: 'Source-Sans-Pro-Bold',
        fontSize: 20,
        marginBottom: 8,
        color: '#333',
        textTransform: 'uppercase'
    },
    year: {
        fontFamily: 'Source-Sans-Pro-Regular',
        fontSize: 14,
        color: '#333'
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 12,
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
    listButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    favButton: {
        backgroundColor: '#28D8A1',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        width: 32,
        marginRight: 8,
        borderRadius: 4
    },
    watchlistButton: {
        backgroundColor: '#28D8A1',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 32,
        paddingHorizontal: 12,
        borderRadius: 4
    },
    watchlistText: {
        color: '#fff',
        paddingRight: 8,
        fontSize: 16,
        marginTop: -2
    }
})