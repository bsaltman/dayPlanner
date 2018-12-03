import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  TextInput
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
//import { CheckBox } from "react-native-elements";
import CheckBox from "react-native-check-box";
import MenuBar from "../components/MenuBar";

export default class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTimePickerVisible: false,
      endTimePickerVisible: false,
      startTime: null,
      endTime: null,
      Daily: false,
      Weekly: false,
      Monthly: false,
      Yearly: false,
      you: true,
      fontLoaded: false,
      showSaveToggle: false,
      showEditToggle: true
    };
  }
  componentWillMount() {
    if (this.props.screenProps.addEventInfo == null) {
      this.setState({
        eventIndex: -1,
        showEditToggle: false,
        showSaveToggle: true
      });
    } else {
      this.setState({
        startTime: this.props.screenProps.addEventInfo.startTime,
        endTime: this.props.screenProps.addEventInfo.endTime,
        Daily: this.props.screenProps.addEventInfo.Daily,
        Weekly: this.props.screenProps.addEventInfo.Weekly,
        Monthly: this.props.screenProps.addEventInfo.Monthly,
        Yearly: this.props.screenProps.addEventInfo.Yearly,
        title: this.props.screenProps.addEventInfo.title,
        Description: this.props.screenProps.addEventInfo.Description,
        index: this.props.screenProps.addEventInfo.index,
        eventIndex: -2
      });
    }

    if (this.props.screenProps.addEventInfo != null) {
      if (this.props.screenProps.addEventInfo.you == false) {
        this.setState({
          showSaveToggle: false,
          showEditToggle: false
        });
      }
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  _showStartPicker = () => this.setState({ startTimePickerVisible: true });
  _showEndPicker = () => this.setState({ endTimePickerVisible: true });

  _hideDateTimePicker = () =>
    this.setState({
      startTimePickerVisible: false,
      endTimePickerVisible: false
    });

  _handleStartTimePicked = date => {
    //  date = date.setFullYear(this.props.screenProps.currentYear);
    //  date = date.prototype.setMonth(this.props.screenProps.currentMonth);
    //  date = date.setDate(this.props.screenProps.currentDay);
    //getHours()/getMinutes
    let year = this.props.screenProps.currentYear;
    let month = this.props.screenProps.currentMonth.toString();
    let day = this.props.screenProps.currentDate.toString();
    let startTime = new Date(
      year,
      month,
      day,
      date.getHours(),
      date.getMinutes(),
      0,
      0
    );
    this.setState({ startTime: startTime });

    if (
      this.state.startTime != null &&
      this.state.endTime != null &&
      this.state.startTime > this.state.endTime
    ) {
      let startTime = this.state.startTime;
      this.setState({
        startTime: this.state.endTime,
        endTime: startTime
      });
    }
    this._hideDateTimePicker();
  };

  _handleTitleText = e => {
    this.setState({ title: e });
  };

  _handleDescriptionText = e => {
    this.setState({ Description: e });
  };

  showSave = function(option) {
    if (option) {
      return {
        flexDirection: "row"
      };
    } else {
      return {
        flexDirection: "row",
        height: 0,
        overflow: "hidden"
      };
    }
  };

  showEdit = function(option) {
    if (option) {
      return {
        flexDirection: "row",
        marginLeft: "70%",
        width: 100
      };
    } else {
      return {
        flexDirection: "row",
        height: 0,
        overflow: "hidden"
      };
    }
  };

  _handleEndTimePicked = date => {
    let year = this.props.screenProps.currentYear;
    let month = this.props.screenProps.currentMonth.toString();
    let day = this.props.screenProps.currentDate.toString();
    let endTime = new Date(
      year,
      month,
      day,
      date.getHours(),
      date.getMinutes(),
      0,
      0
    );
    this.setState({ endTime: endTime });

    if (
      this.state.startTime != null &&
      this.state.endTime != null &&
      this.state.startTime > this.state.endTime
    ) {
      let startTime = this.state.startTime;
      this.setState({
        startTime: this.state.endTime,
        endTime: startTime
      });
    }
    this._hideDateTimePicker();
  };

  /*  async componentWillMount() {
    await Expo.Font.loadAsync({
      FontAwesome: require("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf")
    });
    this.setState({ fontLoaded: true });
  }*/

  render() {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          paddingTop: "5%",
          backgroundColor: "lightblue"
        }}
      >
        <View>
          <MenuBar
            screenProps={{
              navigate: this.props.navigation.navigate,
              currentMonth: this.props.screenProps.currentMonth,
              changeMonth: this.props.screenProps.changeMonth
            }}
          />
        </View>
        <View style={styles.AddEventModal}>
          <View>
            <TextInput
              style={styles.txtbox}
              onChangeText={e => this._handleTitleText(e)}
              value={this.state.title}
              placeholder="Title"
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableHighlight
                style={[styles.btn, styles.blue]}
                onPress={this._showStartPicker}
              >
                <Text style={{ textAlign: "center" }}>
                  Start time: {"\n"}
                  {moment(this.state.startTime).format("LT")}
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={[styles.btn, styles.blue]}
                onPress={this._showEndPicker}
              >
                <Text style={{ textAlign: "center" }}>
                  End time: {"\n"}
                  {moment(this.state.endTime).format("LT")}
                </Text>
              </TouchableHighlight>

              <DateTimePicker
                isVisible={this.state.startTimePickerVisible}
                onConfirm={this._handleStartTimePicked}
                onCancel={this._hideDateTimePicker}
                mode="time"
                datePickerModeAndroid="spinner"
                is24Hour={false}
              />

              <DateTimePicker
                isVisible={this.state.endTimePickerVisible}
                onConfirm={this._handleEndTimePicked}
                onCancel={this._hideDateTimePicker}
                mode="time"
                datePickerModeAndroid="spinner"
                is24Hour={false}
              />
            </View>
            <TextInput
              style={styles.bigtxtbox}
              onChangeText={e => this._handleDescriptionText(e)}
              value={this.state.Description}
              placeholder="Description"
            />

            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <View style={styles.checkBox}>
                <CheckBox
                  leftText="Daily"
                  isChecked={this.state.Daily}
                  onClick={() =>
                    this.setState({
                      Daily: !this.state.Daily,
                      Weekly: false,
                      Monthly: false,
                      Yearly: false
                    })
                  }
                />
              </View>
              <View style={styles.checkBox}>
                <CheckBox
                  leftText="Weekly"
                  isChecked={this.state.Weekly}
                  onClick={() =>
                    this.setState({
                      Weekly: !this.state.Weekly,
                      Daily: false,
                      Monthly: false,
                      Yearly: false
                    })
                  }
                />
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.checkBox}>
                <CheckBox
                  leftText="monthly"
                  isChecked={this.state.Monthly}
                  onClick={() =>
                    this.setState({
                      Monthly: !this.state.Monthly,
                      Weekly: false,
                      Daily: false,
                      Yearly: false
                    })
                  }
                />
              </View>
              <View style={styles.checkBox}>
                <CheckBox
                  leftText="Yearly"
                  isChecked={this.state.Yearly}
                  onClick={() =>
                    this.setState({
                      Yearly: !this.state.Yearly,
                      Weekly: false,
                      Monthly: false,
                      Daily: false
                    })
                  }
                />
              </View>
            </View>
            <View style={this.showEdit(this.state.showEditToggle)}>
              <TouchableHighlight
                style={[styles.btn, styles.green]}
                onPress={() => {
                  this.setState({
                    showEditToggle: false,
                    showSaveToggle: true
                  });
                }}
              >
                <Text style={{ textAlign: "center" }}>Edit event</Text>
              </TouchableHighlight>
            </View>

            <View style={this.showSave(this.state.showSaveToggle)}>
              <TouchableHighlight
                style={[styles.btn, styles.green]}
                onPress={() => {
                  this.props.screenProps.addEvent({
                    startTime: this.state.startTime,
                    endTime: this.state.endTime,
                    title: this.state.title,
                    Description: this.state.Description,
                    Daily: this.state.Daily,
                    Weekly: this.state.Weekly,
                    Monthly: this.state.Monthly,
                    Yearly: this.state.Yearly,
                    you: true,
                    index: this.state.index,
                    eventIndex: this.state.eventIndex
                  });
                  this.props.navigation.navigate("MonthView");
                  this.props.navigation.navigate("DayView");
                }}
              >
                <Text style={{ textAlign: "center" }}>Save event</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={[styles.btn, styles.red]}
                onPress={() => {
                  this.props.screenProps.changeAddEventInfo(null);
                  this.props.navigation.navigate("DayView");
                }}
              >
                <Text style={{ textAlign: "center" }}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //
  },
  commands: {
    //
  },

  AddEventModal: {
    //    borderWidth: 1,
    //    borderRadius: 10,
    //    borderColor: "steelblue",
    overflow: "hidden",
    width: "100%",
    //  marginLeft: "12.5%",
    height: 500,
    marginTop: "5%",
    marginBottom: "5%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "lightblue",
    padding: 25,
    paddingBottom: 10,
    paddingTop: 10
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    padding: 10,
    margin: 5,
    width: 105,
    backgroundColor: "lightgrey",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "black"
  },
  txtbox: {
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    backgroundColor: "#e6ecff",
    paddingLeft: 15,
    marginBottom: 5
  },
  bigtxtbox: {
    height: 50,
    borderColor: "gray",
    borderWidth: 2,
    backgroundColor: "#e6ecff",
    paddingLeft: 15,
    margin: 5,
    textAlignVertical: "top",
    paddingTop: 10
  },
  checkBox: {
    width: 118,
    height: 32,
    marginBottom: 2,
    marginRight: 65,
    borderRadius: 4,
    padding: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black"
  },
  red: {
    backgroundColor: "#ff4d4d"
  },
  green: {
    backgroundColor: "#1fad1f"
  },
  blue: {
    backgroundColor: "#ccd9ff"
  }
});
