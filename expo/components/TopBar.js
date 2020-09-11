import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Entypo } from '@expo/vector-icons';

class TopBar extends Component {
    state = {
        fadeAnim: new Animated.Value(0.1),
    };

    componentDidMount() {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.fadeAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(this.state.fadeAnim, {
                    toValue: 0.1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }

    render() {
        return (
            <Animated.View
                style={[
                    {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    {
                        opacity: this.state.fadeAnim, // Bind opacity to animated value
                    },
                ]}
            >
                <Entypo name="triangle-down" size={24} color="#CCCCCC" />
                <Entypo name="triangle-down" size={24} color="#CCCCCC" />
                <Entypo name="triangle-down" size={24} color="#CCCCCC" />
                <Text style={{ color: '#CCCCCC', letterSpacing: 5 }}> swipe down </Text>
                <Entypo name="triangle-down" size={24} color="#CCCCCC" />
                <Entypo name="triangle-down" size={24} color="#CCCCCC" />
                <Entypo name="triangle-down" size={24} color="#CCCCCC" />
            </Animated.View>
        );
    }
}

export default TopBar;
