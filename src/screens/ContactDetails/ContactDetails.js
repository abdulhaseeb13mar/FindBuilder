/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {metrics, scaleFont, colors} from '../../shared/Theme';
import {Button, Overlay} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {isFormValid} from './Validation';
import NavigationRef from '../../shared/RefNavigation';
import {setUserInfoAction} from '../../store/actions';
import Toast from 'react-native-root-toast';

const ContactDetails = (props) => {
  const [firstName, setFirstName] = useState('');
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [address, setAddress] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const builder = props.builderInfo;

  const Hire = () => {
    const formValidResponse = isFormValid(firstName, email, phone, address);
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      CallApi();
      setUserInfoAction({
        firstName: firstName,
        email: email,
        phone: phone,
        address: address,
      });
    }
  };

  const ShowToast = (msg) => {
    Toast.show(msg, {
      backgroundColor: colors.secondary,
      textColor: 'white',
      opacity: 1,
      position: -60,
    });
  };

  const CallApi = async () => {
    console.log('API CALL START');
    setLoading(true);
    try {
      const res = await fetch(
        'https://reactnativeapps.herokuapp.com/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName,
            phonenumber: phone,
            address: address,
            email: email,
            appname: 'Find Builder',
          }),
        },
      );

      const response = await res.json();
      console.log(response);
      setLoading(false);
      response.status ? setShowModal(true) : ShowToast('Some error occurred');
    } catch (error) {
      console.log(error);
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setFirstNameErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setFirstNameErrMsg(errMsg);
      setEmailErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setFirstNameErrMsg('');
      setEmailErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    NavigationRef.Push('Home');
  };

  const changeFirstName = (t) => setFirstName(t);
  const changeEmail = (t) => setEmail(t);
  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const goBack = () => NavigationRef.GoBack();

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
        <View style={styles.bookingDetailsCenterOverlay}>
          <TouchableOpacity
            onPress={goBack}
            style={styles.bookingDetailsWrapper}>
            <ImageBackground
              source={builder.images}
              style={styles.builderTileImage}
              resizeMode="contain"
            />
            <View style={styles.DetailWrapper}>
              <Text style={styles.DetailName}>{builder.name}</Text>
              <Text style={styles.DetailValue}>
                <AntDesign
                  name="star"
                  color="#ffce33"
                  size={metrics.width * 0.04}
                />
                {' ' + builder.rating}
              </Text>
              <Text>{builder.number}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.personalInfoWrapper}>
          <Text style={styles.personalInfoHeader}>Your Information</Text>
        </View>
        <View style={styles.PersonalInfoWrapper}>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : colors.primary,
              }}>
              FULL NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <MaterialIcons
                name="person"
                size={metrics.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Full Name"
                style={styles.Input}
                onChangeText={changeFirstName}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: emailErrMsg ? 'red' : colors.primary,
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <MaterialIcons
                name="email"
                size={metrics.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Email"
                style={styles.Input}
                onChangeText={changeEmail}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: phoneErrMsg ? 'red' : colors.primary,
              }}>
              PHONE<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <MaterialIcons
                name="phone-iphone"
                size={metrics.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={styles.Input}
                onChangeText={changePhone}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: addressErrMsg ? 'red' : colors.primary,
              }}>
              ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <MaterialIcons
                name="location-pin"
                size={metrics.width * 0.07}
                style={{
                  ...styles.inputIcon,
                  alignSelf: 'flex-start',
                  marginTop: 10,
                }}
              />
              <TextInput
                placeholder="Address"
                style={{...styles.Input, height: 100, textAlignVertical: 'top'}}
                multiline={true}
                onChangeText={changeAddress}
              />
            </View>
          </View>
        </View>
        <View style={styles.ConfirmButtonWrapper}>
          <Button
            title="CONFIRM BOOKING"
            raised
            buttonStyle={styles.confirmButton}
            containerStyle={styles.confirmButtonContainer}
            onPress={Hire}
            loading={loading}
            titleStyle={{color: 'black', fontWeight: 'bold'}}
          />
        </View>
        <Overlay
          isVisible={showModal}
          onBackdropPress={closeModal}
          animationType="fade">
          <View style={styles.ModalWrapper}>
            <Entypo
              name="tools"
              size={metrics.width * 0.25}
              color={colors.primary}
            />
            <Text style={styles.ModalHeadText}>THANK YOU!</Text>
            <Text style={styles.ModalSubText}>
              Your booking has been confirmed
            </Text>
          </View>
        </Overlay>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    builderInfo: state.CurrentBuilderReducer,
  };
};

export default connect(mapStateToProps, {setUserInfoAction})(
  React.memo(ContactDetails),
);

const styles = StyleSheet.create({
  builderTileImage: {
    width: metrics.width * 0.3,
    height: metrics.width * 0.35,
    backgroundColor: 'white',
  },
  ModalSubText: {
    fontSize: metrics.width * 0.045,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ModalHeadText: {
    fontSize: metrics.width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ModalWrapper: {
    paddingVertical: metrics.height * 0.04,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.width * 0.8,
  },
  confirmButtonContainer: {width: '100%', elevation: 5},
  confirmButton: {
    backgroundColor: colors.primary,
    padding: metrics.height * 0.018,
  },
  ConfirmButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: metrics.width * 0.035,
    marginBottom: metrics.height * 0.02,
  },
  Input: {
    width: '91%',
    height: metrics.height * 0.065,
  },
  inputIcon: {
    width: '7%',
    color: colors.primary,
    marginRight: '2%',
  },
  personalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  personalInfoHeadingName: {
    fontSize: scaleFont(13),
    fontWeight: 'bold',
  },
  singlePersonalInfoWrapper: {
    marginVertical: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  PersonalInfoWrapper: {
    marginHorizontal: metrics.width * 0.035,
    marginVertical: 20,
  },
  personalInfoHeader: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
  },
  personalInfoWrapper: {
    marginHorizontal: metrics.width * 0.035,
  },
  bookingDetailHeaderWrapper: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    width: '70%',
  },
  detailsHeading: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  DetailValue: {
    color: colors.darkGray,
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    marginTop: metrics.height * 0.01,
  },
  bookingDetailsWrapper: {
    borderColor: '#edeef0',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    marginVertical: metrics.height * 0.01,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  DetailName: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    width: metrics.width * 0.35,
  },
  DetailWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: metrics.width * 0.06,
  },
  bookingDetailsCenterOverlay: {
    marginBottom: metrics.height * 0.01,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderText: {
    marginLeft: metrics.width * 0.23,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: scaleFont(20),
  },
  container: {flex: 1},
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: metrics.width * 0.03,
    paddingVertical: metrics.height * 0.018,
  },
});
