import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {metrics, colors} from '../../shared/Theme';

export default function SearchBar({editable, changeSearchText}) {
  const [isFocused, setisFocused] = useState(false);

  const ChangeFocus = (bool) => {
    setisFocused(bool);
  };

  const onChangeText = (t) => changeSearchText(t);

  return (
    <View style={styles.SB_Wrapper}>
      <View style={styles.SB_icon}>
        <FontAwesome
          name="search"
          size={18}
          color={isFocused ? colors.primary : colors.lightGrey1}
        />
      </View>
      <TextInput
        style={styles.SB_input}
        placeholderTextColor={colors.lightGrey3}
        editable={editable}
        placeholder="Search Here..."
        onBlur={() => ChangeFocus(false)}
        onFocus={() => ChangeFocus(true)}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  SB_icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  SB_Wrapper: {
    backgroundColor: colors.blueGray,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 10,
    width: metrics.width * 0.9,
    paddingHorizontal: 10,
    height: metrics.height * 0.07,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  SB_input: {
    width: '90%',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
