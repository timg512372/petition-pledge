import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

import { signPetition, getSelectedUser } from '../../redux/actions';
import UserCard from '../../components/UserCard';
import UserFeedback from '../../components/UserFeedback';

class PetitionModal extends Component {
    componentDidMount() {
        if (this.props.route.params.petition) {
            this.props.getSelectedUser(
                this.props.route.params.petition.creator,
                this.props.auth.token
            );
        }
    }

    render() {
        const { petition } = this.props.route.params;
        if (!petition) {
            return (
                <View style={{ marginTop: vw(10) }}>
                    <Text category="h3">Petition not found!</Text>
                </View>
            );
        }

        let signed = petition.signers.includes(this.props.auth.user._id);
        console.log(signed);

        return (
            <View
                style={{
                    paddingHorizontal: vw(5),
                    paddingTop: vw(10),
                    width: vw(100),
                    height: vh(100),
                    alignItems: 'center',
                }}
            >
                <Text category="h4">{petition.name} </Text>
                <Image
                    source={{ uri: petition.picture }}
                    style={{ width: vw(40), height: vw(40) }}
                />
                <Text category="h6" style={{ marginTop: vh(2) }}>
                    Created By
                </Text>

                <UserCard
                    user={this.props.petition.selectedUser}
                    onPress={() =>
                        this.props.navigation.navigate('ProfileModal', {
                            user: this.props.petition.selectedUser,
                        })
                    }
                />
                <Text category="h6">Description</Text>
                <Text>{petition.description}</Text>
                <TouchableOpacity
                    onPress={() =>
                        WebBrowser.openBrowserAsync(
                            petition.url.includes('http') ? petition.url : 'http://' + petition.url
                        )
                    }
                >
                    <Text category="h6" style={{ color: 'blue' }}>
                        Visit Petition{' '}
                    </Text>
                </TouchableOpacity>

                <Text style={{ marginTop: 10 }}>Signers</Text>
                {petition.signers.map((signer) => {
                    return <Text>{signer}</Text>;
                })}
                <Button
                    onPress={() => this.props.signPetition(petition._id, this.props.auth.token)}
                    disabled={signed}
                >
                    {signed ? 'Already Signed' : 'Sign This Petition'}
                </Button>
                <UserFeedback
                    {...this.props.status}
                    onSuccess={() => this.props.navigation.navigate('Profile')}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth, status, petition } = state;
    return { auth, status, petition };
};

export default connect(mapStateToProps, { signPetition, getSelectedUser })(PetitionModal);
