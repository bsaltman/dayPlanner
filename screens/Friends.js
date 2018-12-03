//Relic of testing Navigation, Remove later //

import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class Friends extends React.Component {
  render() {
    return (
      <View>
        <Text>Year: {this.props.screenProps.currentYear}</Text>
        <Button
          title="go to first page"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}
