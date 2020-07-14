import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

const ProgressBar = (props) => {
    let fraction = Math.min(props.current / props.goal, 1) * vw(70);

    return (
        <View style={{ flexDirection: 'column', alignItems: 'center', width: vw(70) }}>
            <Text>
                {props.current} of {props.goal} signed
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'left',
                    width: vw(70),
                    backgroundColor: '#DCE0E4',
                    marginTop: vw(1),
                    borderTopRightRadius: vw(3),
                    borderBottomRightRadius: vw(3),
                }}
            >
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
    );
};

export default ProgressBar;
