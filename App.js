import React from "react";
import AppNavigator from "./AppNavigator";
import { BackAndroid, Alert } from "react-native";
console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let currentDate = new Date();

    this.state = {
      eventIdCounter: 0,
      currentDay: currentDate.getDay(),
      currentDate: currentDate.getDate(),
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getYear() + 1900,
      singleEvent: [],
      dailyEvent: [],
      weeklyEvent: [[], [], [], [], [], [], []],
      addEventInfo: null,
      monthlyEvent: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ],
      yearlyEvent: [],
      singleEventTwo: [],
      dailyEventTwo: [],
      weeklyEventTwo: [[], [], [], [], [], [], []],
      monthlyEventTwo: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ],
      yearlyEventTwo: []
    };
  }

  addEvent = event => {
    if (event.Daily) {
      events = this.state.dailyEvent;
      if (event.eventIndex === -1) {
        let eventWithId = event;
        eventWithId.index = this.state.dailyEvent.length;
        events.push(eventWithId);
      }
      if (event.eventIndex === -2) {
        events.splice(event.index, 1, event);
      }
      events.sort(function(a, b) {
        return a.startTime - b.startTime;
      });

      this.setState({
        dailyEvent: events
      });
    } else if (event.Weekly) {
      events = this.state.weeklyEvent;
      if (event.eventIndex === -1) {
        let eventWithId = event;
        eventWithId.index = events[event.startTime.getDay()].length;
        events[event.startTime.getDay()].push(eventWithId);
      }
      if (event.eventIndex === -2) {
        events[event.startTime.getDay()].splice(event.index, 1, event);
      }

      events[event.startTime.getDay()].sort(function(a, b) {
        return a.startTime - b.startTime;
      });

      this.setState({
        weeklyEvent: events
      });
    } else if (event.Monthly) {
      events = this.state.monthlyEvent;
      if (event.eventIndex === -1) {
        let eventWithId = event;
        eventWithId.index = events[event.startTime.getDate()].length;
        events[event.startTime.getDate()].push(eventWithId);
      }
      if (event.eventIndex === -2) {
        events[event.startTime.getDate()].splice(event.index, 1, event);
      }

      events[event.startTime.getDate()].sort(function(a, b) {
        return a.startTime - b.startTime;
      });

      this.setState({
        monthlyEvent: events
      });
    } else if (event.Yearly) {
      events = this.state.yearlyEvent;
      if (event.eventIndex === -1) {
        let eventWithId = event;
        eventWithId.index = this.state.yearlyEvent.length;
        events.push(eventWithId);
      }
      if (event.eventIndex === -2) {
        events.splice(event.index, 1, event);
      }

      events.sort(function(a, b) {
        return a.startTime - b.startTime;
      });

      this.setState({
        yearlyEvent: events
      });
    } else {
      events = this.state.singleEvent;
      if (event.eventIndex === -1) {
        let eventWithId = event;
        eventWithId.index = this.state.singleEvent.length;
        events.push(eventWithId);
      }
      if (event.eventIndex === -2) {
        events.splice(event.index, 1, event);
      }

      events.sort(function(a, b) {
        return a.startTime - b.startTime;
      });

      this.setState({
        singleEvent: events
      });
    }
  };

  changeAddEventInfo = newEventInfo => {
    this.setState({
      addEventInfo: newEventInfo
    });
  };

  changeDate = newDay => {
    this.setState({
      //Day of the month 1-31
      currentDate: newDay
    });
  };

  changeMonth = newMonth => {
    this.setState({
      currentMonth: newMonth
    });
  };

  changeYear = newYear => {
    this.setState({
      currentYear: newYear
    });
  };

  render() {
    return (
      <AppNavigator
        screenProps={{
          eventIdCounter: this.state.eventIdCounter,
          //day of the week
          currentDay: this.state.currentDay,
          currentDate: this.state.currentDate,
          currentMonth: this.state.currentMonth,
          currentYear: this.state.currentYear,
          //Main user Event info
          singleEvent: this.state.singleEvent,
          dailyEvent: this.state.dailyEvent,
          weeklyEvent: this.state.weeklyEvent,
          monthlyEvent: this.state.monthlyEvent,
          yearlyEvent: this.state.yearlyEvent,

          addEventInfo: this.state.addEventInfo,
          changeAddEventInfo: this.changeAddEventInfo,

          changeDate: this.changeDate,
          changeMonth: this.changeMonth,
          changeYear: this.changeYear,
          addEvent: this.addEvent
        }}
      />
    );
  }
}
