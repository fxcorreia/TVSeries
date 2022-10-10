import { EpisodeModel } from "@data/model/series/EpisodeModel";
import { SerieModel } from "@data/model/series/SerieModel";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type EmptyNavProps = undefined;

export type SerieDetailsNavProps = {
  data: SerieModel;
};

export type EpisodeDetailsNavProps = {
  data: EpisodeModel;
};

export type WebViewScreenNavProps = {
  title: string;
  url: string;
};

export type PeopleDetailsScreenNavProps = {
  id: number;
  name: string;
};

export type RootStackParamList = {
  SeriesListScreen: EmptyNavProps;
  SerieDetailsScreen: SerieDetailsNavProps;
  EpisodeDetailsScreen: EpisodeDetailsNavProps;
  WebViewScreen: WebViewScreenNavProps;
  FavoritesScreen: EmptyNavProps;
  PeopleScreen: EmptyNavProps;
  PeopleDetailsScreen: PeopleDetailsScreenNavProps;
  Main: EmptyNavProps;
  Auth: EmptyNavProps;
  UpdatePinCodeScreen: EmptyNavProps;
};

export type RootStackParamListKeys = keyof RootStackParamList;

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
