import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import AddEvent from "../components/AddEvent.js";
import MenuBar from "../components/MenuBar";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: this.props.screenProps.currentYear
    };
    this.props.screenProps.changeMonth(this.props.screenProps.currentMonth);
    this.props.navigation.navigate("MonthView");
  }

  _iterateYear(bool) {
    let currentYear = this.state.currentYear;
    if (bool) {
      currentYear++;
    } else {
      currentYear--;
    }
    this.props.screenProps.changeYear(currentYear);
    this.setState({
      currentYear: currentYear
    });
  }

  render() {
    return (
      <View style={{ marginTop: 12, marginBottom: 2 }}>
        <MenuBar
          screenProps={{
            navigate: this.props.navigation.navigate,
            currentMonth: this.props.screenProps.currentMonth,
            changeMonth: this.props.screenProps.changeMonth
          }}
        />
        <View>
          <View style={{ backgroundColor: "steelblue", height: 50 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity onPress={() => this._iterateYear(false)}>
                <View style={styles.sideButtons}>
                  <Text style={[styles.btnText, styles.sidebtnText]}>
                    {"<--"}
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  marginTop: 10,
                  height: 40,
                  width: 200,
                  backgroundColor: "steelblue",
                  color: "white"
                }}
              >
                {this.state.currentYear}
              </Text>
              <TouchableOpacity onPress={() => this._iterateYear(true)}>
                <View style={styles.sideButtons}>
                  <Text style={[styles.btnText, styles.sidebtnText]}>
                    {"-->"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={
              {
                //  flex: 1,
                //  flexDirection: "row",
                //  justifyContent: "space-between"
              }
            }
          >
            <View Styles={styles.twoRow}>
              <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                <View style={styles.blocks}>
                  <TouchableOpacity
                    style={styles.monthButton}
                    onPress={() => {
                      this.props.screenProps.changeMonth(0);
                      this.props.navigation.navigate("MonthView");
                    }}
                  >
                    <View>
                      <Text style={styles.monthText}> January </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.blocks}>
                  <TouchableOpacity
                    style={styles.monthButton}
                    onPress={() => {
                      this.props.screenProps.changeMonth(1);
                      this.props.navigation.navigate("MonthView");
                    }}
                  >
                    <View>
                      <Text style={styles.monthText}> February </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.blocks}>
                  <TouchableOpacity
                    style={styles.monthButton}
                    onPress={() => {
                      this.props.screenProps.changeMonth(2);
                      this.props.navigation.navigate("MonthView");
                    }}
                  >
                    <View>
                      <Text style={styles.monthText}> March </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.blocks}>
                  <TouchableOpacity
                    style={styles.monthButton}
                    onPress={() => {
                      this.props.screenProps.changeMonth(3);
                      this.props.navigation.navigate("MonthView");
                    }}
                  >
                    <View>
                      <Text style={styles.monthText}> April </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.blocks}>
                  <TouchableOpacity
                    style={styles.monthButton}
                    onPress={() => {
                      this.props.screenProps.changeMonth(4);
                      this.props.navigation.navigate("MonthView");
                    }}
                  >
                    <View>
                      <Text style={styles.monthText}> May </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.blocks}>
                  <TouchableOpacity
                    style={styles.monthButton}
                    onPress={() => {
                      this.props.screenProps.changeMonth(5);
                      this.props.navigation.navigate("MonthView");
                    }}
                  >
                    <View>
                      <Text style={styles.monthText}> June </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.blocks}>
                  <TouchableOpacity
                    style={styles.monthButton}
                    onPress={() => {
                      this.props.screenProps.changeMonth(6);
                      this.props.navigation.navigate("MonthView");
                    }}
                  >
                    <View>
                      <Text style={styles.monthText}> July </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.blocks}>
                  <TouchableOpacity
                    style={styles.monthButton}
                    onPress={() => {
                      this.props.screenProps.changeMonth(7);
                      this.props.navigation.navigate("MonthView");
                    }}
                  >
                    <View>
                      <Text style={styles.monthText}> August </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.blocks}>
                  <TouchableOpacity
                    style={styles.monthButton}
                    onPress={() => {
                      this.props.screenProps.changeMonth(8);
                      this.props.navigation.navigate("MonthView");
                    }}
                  >
                    <View>
                      <Text style={styles.monthText}> September </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.blocks}>
                  <TouchableOpacity
                    style={styles.monthButton}
                    onPress={() => {
                      this.props.screenProps.changeMonth(9);
                      this.props.navigation.navigate("MonthView");
                    }}
                  >
                    <View>
                      <Text style={styles.monthText}> October </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.blocks}>
                  <TouchableOpacity
                    style={styles.monthButton}
                    onPress={() => {
                      this.props.screenProps.changeMonth(10);
                      this.props.navigation.navigate("MonthView");
                    }}
                  >
                    <View>
                      <Text style={styles.monthText}> November </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.blocks}>
                  <TouchableOpacity
                    style={styles.monthButton}
                    onPress={() => {
                      this.props.screenProps.changeMonth(11);
                      this.props.navigation.navigate("MonthView");
                    }}
                  >
                    <View>
                      <Text style={styles.monthText}> December </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "steelblue" },
  text: { margin: 6, color: "white", textAlign: "center" },
  row: { flexDirection: "row", backgroundColor: "steelblue" },
  btn: {
    height: 60,
    backgroundColor: "#78B7BB",
    borderRadius: 2,
    paddingTop: 15
  },
  btnText: { textAlign: "center", color: "#fff" },
  nobtn: { backgroundColor: "lightgrey", height: 60 },
  sideButtons: {
    width: 50,
    backgroundColor: "steelblue",
    justifyContent: "center",
    alignItems: "center"
  },
  sidebtnText: { fontSize: 30 },
  monthButton: {
    backgroundColor: "powderblue",
    height: 67,
    width: 152,
    alignItems: "center",
    justifyContent: "center"
  },
  monthText: { textAlign: "center", color: "#5c4d3d", fontSize: 30 },
  twoRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  blocks: {
    width: 160,
    height: 75,
    backgroundColor: "powderblue",
    margin: 5,
    marginLeft: 11,
    borderWidth: 4,
    borderRadius: 6,
    borderColor: "grey"
  }
});
