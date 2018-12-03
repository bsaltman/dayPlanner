import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";

export default class MenuBar extends Component {
  render() {
    return (
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
          <TouchableOpacity
            onPress={() => this.props.screenProps.navigate("Home")}
          >
            <View style={styles.sideButtons}>
              <Text style={[styles.btnText, styles.sidebtnText]}>Year</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.screenProps.navigate("MonthView")}
          >
            <View style={styles.sideButtons}>
              <Text style={[styles.btnText, styles.sidebtnText]}>Month</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.screenProps.changeMonth(
                this.props.screenProps.currentMonth
              );
              this.props.screenProps.navigate("DayView");
            }}
          >
            <View style={styles.sideButtons}>
              <Text style={[styles.btnText, styles.sidebtnText]}>Day</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideButtons: {
    width: 110,
    backgroundColor: "powderblue",
    justifyContent: "center",
    alignItems: "center"
  },
  sidebtnText: { fontSize: 25 },
  monthButton: {
    backgroundColor: "powderblue",
    height: 67,
    width: 152,
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: { textAlign: "center", color: "#fff" }
});
