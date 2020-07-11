import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import Icon from '@expo/vector-icons/FontAwesome';

const DEVICE = Dimensions.get('window');
import { AuthContext } from '../../auth-context';

export const Profile = () => {
    const { signout } = React.useContext(AuthContext);
    return (
        <View>
            <CachedImage source={{uri: 'https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}} style={styles.backdrop} />
            <View style={styles.main}>
                <View style={styles.profile}>
                    <View style={styles.profilePictureContainer}>
                        <View style={styles.profileBackdrop}>
                            <CachedImage style={styles.profilePicture} source={{uri: 'https://sanbercode.com/images/profil/profil_user_5239_image.jpg'}} />
                        </View>
                    </View>

                    <Text style={styles.name}>Riki Syahputra</Text>
                    <Text style={styles.email}>kosiriki@gmail.com</Text>
                </View>

                <View>
                    <TouchableOpacity style={styles.signout} onPress={signout}>
                        <Text style={styles.signoutText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.links}>
                    <TouchableOpacity style={styles.link}>
                        <Icon style={styles.linkIcon} name='github' size={24} />
                        <Text style={styles.linkName}>github.com/rikisan1993</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.link}>
                        <Icon style={styles.linkIcon} name='gitlab' size={24} />
                        <Text style={styles.linkName}>github.com/riki.syahputra</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.link}>
                        <Icon style={styles.linkIcon} name='gitlab' size={24} />
                        <Text style={styles.linkName}>github.com/rksp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: '#6A6868',
        height: 200,
    },
    main: {
        borderRadius: 12,
        marginTop: -24,
        backgroundColor: '#fff',
    },
    profile: {
        marginTop: -36
    },
    profilePictureContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileBackdrop: {
        width: 130,
        height:130,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        borderColor: '#d0d0d0',
        borderRadius: 4,
        backgroundColor: '#fff'
    },  
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 4
    },
    name: {
        fontFamily: 'Source-Sans-Pro-Bold',
        fontSize: 24,
        color: '#333',
        textAlign: 'center',
        marginTop: 12
    },
    email: {
        fontFamily: 'Source-Sans-Pro-Regular',
        fontSize: 14,
        color: '#333',
        textAlign: 'center'
    },
    links: {
        padding: 16,
        marginVertical: 96
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginBottom: 12
    },
    linkIcon: {
        marginRight: 16,
        color: '#333'
    },
    linkName: {
        fontSize: 16,
        fontFamily: 'Source-Sans-Pro-Regular',
        color: '#333',
        marginTop: -2
    },
    signout: {
        width: '30%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 24,
        padding: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 4
    },
    signoutText: {
        fontSize: 14,
        fontFamily: 'Source-Sans-Pro-Regular',
        color: '#333',
    }
})