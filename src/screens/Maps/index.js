
import * as React from 'react';
import {
  Platform,
  View,
  Linking,
  BackHandler,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  StatusBar,
  StyleSheet,
  AppState
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Polyline, Callout } from 'react-native-maps';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('screen')
const item_width = width * 0.76
const item_height = item_width * 1.54

const item_size = width * 0.72
const spacing = 10

const MAPSTYLE = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.government",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.medical",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "poi.place_of_worship",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.sports_complex",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]

export default class MapsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    latitude: -6.211469768685579,
    longitude: 106.85915706830579,
    PolylineData: [],
    DataArr  : [],
    latitudeDelta: 0.00522,
    longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.00522,
    onselectList: false,
    appState: AppState.currentState
    }
  }

  UNSAFE_componentWillMount() {
    this.reqPermision();
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      this.mapView.animateToRegion({
        latitude: this.state.latitude,
        longitude:this.state.longitude,
        latitudeDelta: 0.00522,
        longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.00522
        },1000)
      this.getDataArr(this.state.latitude, this.state.longitude);
      this.setState({ latitude: this.state.latitude, longitude:this.state.longitude })
    }
    this.setState({appState: nextAppState});
  }

  reqPermision(){
    if (Platform.OS !='ios'){
      check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then((result) => {
              if (result == 'granted') {
                console.log('The permission has granted');
              }
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            Geolocation.getCurrentPosition(
              (position) => {
                this.setState({
                  latitude: position.coords.latitude,
                  longitude:position.coords.longitude,
                })
                console.log(JSON.stringify({
                  lat :position.coords.latitude ,
                  lon: position.coords.longitude
                }))
                this.mapView.animateToRegion({
                  latitude:position.coords.latitude,
                  longitude:position.coords.longitude,
                  latitudeDelta: 0.00522,
                  longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.00522
                },1000)
                this.getDataArr(position.coords.latitude, position.coords.longitude);
                
              },
              (error) => {
                console.log(error.code, error.message);
                return unsubscribe;
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        return unsubscribe;
      });
    }else{
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
              if (result == 'granted') {
                console.log('The permission has granted');
              }
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            Geolocation.getCurrentPosition(
              (position) => {
                this.mapView.animateToRegion({
                  latitude: position.coords.latitude,
                  longitude:position.coords.longitude,
                  latitudeDelta: 0.00522,
                  longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.00522
                },1000)
                this.getDataArr(position.coords.latitude, position.coords.longitude);
                this.setState({
                  latitude: position.coords.latitude,
                  longitude:position.coords.longitude,
                })
                
              },
              (error) => {
                console.log(error.code, error.message);
                return unsubscribe;
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        alert(error)
        return unsubscribe;
      });
    }
  }


  

  onchageLoc = (coordinate) => {
    this.setState({
      latitude: coordinate.coordinate.latitude,
      longitude:coordinate.coordinate.longitude
    })

    // if(this.state.latitude != coordinate.coordinate.latitude && this.state.longitude != coordinate.coordinate.longitude ){
    //   this.getDataArr(coordinate.coordinate.latitude, coordinate.coordinate.longitude)
    //   this.mapView.animateToRegion({
    //     latitude: coordinate.coordinate.latitude,
    //     longitude: coordinate.coordinate.longitude,
    //     latitudeDelta: this.state.latitudeDelta,
    //     longitudeDelta: this.state.longitudeDelta,
    //   },1000)
    //   // var element = {
    //   //   "latitude" : coordinate.coordinate.latitude,
    //   //   "longitude": coordinate.coordinate.longitude
    //   //     }
    //   // setTimeout(() => {
        
    //   //   this.setState({
    //   //     PolylineData : [...this.state.PolylineData, element]
    //   //   })
    //   //   console.log(JSON.stringify(this.state.PolylineData))
    //   // }, 2000);
    // }
}

getDataArr(lat, lon) {
  axios
    .get('https://ujiemisi.jakarta.go.id/android/bengkel.php?'+"lat="+lat + "&long=" + lon)
    .then( (response) => {
      this.setState({
        DataArr : response.data[0].data
      })
      setTimeout(() => {
        this.fitMapView()
      }, 800);
    })
    .catch(function (error) {
      alert(error)
    });
}

fitMapView() {
  let coordinates = [];
  for (let i = 0; i < this.state.DataArr.length; i++) {
    let coordinate = {
      latitude: this.state.DataArr[i].latitude,
      longitude: this.state.DataArr[i].longitude,
      key: i + 1
    };
    coordinates.push(coordinate);
  };
  this.mapView.fitToCoordinates(coordinates, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: true })
}

onPressZoomIn() {
  this.region = {
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: this.state.latitudeDelta * 10,
    longitudeDelta: this.state.longitudeDelta * 10
  }

  this.setState({
    latitudeDelta: this.region.latitudeDelta,
    longitudeDelta: this.region.longitudeDelta,
    latitude: this.region.latitude,
    longitude: this.region.longitude
  })
  this.mapView.animateToRegion(this.region, 100);
}

onPressZoomOut() {
  this.region = {
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: this.state.latitudeDelta / 10,
    longitudeDelta: this.state.longitudeDelta / 10
  }
  this.setState({
    latitudeDelta: this.region.latitudeDelta,
    longitudeDelta: this.region.longitudeDelta,
    latitude: this.region.latitude,
    longitude: this.region.longitude
  })
  this.mapView.animateToRegion(this.region, 100);
}

 onClickList(lat, lon, index){
  // this.setState({onselectList : true})
  this.mapView.animateToRegion({
    latitude:parseFloat(lat),
    longitude:parseFloat(lon),
    latitudeDelta: 0.00522,
    longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.00522
  },1000)
   this.goIndex(index);
}

goIndex = (i) => {
  this.flatList_Ref.scrollToIndex({animated: true,index:i});
 };

  render() {
    
    return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#232526', '#414345']} style={{ flex: 1, justifyContent: 'center' }}>
      <MapView
      ref={ref => { this.mapView = ref; }}
        customMapStyle={MAPSTYLE}
        showsCompass
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta,
        }}
        followsUserLocation
        loadingEnabled
      >
        <Marker
          draggable
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }}
        >
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#b92b27', '#1565c0']} style={{width:42,height:42, borderRadius:20, justifyContent:'center', alignItems:'center'}}>
          <Image style={{width:36, height:36, zIndex:20}} source={require('../../res/Image/userDefault.png')}/>
        </LinearGradient>
        </Marker>

        {this.state.DataArr.length != 0 ? 
        this.state.DataArr.map((routes, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(routes.latitude) ,
              longitude: parseFloat(routes.longitude)
            }}
            title={routes.nama_bpue + " ("+routes.telp1+")"}
            description={routes.alamat_bpue + "\n" + routes.telp1 }
            flat={true}
          >
          <Image style={{width:18, height:18}} source={require('../../res/Image/tools.png')}/>
          </Marker>
        )) : null
        }

        {this.state.PolylineData.length != 0 ? 
          <Polyline
              coordinates={this.state.PolylineData}
              strokeColor='#8EF831'
              strokeWidth={4}
            /> : null
        }
      </MapView>
      <View style={{position:'absolute', bottom:0, right:0}}>
        <View style={{width:40, marginLeft:'auto', alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.onPressZoomOut()}  style={{padding:8, backgroundColor:'#FFFF', borderWidth:0.8, width:30}}>
              <Text style={{fontWeight:'700', fontSize:14, color:'black', alignSelf:'center'}}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.onPressZoomIn() }}  style={{padding:8, backgroundColor:'#FFFF', borderWidth:0.8, width:30,}}>
              <Text style={{fontWeight:'700', fontSize:14, color:'black', alignSelf:'center'}}>-</Text>
            </TouchableOpacity>
        </View>
          <View>
          <FlatList
              ref={ref => {
                  this.flatList_Ref = ref;
                }}
              showsHorizontalScrollIndicator={false}
              horizontal
              // pagingEnabled
              // onScroll={Animated.event(
              //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              //   { useNativeDriver: true }
              // )}
              data={this.state.DataArr}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => {
                return <View style={{backgroundColor:'transparent'}}>
                          <LinearGradient
                          start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#8e9eab', '#eef2f3']}
                           style={{
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.23,
                            shadowRadius: 2.62,
                            elevation: 4,
                              margin:8, 
                              padding:10,
                              borderRadius:10, 
                              width:wp("70%"),
                              height:hp("25%")}}>
                            <Text numberOfLines={2} style={{fontWeight:"bold", fontSize:14, color:"#000", marginBottom:4,textTransform:"uppercase"}}>{item.nama_bpue}</Text>
                              <Text  style={{ fontSize:12, color:"#807D7D"}}>{item.alamat_bpue.replace("\r\n","")}</Text>
                              <Text numberOfLines={1} style={{ fontSize:12, color:"#807D7D", marginTop:4}}>tlp: {item.telp1} - {item.telp2} Fax : {item.fax}</Text>
                              <View style={{flexDirection:"row", marginTop:8, alignItems:'center'}}>
                              <Image style={{width:16, height:16,}} source={require('../../res/Image/distance.png')}/>
                              <Text style={{ fontSize:12, color:"#807D7D", marginLeft:10}}>{item.jarak} KM</Text>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width:wp("60%"), alignSelf:'center', marginTop:12, position:'absolute', bottom:12}}>
                              <TouchableOpacity onPress={()=>this.onClickList(item.latitude, item.longitude, index)} style={{borderWidth:0.8, padding:6, borderRadius:10, width:wp("25%"), alignItems:"center"}}>
                                <Text style={{fontWeight:"600"}}>View</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={()=>this.onClickList(item.latitude, item.longitude)} style={{borderWidth:0.8, padding:6, borderRadius:10, borderRadius:10, width:wp("25%"), alignItems:"center"}}>
                                <Text style={{fontWeight:"600"}}>Direction</Text>
                              </TouchableOpacity>
                            </View>
                            
                          </LinearGradient>
                </View>

              }}
            />
          </View>
        </View>
            {/* <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style={{ display: 'none' }}
                showsUserLocation={true}
                followUserLocation={true}
                cacheEnabled={false}
                onUserLocationChange={e => this.onchageLoc(e.nativeEvent)}
                userLocationUpdateInterval={10000}
              >
              </MapView> */}
    </LinearGradient>
    );
  }
}