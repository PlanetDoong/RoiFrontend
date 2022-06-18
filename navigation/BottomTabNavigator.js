import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

// Import styling and components
import TabBarIcon from '../components/TabBarIcon';
import Colours from "../constants/Colours";
import Styles from "../styles/MainStyle";
import { View, Image, Text } from 'react-native';

// Import navigators & screens
import HomeScreen from '../screens/HomeScreen';
import PeopleNavigator from './PeopleNavigator';
import AddPersonScreen from '../screens/AddPerson';
import SettingsScreen from '../screens/SettingsScreen';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

function LogoTitle(titleText) {
  return (
    <View style={Styles.headerContainer}>
      <Image
        style={Styles.headerLogo}
        source={require("../assets/images/roi-logo.jpg")}
      />
      <Text style={Styles.headerBarTitle}>{titleText}</Text>
    </View>
  );
}

export default function BottomTabNavigator({ navigation, route }) {

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: Colours.tabLabelSelected,
        tabBarInactiveTintColor: Colours.tabLabel,
        tabBarStyle: Styles.navBar,
        tabBarLabelStyle: Styles.navBarLabel,
        headerStyle: Styles.headerBar,
        headerTitleStyle: Styles.headerBarTitle,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />
        }}
      />
      <BottomTab.Screen
        name="People"
        component={PeopleNavigator}
        options={{
          title: 'View People',
          headerShown: false,
          unmountOnBlur: true, // Reset the screen when it loses focus (when someone navigates away from it)
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />
        }}
      />
      <BottomTab.Screen
        name="AddPerson"
        component={AddPersonScreen}
        options={{
          headerTitle: () => LogoTitle("Add Staff"),
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person-add" />,
          
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: () => LogoTitle("Settings"),
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-help-circle" />,
        }}
      />
    </BottomTab.Navigator>
  );
}