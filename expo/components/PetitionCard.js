import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { PETITION } from '../assets';

const PetitionCard = (props) => {
    const { petition } = props;

    return (
        <TouchableOpacity onPress={props.onPress} key={petition._id}>
            <View
                style={{ width: vw(35), margin: 5, flexDirection: props.search ? 'row' : 'column' }}
            >
                <Image
                    source={petition.picture ? { uri: petition.picture } : PETITION}
                    style={{
                        width: !props.search ? vw(30) : vw(10),
                        height: !props.search ? vw(30) : vw(10),
                    }}
                />
                <View style={{ flexDirection: 'column' }}>
                    <Text category="h6"> {petition.name} </Text>
                    <Text> {petition.description} </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default PetitionCard;
