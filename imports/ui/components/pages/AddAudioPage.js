import React, {Component} from 'react';

import GoogleMapComponent from '../Map/GoogleMapComponent';
import {geolocated} from 'react-geolocated';

class AddAudioPage extends Component{
    render(){      
        let location = undefined;

          if(!this.props.isGeolocationAvailable || !this.props.isGeolocationEnabled){
            alert('Your browser does not support Geolocation');
          }else if(this.props.coords){
            location = {lat: this.props.coords.latitude, lng: this.props.coords.longitude };
          }

        return(
                <GoogleMapComponent currentLocation={location}
                                    isMarkerShown/>
        );
    }
}

export default geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(AddAudioPage);