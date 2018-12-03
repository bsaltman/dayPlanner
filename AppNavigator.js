/**********************************8
App AppNavigator

Wrapper that facilitates the movement between scenses
Utilize React Navigation Library
*************************************/

import { createStackNavigator } from "react-navigation";
import Home from "./screens/Home";

import MonthView from "./screens/MonthView";
import DayView from "./screens/DayView";
import AddEvent from "./components/AddEvent";

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    DayView: { screen: DayView },
    MonthView: { screen: MonthView },
    AddEvent: { screen: AddEvent }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
export default AppNavigator;
