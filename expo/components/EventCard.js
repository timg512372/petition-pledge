import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { PETITION } from '../assets';

const EventCard = (props) => {
    return (
        <View>
            <Text category="h6"> Sample Event </Text>
            <Text> {props.person} signed </Text>
            <Text>{props.petition}</Text>
            <Image source={PETITION} style={{ width: 488 / 3, height: 488 / 3 }} />
        </View>
    );
};

export default EventCard;
