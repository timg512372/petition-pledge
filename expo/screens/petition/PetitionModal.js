import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import * as Linking from 'expo-linking';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

import { signPetition, getSelectedUser } from '../../redux/actions';
import UserCard from '../../components/UserCard';

class PetitionModal extends Component {
    componentDidMount() {
        this.props.getSelectedUser(this.props.route.params.petition.creator, this.props.auth.token);
    }

    render() {
        const { petition } = this.props.route.params;
        console.log(petition);
        return (
            <View
                style={{
                    paddingHorizontal: vw(5),
                    paddingTop: vw(10),
                    width: vw(100),
                    height: vh(100),
                }}
            >
                <Text category="h4">{petition.name} </Text>
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
                        Linking.openURL(petition.url).catch(Alert.alert('Unable to open link'))
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
                >
                    Sign This Petition
                </Button>
                <Text>{this.props.status.loading ? 'Loading' : null}</Text>
                <Text>{this.props.status.error ? this.props.status.error : null}</Text>
                <Text>{this.props.status.success ? this.props.status.success : null}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth, status, petition } = state;
    return { auth, status, petition };
};

export default connect(mapStateToProps, { signPetition, getSelectedUser })(PetitionModal);
