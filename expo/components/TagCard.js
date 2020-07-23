import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';

const TagCard = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} key={props.tag.name}>
            <View style={{ backgroundColor: 'grey', borderRadius: 10, padding: 5, margin: 5 }}>
                <Text style={{ color: 'white' }}>{props.tag.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default TagCard;
