import React from 'react';
import { View } from 'react-native';
import { Text, Popover } from '@ui-kitten/components';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';

const ProgressBar = (props) => {
    let fraction = Math.min(props.current / props.goal, 1) * vw(70);

    return (
        <View style={{ flexDirection: 'column', alignItems: 'center', width: vw(70) }}>
            {/* <Text>
                {props.current} of {props.goal} signed
            </Text> */}

            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'left',
                    width: vw(70),
                    marginTop: vw(0),
                }}
            >
                <View
                    style={{
                        marginBottom: -14,
                        zIndex: 10,
                        width: 100,
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginLeft: fraction - 50,
                    }}
                >
                    <Text style={{ marginBottom: -9 }}>{props.current}</Text>
                    <Entypo name="triangle-down" size={24} color="#3C2165" />
                </View>
                <View style={{ backgroundColor: '#DCE0E4', width: vw(70), borderRadius: vw(3) }}>
                    <View
                        style={{
                            width: fraction,
                            backgroundColor: 'green',
                            height: vw(3),
                            borderTopLeftRadius: vw(3),
                            borderBottomLeftRadius: vw(3),
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default ProgressBar;
