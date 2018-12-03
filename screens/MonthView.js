import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import MenuBar from "../components/MenuBar";

export default class MonthView extends Component {
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
      tableHead: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
      tableData: "",
      currentDay: this.props.screenProps.currentDay,
      currentMonth: this.props.screenProps.currentMonth,
      currentYear: this.props.screenProps.currentYear
    };
  }

  componentWillMount() {
    let currentDate = new Date(
      this.state.currentYear,
      this.state.currentMonth,
      this.state.currentDay,
      0,
      0,
      0,
      0
    );
    let newTableData = [[]];
    let month = this.state.currentMonth;
    let firstDay = new Date(
      this.state.currentYear,
      this.state.currentMonth,
      1,
      0,
      0,
      0,
      0
    );
    let week = 0;
    let day = firstDay.getDay() - 1;
    if (day == -1) {
      day = 6;
    }

    for (let i = parseInt(day, 10); i > 0; i--) {
      newTableData[week].push(null);
    }

    let count = 1;

    while (month == this.state.currentMonth) {
      newTableData[week].push(count);
      firstDay.setDate(firstDay.getDate() + 1);
      if (firstDay.getDay() == 1) {
        newTableData.push([]);
        week++;
      }

      month = firstDay.getMonth();
      count++;
    }

    while (newTableData[week].length < 7 && newTableData[week].length != 0) {
      newTableData[week].push(null);
    }

    this.setState({
      tableData: newTableData
    });
  }

  _iterateMonth(bool) {
    let currentMonth = this.state.currentMonth;
    let currentYear = this.state.currentYear;
    if (bool) {
      currentMonth++;
    } else {
      currentMonth--;
    }
    if (currentMonth == -1) {
      currentMonth = 11;
      currentYear = this.state.currentYear - 1;
    }
    if (currentMonth == 12) {
      currentMonth = 0;
      currentYear = this.state.currentYear + 1;
      this.props.screenProps.changeYear(currentYear);
    }

    this.props.screenProps.changeMonth(currentMonth);
    this.setState({
      currentMonth: currentMonth,
      currentYear: currentYear
    });
    let currentDate = new Date(
      this.state.currentYear,
      this.state.currentMonth,
      this.state.currentDay,
      0,
      0,
      0,
      0
    );
    let newTableData = [[]];
    let month = currentMonth;
    let firstDay = new Date(
      this.state.currentYear,
      currentMonth,
      1,
      0,
      0,
      0,
      0
    );
    let week = 0;
    let day = firstDay.getDay() - 1;
    if (day == -1) {
      day = 6;
    }

    for (let i = parseInt(day, 10); i > 0; i--) {
      newTableData[week].push(null);
    }

    let count = 1;

    while (month == currentMonth) {
      newTableData[week].push(count);
      firstDay.setDate(firstDay.getDate() + 1);
      if (firstDay.getDay() == 1) {
        newTableData.push([]);
        week++;
      }

      month = firstDay.getMonth();
      count++;
    }

    while (newTableData[week].length < 7 && newTableData[week].length != 0) {
      newTableData[week].push(null);
    }

    this.setState({
      tableData: newTableData
    });
  }

  _selectDayView(index) {
    if (index != null) {
      this.props.screenProps.changeDate(index);
      this.props.navigation.navigate("DayView");
    }
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._selectDayView(index)}>
        <View style={[data == null ? styles.nobtn : styles.btn]}>
          <Text style={styles.btnText}>{index}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <MenuBar
          screenProps={{
            navigate: this.props.navigation.navigate,
            currentMonth: this.props.screenProps.currentMonth,
            changeMonth: this.props.screenProps.changeMonth
          }}
        />
        <View style={{ backgroundColor: "steelblue", height: 50 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity onPress={() => this._iterateMonth(false)}>
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
                width: 200,
                backgroundColor: "steelblue",
                padding: 15,
                color: "white"
              }}
            >
              {this.state.monthNames[this.state.currentMonth] +
                " " +
                this.state.currentYear}
            </Text>

            <TouchableOpacity onPress={() => this._iterateMonth(true)}>
              <View style={styles.sideButtons}>
                <Text style={[styles.btnText, styles.sidebtnText]}>
                  {"-->"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Table borderStyle={{ borderColor: "transparent" }}>
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          {state.tableData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={element(cellData, cellData)}
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "steelblue" },
  text: { margin: 6, color: "white", textAlign: "center" },
  row: { flexDirection: "row", backgroundColor: "white", borderRadius: 10 },
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
  sidebtnText: { fontSize: 30 }
});
