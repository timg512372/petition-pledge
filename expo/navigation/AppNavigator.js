import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import SignInScreen from '../screens/auth/SignInScreen';
import NewUserScreen from '../screens/auth/NewUserScreen';

import TimelineScreen from '../screens/timeline/TimelineScreen';

import ExplorePetitionScreen from '../screens/petition/ExplorePetitionScreen';
import NewPetitionScreen from '../screens/petition/NewPetitionScreen';
import PetitionModal from '../screens/petition/PetitionModal';
import TagScreen from '../screens/petition/TagScreen';

import ProfileModal from '../screens/profile/ProfileModal';
import ProfileScreen from '../screens/profile/ProfileScreen';
import InboxScreen from '../screens/profile/InboxScreen';
import FriendsScreen from '../screens/profile/FriendsScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import { Settings } from 'react-native';

const Auth = createStackNavigator();
const AuthNavigator = () => {
    return (
        <Auth.Navigator headerMode={null}>
            <Auth.Screen name="SignIn" component={SignInScreen} />
            <Auth.Screen name="NewUser" component={NewUserScreen} />
            {/* <Auth.Screen name="ForgetPassword" component={ForgetPasswordScreen} /> */}
        </Auth.Navigator>
    );
};

const Discover = createStackNavigator();
const DiscoverNavigator = () => {
    return (
        <Discover.Navigator headerMode={null}>
            <Discover.Screen name="Tag" component={TagScreen} />
            <Discover.Screen name="ExplorePetition" component={ExplorePetitionScreen} />
        </Discover.Navigator>
    );
};

const Profile = createStackNavigator();
const ProfileNavigator = () => {
    return (
        <Profile.Navigator headerMode={null}>
            <Profile.Screen name="Profile" component={ProfileScreen} />
            <Profile.Screen name="Friends" component={FriendsScreen} />
            <Profile.Screen name="Settings" component={SettingsScreen} />
        </Profile.Navigator>
    );
};

const User = createBottomTabNavigator();
const UserNavigator = () => {
    return (
        <User.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = icons[route.name];
                    return (
                        <Ionicons
                            name={iconName}
                            size={route.name == 'Add' ? size * 1.6 : size}
                            style={{ marginBottom: -5, marginTop: 4 }}
                            color={color}
                        />
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: '#67438D',
                inactiveTintColor: '#56a993',
                style: {
                    marginTop: -1,
                    zIndex: -10,
                },
            }}
        >
            <User.Screen name="Home" component={TimelineScreen} />
            <User.Screen name="Discover" component={DiscoverNavigator} />
            <User.Screen
                options={{
                    tabBarLabel: '',
                }}
                name="Add"
                component={NewPetitionScreen}
            />
            <User.Screen name="Inbox" component={InboxScreen} />
            <User.Screen name="Me" component={ProfileNavigator} />
        </User.Navigator>
    );
};

const Modal = createStackNavigator();
const ModalNavigator = () => {
    return (
        <Modal.Navigator
            headerMode={null}
            mode="modal"
            cardStyle={{ backgroundColor: 'transparent', opacity: 0.99 }}
        >
            <Modal.Screen name="User" component={UserNavigator} />
            <Modal.Screen name="PetitionModal" component={PetitionModal} />
            <Modal.Screen name="ProfileModal" component={ProfileModal} />
        </Modal.Navigator>
    );
};

const App = createStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <App.Navigator headerMode={null}>
                <App.Screen name="Auth" component={AuthNavigator} />
                <App.Screen
                    name="User"
                    component={ModalNavigator}
                    options={{ gestureEnabled: false }}
                />
            </App.Navigator>
        </NavigationContainer>
    );
};

const icons = {
    Home: 'ios-home',
    Discover: 'ios-search',
    Inbox: 'ios-mail',
    Add: 'ios-add-circle-outline',
    Me: 'ios-contact',
};

export default AppNavigator;
