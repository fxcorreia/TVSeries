import Colors from "@app/styles/Colors";
import Fonts from "@assets/fonts";

const text = {
  frontTitle: {
    ...Fonts?.roboto.bold,
    fontSize: 20,
    color: Colors.primary,
  },
  title: {
    ...Fonts?.roboto.bold,
    fontSize: 14,
    color: Colors.black,
  },
  subTitle: {
    ...Fonts?.roboto.medium,
    fontSize: 13,
    color: Colors.secondary,
  },
  smallText: {
    ...Fonts?.roboto.regular,
    fontSize: 12,
    color: Colors.black,
  },
  bigText: {
    ...Fonts?.roboto.regular,
    fontSize: 20,
    color: Colors.black,
  },
  topics: {
    ...Fonts?.roboto.bold,
    fontSize: 16,
    color: Colors.black,
  },
  values: {
    ...Fonts?.roboto.bold,
    fontSize: 14,
    color: Colors.primary,
  },
  link: {
    color: Colors.link,
  },
  header: {
    ...Fonts?.roboto.bold,
    fontSize: 20,
    color: Colors.secondary,
  },
  date: {
    ...Fonts?.roboto.regular,
    fontSize: 10,
    color: Colors.black,
  },
  error: {
    ...Fonts?.roboto.regular,
    fontSize: 10,
    color: Colors.red,
  },
  button: {
    ...Fonts?.roboto.bold,
    fontSize: 14,
    color: Colors.white,
  },
};
const Styles = {
  text,
};

export default Styles;
