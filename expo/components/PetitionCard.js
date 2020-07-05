import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { PETITION } from '../assets';

const PetitionCard = (props) => {
    return (
        <View style={{ width: vw(35), margin: 5 }}>
            <Text category="h6"> Petition Name </Text>
            <Text> Short petition description </Text>
            <Image source={PETITION} style={{ width: vw(30), height: vw(30) }} />
        </View>
    );
};

export default PetitionCard;
