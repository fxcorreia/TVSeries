/* eslint-disable react-hooks/exhaustive-deps */
import SerieListItem from "@app/features/series/components/SerieListItem";
import SeriesSlice, {
  SeriesSliceThunks,
} from "@app/features/series/SeriesSlice";
import NavigationManager from "@app/navigation/helpers/NavigationManager";
import { RootStackParamList } from "@app/navigation/helpers/types/RootStackNavigationTypes";
import Colors from "@app/styles/Colors";
import Styles from "@app/styles/Styles";
import { SerieModel } from "@data/model/series/SerieModel";
import useAppDispatch from "@hooks/useAppDispatch";
import useShallowEqualAppSelector from "@hooks/useShallowEqualAppSelector";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { debounce } from "lodash";
import _ from "lodash";
import { IconArrowLeft, IconArrowRight } from "@assets/svgs";
import Header from "@app/components/loading/header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@data/database/async-storage/AsyncStorage";
import AuthModal from "@app/features/series/components/AuthModal";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "UpdatePinCodeScreen"
> & {};

const UpdatePinCodeScreen = ({}: Props) => {
  const [t] = useTranslation();
  const [actualPin, setActualPin] = useState<string>("");
  const [newPin, setNewPin] = useState<string>("");
  const [savedPinCode, setSavedPinCode] = useState<string>("");
  const [diffPinError, setDiffPinError] = useState<boolean>(false);
  const [emptyError, setEmptyError] = useState<boolean>(false);

  const isActualPinDifferent = () => {
    if (savedPinCode !== actualPin) {
      setDiffPinError(true);
      return true;
    } else {
      setDiffPinError(false);
      return false;
    }
  };

  const pinEmpty = () => {
    if (_.trim(newPin) === "") {
      setEmptyError(true);
      return true;
    } else {
      setEmptyError(false);
      return false;
    }
  };

  const updatePin = async () => {
    if (!isActualPinDifferent() && !pinEmpty()) {
      await AsyncStorage.setPinCode(newPin);

      setActualPin("");
      setNewPin("");
      setSavedPinCode("");
      setDiffPinError(false);
      setEmptyError(false);
    }
  };

  const getPin = async () => {
    const val = await AsyncStorage.getPinCode();
    if (!_.isNil(val)) {
      setSavedPinCode(val);
      return val;
    }
  };

  useEffect(() => {
    getPin();
  }, []);

  return (
    <SafeAreaView edges={["top"]} style={styles.mainContainer}>
      <LinearGradient
        colors={[Colors.white, Colors.gradientEnd]}
        style={styles.mainContainer}
      >
        <Header
          title={t("screens.settings.update_pincode_screen")}
          titleStyle={styles.title}
          hasMenu
        />
        <View style={styles.screenMargin}>
          <Text style={styles.textSubtitle}>
            {t("screens.settings.enter_actual")}
          </Text>
          <View
            style={[styles.searchBarContainer, diffPinError && styles.error]}
          >
            <TextInput
              placeholder={t("screens.settings.actual_pin")}
              placeholderTextColor={Colors.primary}
              selectionColor={Colors.primary}
              style={styles.textInput}
              value={actualPin}
              keyboardType="number-pad"
              onChangeText={(text: string) => setActualPin(text)}
            />
          </View>
          {diffPinError && (
            <Text style={styles.errorText}>
              {t("screens.settings.pin_dont_match")}
            </Text>
          )}
          <Text style={[styles.textSubtitle, { marginTop: 20 }]}>
            {t("screens.settings.enter_new")}
          </Text>
          <View style={[styles.searchBarContainer, emptyError && styles.error]}>
            <TextInput
              placeholder={t("screens.settings.new_pin")}
              placeholderTextColor={Colors.primary}
              selectionColor={Colors.primary}
              style={styles.textInput}
              value={newPin}
              keyboardType="number-pad"
              onChangeText={(text: string) => setNewPin(text)}
            />
          </View>
          {emptyError && (
            <Text style={styles.errorText}>
              {t("screens.settings.empty_pin")}
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={updatePin}
          style={styles.button}
          //   disabled={actualPin<   7!== newPin ? true : false}
        >
          <Text style={styles.buttonText}>{t("screens.settings.save")}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  screenMargin: {
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  title: {
    color: Colors.black,
  },
  subtitle: {
    ...Styles.text.frontTitle,
    marginTop: 20,
  },
  searchBarContainer: {
    backgroundColor: Colors.primary_30Pct,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 15,

    justifyContent: "center",
  },
  textInput: {
    color: Colors.primary,
  },
  textSubtitle: {
    ...Styles.text.values,
    marginBottom: 10,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: Colors.primary,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 12,
  },
  buttonText: {
    ...Styles.text.button,
    textTransform: "uppercase",
  },
  disable: {
    backgroundColor: Colors.inactive,
  },
  error: {
    borderColor: Colors.red,
    borderWidth: 1,
  },
  errorText: {
    fontSize: 10,
    color: "red",
    textAlign: "center",
  },
});

export default UpdatePinCodeScreen;
