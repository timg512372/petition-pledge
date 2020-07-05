import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

import PetitionCard from '../../components/PetitionCard';

class PetitionModal extends Component {
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
                <Text category="h4"> Petition Information </Text>
                <ScrollView>
                    <PetitionCard person="Sasha" petition="Sample Petition" />
                </ScrollView>
            </View>
        );
    }
}

export default PetitionModal;
