import EpisodeDetailsScreen from "@app/features/episodes/EpisodeDetailsScreen";
import PeopleDetailsScreen from "@app/features/people/PeopleDetailsScreen";
import PeopleScreen from "@app/features/people/PeopleScreen";
import SerieDetailsScreen from "@app/features/series/SerieDetailsScreen";
import SeriesListScreen from "@app/features/series/SeriesListScreen";
import UpdatePinCodeScreen from "@app/features/settings/UpdatePinCodeScreen";
import WebViewScreen from "@app/features/webview/WebViewScreen";
import { RootStackParamList } from "@app/navigation/helpers/types/RootStackNavigationTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator<RootStackParamList>();

const SettingsStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={"UpdatePinCodeScreen"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={"UpdatePinCodeScreen"}
          component={UpdatePinCodeScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default SettingsStack;
