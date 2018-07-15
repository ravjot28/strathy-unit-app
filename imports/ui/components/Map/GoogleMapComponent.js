import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, {Component} from 'react';
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox';
import _ from 'lodash';
import { compose, withProps } from "recompose"

class GoogleMapComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            googleConfig:{
                defaultZoom: 4,
                locationFoundZoom:17,
                defaultLocation:{lat: 61.6517271, lng: -93.355123}
            },
            markers: [],
            bounds: null,
            locationFound:undefined
        };
    }

    shouldComponentUpdate(newProps,newState){
        if(newState.locationFound){
            return true;
        }else if (!this.state.locationFound){
            this.setState({locationFound:newProps.currentLocation});
        }else if(newProps && newProps.currentLocation && (newProps.currentLocation.lat !== this.state.locationFound.lat || newProps.currentLocation.lng !== this.state.locationFound.lng)){
            
            this.setState({locationFound:newProps.currentLocation});
        }
        return false;
    }

    onPlacesChanged(){
        const places = this.refs.searchBox.getPlaces();
        const bounds = new google.maps.LatLngBounds();

        places.forEach(place => {
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        });
        const nextMarkers = places.map(place => ({
          position: place.geometry.location,
          isOpen:false
        }));
        const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
        
        const currentMarkers = [...this.state.markers].concat(nextMarkers);

        let zoomValue = 12;

        this.setState({locationFound:{lat: nextCenter.lat(), lng: nextCenter.lng()}});

        // refs.map.fitBounds(bounds);
      }

    render(){

        let location = this.state.googleConfig.defaultLocation;
        let zoom = this.state.googleConfig.defaultZoom;

        if(this.state.locationFound){
            location  = this.state.locationFound;
            zoom = this.state.googleConfig.locationFoundZoom;
        }

        return (<GoogleMap  
                            zoom={zoom}
                            center={location}
                            defaultOptions={
                                            {
                                                mapTypeControl: false , 
                                                streetViewControl:false,		
                                                mapTypeId : google.maps.MapTypeId.ROADMAP,
                                                fullscreenControl: false,
                                                zoomControl: true, 
                                                rotateControl: false,
                                                scrollwheel: false
                                            }}>  
                            <SearchBox  ref="searchBox"
                                        bounds={this.state.bounds}
                                        controlPosition={google.maps.ControlPosition.TOP_LEFT}
                                        onPlacesChanged={this.onPlacesChanged.bind(this)}>
                                            <input  type="text"
                                                    placeholder="Enter Location"
                                                    style={{
                                                    boxSizing: `border-box`,
                                                    border: `1px solid transparent`,
                                                    width: `240px`,
                                                    height: `40px`,
                                                    marginTop: `10px`,
                                                    padding: `0 12px`,
                                                    borderRadius: `3px`,
                                                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                                    fontSize: `14px`,
                                                    outline: `none`,
                                                    textOverflow: `ellipses`,
                                                    cursor: `text`
                                                }}/>
                        </SearchBox>
                            {this.props.isMarkerShown && <Marker position={this.props.currentLocation} />}
            </GoogleMap>
        ); 
    }
}

 

export default compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDGypUeicTUNhGdEhWueQ7YqTTkXJzwuCs&v=3.exp&libraries=geometry,drawing,places",
      loadingElement:<div style={{ height: `100%` }} />,
      containerElement:<div style={{ height: `96vh`,width:`100vw` }} />,
      mapElement:<div style={{ height: `100%` }} />,
    }),
  withScriptjs,withGoogleMap)((GoogleMapComponent));