/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {metrics, scaleFont, colors} from '../../shared/Theme';
import StarRating from '../../components/starRating/starRating';
import NavigationRef from '../../shared/RefNavigation';
import {CivilsetFavAction, CivilremoveFavAction} from '../../store/actions';

const Worker = (props) => {
  useEffect(() => {
    checkIfFav();
  }, []);

  const [fav, setFav] = useState(false);
  const builder = props.builderInfo;

  const checkIfFav = () => {
    for (let us = 0; us < props.CivilFavs.length; us++) {
      if (props.CivilFavs[us].id === builder.id) {
        setFav(true);
        break;
      }
    }
  };

  const toggleFav = () => {
    fav
      ? props.CivilremoveFavAction(props.builderInfo.id)
      : props.CivilsetFavAction({...props.builderInfo});
    setFav(!fav);
  };

  const goBack = () => NavigationRef.Navigate('Home');

  const GotoContactDetails = () => NavigationRef.Navigate('ContactDetails');

  return (
    <WrapperScreen style={{backgroundColor: colors.blueGray}}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={goBack}>
            <AntDesign
              name="arrowleft"
              color={colors.darkGray}
              size={metrics.width * 0.08}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.suggBuilderWrapper}>
          <Text style={styles.suggBuilderHeader}>{builder.name}</Text>
          <TouchableOpacity onPress={toggleFav}>
            <AntDesign
              name={fav ? 'heart' : 'hearto'}
              size={25}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.BuilderTileWrapper}>
          <ImageBackground
            source={builder.images}
            style={styles.builderTileImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.BuilderDesCentreWrapper}>
          <View style={styles.BuilderDesWrapper}>
            <HeadingWrapper name={`About ${builder.name}`} marginTop={1} />
            <Text style={styles.builderDes}>{builder.about}</Text>
            <HeadingWrapper name="Rating" />
            <View style={styles.RatingWrapper}>
              <StarRating
                rating={parseFloat(builder.rating)}
                size={metrics.width * 0.22}
              />
              <Text style={styles.RatingText}>{builder.rating}</Text>
            </View>
            <HeadingWrapper name="Phone Number" />
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                marginTop: metrics.height * 0.01,
              }}>
              {builder.number}
            </Text>
            <HeadingWrapper name="Projects" />
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: metrics.height * 0.01,
              }}>
              <View
                style={{
                  ...styles.workCubeWrapper,
                  backgroundColor: 'rgba(60,210,131,0.17)',
                }}>
                <Text style={{...styles.CuberFigure, color: '#3cd283'}}>
                  {builder.project.split('-')[0]}
                </Text>
                <Text style={styles.cubeText}>Completed</Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <TouchableOpacity onPress={GotoContactDetails} style={styles.Fab}>
        <AntDesign name="plus" size={metrics.width * 0.08} color="white" />
      </TouchableOpacity>
    </WrapperScreen>
  );
};

const HeadingWrapper = ({name, marginTop}) => (
  <View
    style={{
      ...styles.headingWrapper,
      marginTop: marginTop ? marginTop : metrics.height * 0.04,
    }}>
    <View style={styles.line} />
    <Text style={{fontWeight: 'bold'}}>
      {'  '}
      {name}
      {'  '}
    </Text>
    <View style={styles.line} />
  </View>
);
const mapStateToProps = (state) => {
  return {
    CivilFavs: state.CivilFavReducer,
    builderInfo: state.CurrentBuilderReducer,
  };
};

export default connect(mapStateToProps, {
  CivilremoveFavAction,
  CivilsetFavAction,
})(Worker);
const border = {
  borderWidth: 1,
  borderColor: 'red',
};
const styles = StyleSheet.create({
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
  line: {backgroundColor: colors.primary, height: 1.7, flex: 1},
  headingWrapper: {
    marginTop: metrics.height * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  Fab: {
    borderRadius: 11,
    width: metrics.width * 0.18,
    height: metrics.width * 0.18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: metrics.width * 0.07,
    right: metrics.width * 0.08,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  builderDes: {
    fontWeight: 'bold',
    color: '#b8b8b8',
    marginTop: metrics.height * 0.01,
    width: metrics.width * 0.79,
    textAlign: 'center',
  },
  builderName: {
    fontSize: scaleFont(21),
    width: metrics.width * 0.79,
    fontWeight: 'bold',
  },
  RatingText: {
    marginHorizontal: metrics.width * 0.05,
    fontWeight: 'bold',
    opacity: 0.7,
    fontSize: metrics.width * 0.04,
  },
  RatingWrapper: {
    marginTop: metrics.width * 0.01,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  BuilderDesCentreWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BuilderDesWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: metrics.width * 0.028,
    marginVertical: metrics.width * 0.018,
    backgroundColor: 'white',
    width: metrics.width * 0.87,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  BuilderTileWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: metrics.width * 0.028,
    borderRadius: 15,
    marginVertical: metrics.width * 0.018,
  },
  builderTileName: {
    marginTop: metrics.height * 0.01,
    fontSize: scaleFont(13),
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  builderTileImage: {
    height: metrics.width * 0.95,
    width: metrics.width * 0.8,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  suggBuilderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: metrics.width * 0.035,
  },
  suggBuilderHeader: {
    fontSize: scaleFont(25),
    fontWeight: 'bold',
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: metrics.width * 0.03,
    paddingVertical: metrics.height * 0.018,
  },
});
