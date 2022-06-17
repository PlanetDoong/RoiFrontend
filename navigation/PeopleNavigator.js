import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

// Import navigation and screens
import ViewPeopleScreen from '../screens/ViewPeopleScreen';
import ViewPersonScreen from '../screens/ViewPersonScreen';
import EditPersonScreen from '../screens/EditPersonScreen';

// Import styling and components
import Styles from "../styles/MainStyle";
import { View, Image, Text } from 'react-native';

const Stack = createStackNavigator();

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

export default function PeopleNavigator() {
  return (
    <Stack.Navigator
    initialRouteName='ViewPeople'
    screenOptions={{
      headerShown: true,
      headerBackTitle: "Back",
      headerStyle: Styles.headerBar,
      headerTitleStyle: Styles.headerBarTitle,
      }}>
      <Stack.Screen
      name="ViewPeople"
      component={ViewPeopleScreen}
      options={{ headerTitle: () => LogoTitle("View All Staff") }} />
      <Stack.Screen
      name="ViewPerson"
      component={ViewPersonScreen}
      options={{ headerTitle: () => LogoTitle("View Staff") }} />
      <Stack.Screen
      name="EditPerson"
      component={EditPersonScreen}
      options={{ headerTitle: () => LogoTitle("Edit Staff") }} />
    </Stack.Navigator>
  );
}