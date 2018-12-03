import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
  Picker
} from "react-native";
import AddEvent from "../components/AddEvent.js";
import moment from "moment";
import MenuBar from "../components/MenuBar";

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
      displayedEvents: [
        [],
        [
          {
            startTime: new Date(2018, 10, 3, 13, 30, 0, 0),
            endTime: new Date(2018, 10, 3, 14, 30, 0, 0),
            title: "Study Session",
            Description: "Studing for Software Engineering",
            Daily: true,
            Weekly: false,
            Monthly: false,
            Yearly: false,
            you: false
          }
        ],
        []
      ],
      displayedEventController: 0,
      displayedUser: "1"
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
    let dailyEvents = new Array();
    //parses the single Events Array and adds all events associated with the
    //dateState to the dailyEvents Array
    for (let i = 0; i < this.props.screenProps.singleEvent.length; i++) {
      if (
        this.props.screenProps.currentDate ==
          this.props.screenProps.singleEvent[i].startTime.getDate() &&
        this.props.screenProps.currentMonth ==
          this.props.screenProps.singleEvent[i].startTime.getMonth() &&
        this.props.screenProps.currentYear ==
          this.props.screenProps.singleEvent[i].startTime.getYear() + 1900
      ) {
        dailyEvents.push(this.props.screenProps.singleEvent[i]);
      }
    }
    //Parases the daily events array and adds all events recurring daily to The
    //daily events Array
    for (let i = 0; i < this.props.screenProps.dailyEvent.length; i++) {
      dailyEvents.push(this.props.screenProps.dailyEvent[i]);
    }
    //Parses the weeklyEvent Array and adds all events recurring on this week Day
    //associated with the current dateState to the dailyEvents Array(mon-sun)
    for (
      let i = 0;
      i < this.props.screenProps.weeklyEvent[dateState.getDay()].length;
      i++
    ) {
      dailyEvents.push(
        this.props.screenProps.weeklyEvent[dateState.getDay()][i]
      );
    }

    //Parses the monthlyEvent Array and adds all events recurring monthly on The
    //day of the month of the current date state (1-31)
    for (
      let i = 0;
      i < this.props.screenProps.monthlyEvent[dateState.getDate()].length;
      i++
    ) {
      dailyEvents.push(
        this.props.screenProps.monthlyEvent[dateState.getDate()][i]
      );
    }
    //Parses the YearlyEvents Array and adds all events recurring on the day of
    //the year associated with the current dateState (month, day)
    for (let i = 0; i < this.props.screenProps.yearlyEvent.length; i++) {
      if (
        this.props.screenProps.currentDate ==
          this.props.screenProps.yearlyEvent[i].startTime.getDate() &&
        this.props.screenProps.currentMonth ==
          this.props.screenProps.yearlyEvent[i].startTime.getMonth()
      ) {
        dailyEvents.push(this.props.screenProps.yearlyEvent[i]);
      }
    }
    let newdisplayedEvents = this.state.displayedEvents;

    dailyEvents.sort(function(a, b) {
      return a.startTime - b.startTime;
    });

    newdisplayedEvents[0] = dailyEvents;
    newdisplayedEvents[2] = dailyEvents.concat(
      this.state.displayedEvents[1].sort(function(a, b) {
        return a.startTime - b.startTime;
      })
    );

    this.setState({
      displayedEvents: newdisplayedEvents
    });
  }

  eventDisplayStyle = function(option) {
    if (option.you) {
      return {
        width: 300,
        height: 60,
        backgroundColor: "powderblue",
        borderWidth: 2,
        borderRadius: 4,
        borderColor: "black",
        margin: 10
      };
    } else {
      return {
        width: 300,
        height: 60,
        backgroundColor: "lightgreen",
        borderWidth: 2,
        borderRadius: 4,
        borderColor: "black",
        margin: 10
      };
    }
  };

  render() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            //justifyContent: "center"
            alignItems: "center",
            marginTop: 30,
            marginLeft: 15,
            marginRight: 15
          }}
        >
          <View />
          <MenuBar
            style={{ backgroundColor: "powderblue" }}
            screenProps={{
              navigate: this.props.navigation.navigate,
              currentMonth: this.props.screenProps.currentMonth,
              changeMonth: this.props.screenProps.changeMonth
            }}
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
          <View style={{ flexDirection: "row", marginBottom: 50 }}>
            <Text style={{ fontSize: 16, height: 40, paddingTop: 17 }}>
              Currently Viewing Calender of:
            </Text>
            <Picker
              selectedValue={this.state.displayedUser}
              style={{ height: 50, width: 130 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  displayedUser: itemValue,
                  displayedEventController: itemIndex
                })
              }
            >
              <Picker.Item label="You" value="1" />
              <Picker.Item label="John Smith" value="2" />
              <Picker.Item label="All" value="0" />
            </Picker>
          </View>

          {this.state.displayedEvents[this.state.displayedEventController].map(
            data => {
              return (
                <TouchableHighlight
                  onPress={() => {
                    this.props.screenProps.changeAddEventInfo(data);
                    this.props.navigation.navigate("AddEvent");
                  }}
                  style={{ height: 75 }}
                >
                  <View style={this.eventDisplayStyle(data)}>
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
                          {data.title}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            }
          )}
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
