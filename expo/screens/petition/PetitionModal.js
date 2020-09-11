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
import ProgressBar from '../../components/ProgressBar';
import TopBar from '../../components/TopBar';

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

        return (
            <View
                style={{
                    paddingHorizontal: vw(5),
                    paddingTop: vw(10),
                    width: vw(100),
                    height: vh(100),
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                }}
            >
                <TopBar />
                <Text
                    category="h2"
                    status="primary"
                    style={{ textAlign: 'left', marginTop: vw(1), width: vw(80) }}
                >
                    {petition.name}{' '}
                </Text>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('ProfileModal', {
                            user: this.props.petition.selectedUser,
                        })
                    }
                >
                    <Text category="h6" status="success" style={{ width: vw(75) }}>
                        by {this.props.petition.selectedUser.name}
                    </Text>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                    <Image
                        source={{ uri: petition.picture }}
                        style={{
                            width: vw(60),
                            height: vw(60),
                            marginVertical: vw(7),
                            borderRadius: vw(5),
                        }}
                    />
                    <Text
                        category="h6"
                        status="primary"
                        style={{ marginBottom: vw(7), paddingHorizontal: vw(6) }}
                    >
                        {petition.description}
                    </Text>

                    <ProgressBar current={petition.signers.length} goal={petition.goal} />
                    <View
                        style={{
                            width: vw(68),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginVertical: vw(1),
                        }}
                    >
                        <TouchableOpacity
                            onPress={() =>
                                WebBrowser.openBrowserAsync(
                                    petition.url.includes('http')
                                        ? petition.url
                                        : 'http://' + petition.url
                                )
                            }
                        >
                            <Text style={{ textDecorationLine: 'underline' }}>Visit Petition </Text>
                        </TouchableOpacity>
                        <Text>
                            {petition.signers.length}/{petition.goal}
                        </Text>
                    </View>

                    <Button style={{ marginTop: vw(15), width: vw(40), marginBottom: vw(7) }}>
                        Other Signers
                    </Button>

                    <Button
                        onPress={() => this.props.signPetition(petition._id, this.props.auth.token)}
                        disabled={signed}
                        status="success"
                    >
                        {signed ? 'Already Signed' : 'Sign This Petition'}
                    </Button>
                    <UserFeedback
                        {...this.props.status}
                        onSuccess={() => this.props.navigation.navigate('Profile')}
                    />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth, status, petition } = state;
    return { auth, status, petition };
};

export default connect(mapStateToProps, { signPetition, getSelectedUser })(PetitionModal);
