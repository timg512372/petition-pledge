import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

const UserCard = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} key={props.user.name}>
            <View
                style={{
                    flexDirection: 'row',
                    width: vw(80),
                    justifyContent: 'flex-start',
                    margin: 2,
                }}
            >
                <Ionicons name="ios-contact" size={vw(7)} />
                <View>
                    <Text category="h6">{props.user.name}</Text>
                </View>
            </View>
            {props.request ? (
                <>
                    <Button onPress={props.onConfirm}> Confirm </Button>
                    <Button onPress={props.onDelete}> Delete </Button>
                </>
            ) : null}
        </TouchableOpacity>
    );
};

export default UserCard;
