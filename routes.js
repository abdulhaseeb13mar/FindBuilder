import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/shared/RefNavigation';
import Home from './src/screens/Home/Home';
import Worker from './src/screens/Worker/Worker';
import ContactDetails from './src/screens/ContactDetails/ContactDetails';
import Search from './src/screens/SearchCivil/Search';
import CivilFav from './src/screens/CivilFav/CivilFav';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Worker" component={Worker} />
        <Stack.Screen name="ContactDetails" component={ContactDetails} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="CivilFav" component={CivilFav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
