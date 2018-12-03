import React, { Component } from "react";

export function generateDailyEventArray(
  dateState,
  currentDay,
  currentMonth,
  currentYear,
  singleEvent,
  dailyEvent,
  weeklyEvent,
  monthlyEvent,
  yearlyEvent
) {
  let dailyEvents = new Array();
  //parses the single Events Array and adds all events associated with the
  //dateState to the dailyEvents Array
  for (let i = 0; i < singleEvent.length; i++) {
    if (
      currentDay == singleEvent[i].startTime.getDate() &&
      currentMonth == singleEvent[i].startTime.getMonth() &&
      currentYear == singleEvent[i].startTime.getYear() + 1900
    ) {
      dailyEvents.push(singleEvent[i]);
    }
  }
  //Parases the daily events array and adds all events recurring daily to The
  //daily events Array
  for (let i = 0; i < dailyEvent.length; i++) {
    dailyEvents.push(dailyEvent[i]);
  }
  //Parses the weeklyEvent Array and adds all events recurring on this week Day
  //associated with the current dateState to the dailyEvents Array(mon-sun)
  for (let i = 0; i < weeklyEvent[dateState.getDay()].length; i++) {
    dailyEvents.push(weeklyEvent[dateState.getDay()][i]);
  }

  //Parses the monthlyEvent Array and adds all events recurring monthly on The
  //day of the month of the current date state (1-31)
  for (let i = 0; i < monthlyEvent[dateState.getDate()].length; i++) {
    dailyEvents.push(monthlyEvent[dateState.getDate()][i]);
  }
  //Parses the YearlyEvents Array and adds all events recurring on the day of
  //the year associated with the current dateState (month, day)
  for (let i = 0; i < yearlyEvent.length; i++) {
    if (
      currentDay == yearlyEvent[i].startTime.getDate() &&
      currentMonth == yearlyEvent[i].startTime.getMonth()
    ) {
      dailyEvents.push(yearlyEvent[i]);
    }
  }
  return dailyEvents;
}
