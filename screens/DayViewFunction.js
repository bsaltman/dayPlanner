import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TouchableHighlight
} from "react-native";
import AddEvent from "../components/AddEvent.js";
import moment from "moment";
import MenuBar from "../components/MenuBar";
import { generateDailyEventArray } from "../components/DailyEvents";

export default class DayView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      //Will be populated with all events associated with the given date.
      dailyEvents: []
    };
  }
  componentWillMount() {
    //Creates a new data object using the currently selected Year, Month
    //and Day stored in State
    let dateState = new Date(
      this.props.screenProps.currentYear,
      this.props.screenProps.currentMonth,
      this.props.screenProps.currentDate,
      0,
      0,
      0,
      0
    );
    //function generateDailyEventArray(weeklyEvent,monthlyEvent yearlyEvent){
    this.setState({
      dailyEvents: []

      /* generateDailyEventArray(
        dateState,
        this.props.screenProps.currentDay,
        this.props.screenProps.currentMonth,
        this.props.screenProps.currentYear,
        this.props.screenProps.singleEvent,
        this.props.screenProps.dailyEvent,
        this.props.screenProps.weeklyEvent,
        this.props.screenProps.monthlyEvent,
        this.props.screenProps.yearlyEvent
      )*/
    });
    Alert.alert(
      generateDailyEventArray(
        new Date(
          this.props.screenProps.currentYear,
          this.props.screenProps.currentMonth,
          this.props.screenProps.currentDay,
          0,
          0,
          0,
          0
        ),
        this.props.screenProps.currentDay,
        this.props.screenProps.currentMonth,
        this.props.screenProps.currentYear,
        this.props.screenProps.singleEvent,
        this.props.screenProps.dailyEvent,
        this.props.screenProps.weeklyEvent,
        this.props.screenProps.monthlyEvent,
        this.props.screenProps.yearlyEvent
      )
    );
  }

  render() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            //justifyContent: "center"
            alignItems: "center",
            marginTop: 12
          }}
        >
          <View />
          <MenuBar
            style={{ width: 100 }}
            screenProps={{ navigate: this.props.navigation.navigate }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              width: "100%",
              marginBottom: 5,
              backgroundColor: "steelblue",
              padding: 15,
              color: "white"
            }}
          >
            {this.state.monthNames[this.props.screenProps.currentMonth]}{" "}
            {this.props.screenProps.currentDate},{" "}
            {this.props.screenProps.currentYear}
          </Text>
          {this.state.dailyEvents.map(data => {
            return (
              <View
                style={{
                  width: 300,
                  height: 60,
                  backgroundColor: "powderblue",
                  borderWidth: 2,
                  borderRadius: 4,
                  borderColor: "black",
                  margin: 10
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      width: 75,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text props={{ key: data.title }}>
                      {moment(data.startTime).format("LT")}
                      {"\n"} to {"\n"}
                      {moment(data.endTime).format("LT")}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 220,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ color: "#5c4d3d", fontSize: 22 }}>
                      {data.title}{" "}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
          <TouchableHighlight
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate("AddEvent");
            }}
          >
            <Text style={{ textAlign: "center" }}>Add Event!</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
// Shift intext styling to Style sheet, external?
const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    padding: 10,
    margin: 2,
    width: 105,
    backgroundColor: "lightgrey",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "black"
  }
});
