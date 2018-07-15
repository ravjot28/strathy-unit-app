import React from 'react';
import {Link} from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
const PrivateHeader = () =>{
    return(
        <div className="header">
            <div className="header__content">
                <Link to="/" className="button button--link-text">Home</Link>
                <button  className="button button--link-text" onClick={()=>Accounts.logout()}>Logout</button>
            </div>
        </div>
    );
}

export default PrivateHeader;