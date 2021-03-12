/* eslint-disable react-native/no-inline-styles */

//======PROPS========
// leftIcon
// rightIcon
// leftIconAction
// leftIconName
// Title
// rightIconAction
// rightIconName
// titleStyle
// leftIconColor
// rightIconColor
// leftIconStyle
// rightIconStyle
// primaryColor

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
const metrics = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
const colors = {
  primary: 'black',
};

function MyHeader({
  leftIcon,
  rightIcon,
  leftIconName,
  leftIconAction,
  leftIconColor,
  titleStyle,
  Title,
  rightIconAction,
  rightIconName,
  rightIconColor,
  leftIconStyle,
  rightIconStyle,
}) {
  const LeftIconLibrary = leftIcon;
  const RightIconLibrary = rightIcon;
  return (
    <View style={styles.HeaderBarWrapper}>
      <View style={styles.HeaderBarInnerWrapper}>
        {LeftIconLibrary ? (
          <TouchableOpacity onPress={leftIconAction} style={styles.IconWrap}>
            <LeftIconLibrary
              name={leftIconName}
              size={metrics.width * 0.065}
              color={leftIconColor ? leftIconColor : colors.primary}
              style={leftIconStyle ? leftIconStyle : {}}
            />
          </TouchableOpacity>
        ) : null}
        <Text style={{...styles.HeaderText, ...titleStyle}}>{Title}</Text>
        {RightIconLibrary ? (
          <TouchableOpacity onPress={rightIconAction} style={styles.IconWrap}>
            <RightIconLibrary
              name={rightIconName}
              size={metrics.width * 0.075}
              color={rightIconColor ? rightIconColor : colors.primary}
              style={rightIconStyle ? rightIconStyle : {}}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              ...styles.IconWrap,
              elevation: 0,
              backgroundColor: 'transparent',
            }}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  IconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
  },
  HeaderText: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: metrics.width * 0.08,
  },
  HeaderBarInnerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: metrics.width * 0.93,
  },
  HeaderBarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: metrics.height * 0.018,
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(MyHeader);
