/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';
import {connect} from 'react-redux';
import {metrics, scaleFont, colors} from '../../shared/Theme';
import Listing from '../../components/listing/listing';
import SearchBar from '../../components/searchBar/searchBar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NavigationRef from '../../shared/RefNavigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  setCurrentBuilderAction,
  CivilsetFavAction,
  CivilremoveFavAction,
} from '../../store/actions';
import UseHeader from '../../components/CCHeader/CeHeader';
import Data2 from '../../Dummydata/DummyData2';

function Home(props) {
  useEffect(() => {
    ct(Data2.category[0]);
  }, []);
  const [categories, setCategories] = useState(Data2.category);
  const [cc, setCC] = useState(Data2.category[0]);
  const [tabProducts, setTabProducts] = useState([]);

  const ct = (tab) => {
    setCC(tab);
    const fPrd = Data2.Sheet2.filter((item) => item.categoyrid === tab.id);
    setTabProducts(fPrd);
  };

  const setCurrentBuilder = (item) => {
    props.setCurrentBuilderAction(item);
    NavigationRef.NavigateAndReset('Worker');
  };

  const goToSearch = () => NavigationRef.Navigate('Search');
  const goToFavs = () => NavigationRef.Navigate('CivilFav');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        rightIcon={AntDesign}
        rightIconName="hearto"
        rightIconColor={colors.primary}
        Title="Find Builder"
        titleStyle={{fontSize: 33}}
        rightIconAction={goToFavs}
      />
      <KeyboardAwareScrollView style={styles.container}>
        <TouchableOpacity onPress={goToSearch} style={styles.SearchBarWrapper}>
          <SearchBar editable={false} />
        </TouchableOpacity>

        <View style={{marginVertical: metrics.height * 0.01}}>
          <Listing
            data={categories}
            renderItem={({item}) => <Tabs item={item} cc={cc} ct={ct} />}
          />
        </View>
        <View style={styles.suggBuilderWrapper}>
          <Text style={styles.suggBuilderHeader}>
            Professional {cc.category}s
          </Text>
        </View>
        <View style={styles.listingWrapper}>
          {tabProducts.length > 0 &&
            tabProducts.map((item, index) => {
              return (
                <BuilderTile
                  key={item.id}
                  item={{...item}}
                  setCurrentBuilder={setCurrentBuilder}
                  civilFav={props.CivilFavs}
                  CivilSetFavAct={(cv) => props.CivilsetFavAction(cv)}
                  CivilRemoveFavAct={(cv) => props.CivilremoveFavAction(cv)}
                />
              );
            })}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const Tabs = ({item, cc, ct}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.HomeTabsWrapper,
        backgroundColor:
          item.category === cc.category ? colors.primary : 'white',
      }}
      onPress={() => ct(item)}>
      <Text
        style={{
          ...styles.HomeTabsText,
          color: item.category === cc.category ? 'white' : colors.primary,
        }}>
        {item.category}
      </Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    CivilFavs: state.CivilFavReducer,
  };
};

export default connect(mapStateToProps, {
  setCurrentBuilderAction,
  CivilsetFavAction,
  CivilremoveFavAction,
})(Home);

export const BuilderTile = ({
  item,
  setCurrentBuilder,
  search,
  civilFav,
  CivilRemoveFavAct,
  CivilSetFavAct,
}) => {
  useEffect(() => {
    checkIfFav();
  }, []);
  const [fav, setFav] = useState(false);

  const checkIfFav = () => {
    for (let us = 0; us < civilFav.length; us++) {
      if (civilFav[us].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? CivilRemoveFavAct(item.id) : CivilSetFavAct(item);
    setFav(!fav);
  };
  return (
    <TouchableOpacity
      onPress={() => setCurrentBuilder(item)}
      style={
        search ? styles.SearchBuilderTileWrapper : styles.BuilderTileWrapper
      }>
      <View style={{width: '100%'}}>
        <ImageBackground
          source={item.images}
          style={styles.builderTileImage}
          resizeMode="contain"
        />
        <Text style={styles.builderTileName}>{item.name}</Text>
        <View style={styles.ratingView}>
          <AntDesign name="star" color="#ffce33" size={metrics.width * 0.04} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={toggleFav}>
        <AntDesign
          name={fav ? 'heart' : 'hearto'}
          size={20}
          color={colors.primary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  HomeTabsText: {
    fontWeight: '700',
    fontSize: metrics.width * 0.043,
  },
  HomeTabsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: metrics.width * 0.04,
    paddingHorizontal: metrics.width * 0.04,
    paddingVertical: metrics.height * 0.009,
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  progressBottomText: {
    marginTop: metrics.height * 0.01,
    fontSize: scaleFont(14),
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    textTransform: 'capitalize',
  },
  progressContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressWrapper: {
    width: metrics.width * 0.42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: metrics.width * 0.028,
    borderRadius: 15,
    marginHorizontal: metrics.width * 0.06,
  },
  gaugeText: {
    position: 'absolute',
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: scaleFont(18),
    fontWeight: 'bold',
  },
  listingWrapper: {
    marginVertical: metrics.height * 0.018,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ratingText: {marginLeft: metrics.width * 0.015},
  builderTileName: {
    marginTop: metrics.height * 0.01,
    fontSize: scaleFont(13),
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  builderTileImage: {
    width: '100%',
    height: metrics.width * 0.35,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  SearchBuilderTileWrapper: {
    width: metrics.width * 0.42,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: metrics.width * 0.028,
    borderRadius: 15,
    backgroundColor: '#f7f7ff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    margin: metrics.width * 0.03,
  },
  BuilderTileWrapper: {
    width: metrics.width * 0.42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: metrics.width * 0.028,
    borderRadius: 15,
    backgroundColor: '#f7f7ff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginHorizontal: metrics.width * 0.035,
    marginVertical: metrics.height * 0.01,
  },
  ratingView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: metrics.height * 0.003,
  },
  suggBuilderWrapper: {
    marginHorizontal: metrics.width * 0.035,
  },
  suggBuilderHeader: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
  },
  cubeText: {
    fontWeight: 'bold',
    fontSize: scaleFont(12),
    color: 'black',
  },
  CuberFigure: {
    fontSize: scaleFont(22),
    fontWeight: 'bold',
  },
  workCubeWrapper: {
    width: metrics.width * 0.24,
    height: metrics.width * 0.24,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {flex: 1},
  SearchBarWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: metrics.smallMargin,
  },
  SubHeaderWrapper: {
    marginVertical: metrics.height * 0.04,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
