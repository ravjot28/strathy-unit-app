import React from 'react';
import {Link} from 'react-router-dom';
const Header = () =>{
    return(
        <div className="header">
            <div className="header__content">
                <Link to="/" className="button button--link-text">Home</Link>
                <Link to="/" className="button button--link-text">About</Link>
                <Link to="/addAudioPage" className="button button--link-text">Add Audio</Link>
                <Link to="/" className="button button--link-text">Download Audio</Link>
                <Link to="/" className="button button--link-text">FAQ</Link>
                <Link to="/adminLandingPage" className="button button--link-text">Admin</Link>
            </div>
        </div>
    );
}

export default Header;