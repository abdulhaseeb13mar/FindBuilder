/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';
import {colors, metrics} from '../../shared/Theme';
import NavigationRef from '../../shared/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import SearchBar from '../../components/searchBar/searchBar';
import Listing from '../../components/listing/listing';
import UseHeader from '../../components/CCHeader/CeHeader';
import {connect} from 'react-redux';
import {BuilderTile} from '../Home/Home';
import {
  setCurrentBuilderAction,
  CivilsetFavAction,
  CivilremoveFavAction,
} from '../../store/actions';
import Data2 from '../../Dummydata/DummyData2';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const RenderSearchedResult = () => {
    var SearchedItems = Data2.Sheet2.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const setCurrentBuilder = (item) => {
    props.setCurrentBuilderAction(item);
    NavigationRef.Navigate('Worker');
  };

  const CardRender = (Arr) => {
    return (
      <Listing
        data={Arr}
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
    );
  };
  const CeGoBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        Title="Search Builders"
        leftIconAction={CeGoBack}
        titleStyle={styles.TextShadow1}
        leftIconColor={colors.primary}
      />
      <View style={styles.SearchBarWrapper}>
        <SearchBar changeSearchText={changeSearchText} />
      </View>
      <View style={{flex: 1}}>
        {searchText !== '' ? RenderSearchedResult() : CardRender(Data2.Sheet2)}
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  CivilFavs: state.CivilFavReducer,
});

export default connect(mapStateToProps, {
  setCurrentBuilderAction,
  CivilsetFavAction,
  CivilremoveFavAction,
})(Search);

const styles = StyleSheet.create({
  TextShadow1: {
    color: colors.primary,
  },
  SearchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: metrics.height * 0.003,
  },
  container: {flex: 1},
});
