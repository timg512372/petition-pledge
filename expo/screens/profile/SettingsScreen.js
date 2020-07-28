import React, { Component } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { logoutUser, changeProfilePicture, setBio } from '../../redux/actions';

class SettingsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: '',
            bio: this.props.auth.user.bio,
        };
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
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
                this.setState({ image: result.uri });
            }
            this.props.changeProfilePicture(result, this.props.auth.token);
            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    render() {
        return (
            <View
                style={{
                    paddingHorizontal: vw(5),
                    paddingTop: vw(10),
                    width: vw(100),
                    height: vh(100),
                }}
            >
                <Text category="h4"> Settings </Text>
                <Text category="h4"> Profile Picture </Text>
                {this.state.image ? (
                    <Image source={{ uri: this.state.image }} style={{ width: 300, height: 300 }} />
                ) : null}
                <Button onPress={this.pickImage}> Choose Profile Picture </Button>

                <Input
                    placeholder="Your Bio"
                    multiline={true}
                    onChangeText={(bio) => this.setState({ bio })}
                    value={this.state.bio}
                    textStyle={{ minHeight: 64 }}
                />
                <Button onPress={() => this.props.setBio(this.state.bio, this.props.auth.token)}>
                    {' '}
                    Set Bio{' '}
                </Button>

                <Button
                    onPress={() =>
                        this.props.logoutUser(this.props.auth.token, this.props.navigation)
                    }
                >
                    Log Out
                </Button>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth, status } = state;
    return { auth, status };
};

export default connect(mapStateToProps, { logoutUser, changeProfilePicture, setBio })(
    SettingsScreen
);
