import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import * as Linking from 'expo-linking';

import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

import PetitionCard from '../../components/PetitionCard';
import { signPetition } from '../../redux/actions';

class PetitionModal extends Component {
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
                <Text category="h6">By: {petition.creator}</Text>
                <Text category="h6">Description</Text>
                <Text>{petition.description}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(petition.url)}>
                    <Text category="h6" style={{ color: 'blue' }}>
                        Visit Petition{' '}
                    </Text>
                </TouchableOpacity>

                <Text style={{ marginTop: 10 }}>Signers</Text>
                {petition.signers.map((signer) => {
                    return <Text>{signer}</Text>;
                })}
                <Button>Sign This Petition</Button>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return { auth };
};

export default connect(mapStateToProps, { signPetition })(PetitionModal);
