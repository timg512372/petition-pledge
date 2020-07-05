import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

import PetitionCard from '../../components/PetitionCard';

class ExplorePetition extends Component {
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
                <Text category="h4"> Explore Petitions </Text>
                <ScrollView style={{ flexWrap: 'wrap', flexDirection: 'row', width: vw(90) }}>
                    <Text>Hello</Text>
                    <PetitionCard person="Sasha" petition="Sample Petition" />
                    <PetitionCard person="Sasha" petition="Sample Petition" />
                    <PetitionCard person="Sasha" petition="Sample Petition" />
                    <PetitionCard person="Sasha" petition="Sample Petition" />
                    <PetitionCard person="Sasha" petition="Sample Petition" />
                    <PetitionCard person="Sasha" petition="Sample Petition" />
                    <PetitionCard person="Sasha" petition="Sample Petition" />
                    <PetitionCard person="Sasha" petition="Sample Petition" />
                </ScrollView>
            </View>
        );
    }
}

export default ExplorePetition;
