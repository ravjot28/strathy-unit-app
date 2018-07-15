import React, {Component} from 'react';

import GoogleMapComponent from '../Map/GoogleMapComponent';

class LandingPage extends Component{

    render(){    
        return(
                <GoogleMapComponent isMarkerShown={false}/>
        );
    }
}

export default LandingPage;