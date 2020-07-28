import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

const UserCard = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            key={props.user.name}
            style={{ flexDirection: 'row', width: vw(80), justifyContent: 'space-around' }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    margin: 2,
                }}
            >
                {props.user.pfp ? (
                    <Image
                        source={{ uri: props.user.pfp }}
                        style={{ width: vw(9), height: vw(9), borderRadius: vw(4.5) }}
                    />
                ) : (
                    <Ionicons name="ios-contact" size={vw(9)} />
                )}
                <View>
                    <Text category="h6">{props.user.name}</Text>
                </View>
            </View>
            {props.request ? (
                <View style={{ flexDirection: 'row' }}>
                    <Button onPress={props.onConfirm} size="tiny">
                        {' '}
                        Confirm{' '}
                    </Button>
                    <Button onPress={props.onDelete} appearance="outline" size="tiny">
                        {' '}
                        Delete{' '}
                    </Button>
                </View>
            ) : null}
        </TouchableOpacity>
    );
};

export default UserCard;
