/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';
import {metrics, scaleFont, colors} from '../../shared/Theme';
import Listing from '../../components/listing/listing';
import NavigationRef from '../../shared/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import UseHeader from '../../components/CCHeader/CeHeader';
import {BuilderTile} from '../Home/Home';
import {
  setCurrentBuilderAction,
  CivilsetFavAction,
  CivilremoveFavAction,
} from '../../store/actions';

const CivilFav = (props) => {
  const CeGoBack = () => NavigationRef.GoBack();
  const setCurrentBuilder = (item) => {
    props.setCurrentBuilderAction(item);
    NavigationRef.Navigate('Worker');
  };
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        Title="Favourite Builders"
        leftIconAction={CeGoBack}
        titleStyle={{fontSize: 23, color: colors.primary}}
        leftIconColor={colors.primary}
      />
      {props.CivilFavs.length > 0 ? (
        <Listing
          data={props.CivilFavs}
          renderItem={({item}) => (
            <BuilderTile
              item={item}
              setCurrentBuilder={setCurrentBuilder}
              search={true}
              civilFav={props.CivilFavs}
              CivilSetFavAct={(cv) => props.CivilsetFavAction(cv)}
              CivilRemoveFavAct={(cv) => props.CivilremoveFavAction(cv)}
            />
          )}
          horizontal={false}
          numColumns={2}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : (
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
          No Favourite builder...
        </Text>
      )}
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => ({
  CivilFavs: state.CivilFavReducer,
});

export default connect(mapStateToProps, {
  setCurrentBuilderAction,
  CivilsetFavAction,
  CivilremoveFavAction,
})(CivilFav);
