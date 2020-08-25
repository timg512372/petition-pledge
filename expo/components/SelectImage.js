import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';

import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

class SelectImage extends Component {
    componentDidMount = () => {
        this.getPermissionAsync();
    };

    getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    };

    pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.props.setImage(result);
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    render() {
        return (
            <TouchableOpacity
                onPress={this.pickImage}
                style={{ width: vw(50), alignItems: 'center' }}
            >
                {this.props.uri ? (
                    <>
                        <Image
                            source={{ uri: this.props.uri }}
                            style={{ width: vw(50), height: vw(50), resizeMode: 'contain' }}
                        />
                        <Text category="h6"> Change Image </Text>
                    </>
                ) : (
                    <View
                        style={{
                            width: vw(50),
                            height: vw(50),
                            backgroundColor: '#E2FAEA',
                            borderWidth: 2,
                            borderStyle: 'dashed',
                            borderColor: '#56a993',
                            borderRadius: vw(2),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Ionicons
                            name="ios-add-circle-outline"
                            size={vw(10)}
                            style={{ marginBottom: -5, marginTop: 4 }}
                            color="#2B7974"
                        />
                        <Text style={{ color: '#2B7974' }}> Select Image </Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    }
}

export default SelectImage;
