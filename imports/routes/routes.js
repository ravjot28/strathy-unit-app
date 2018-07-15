import React from 'react';
import { Router} from 'react-router-dom';
import {history} from '../ui/components/history';

import App from '../ui/App';

const unauthenticatedPages = ['/', '/adminSignUpPage','/adminLandingPage','/addAudioPage'];
const authenticatedPages = ['/adminOperationsPage'];


export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
  
    if (isUnauthenticatedPage && isAuthenticated) {
        history.push('/adminOperationsPage');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.push('/adminLandingPage');
    }
};



const Routers = (
    <Router history={history}>
        <App/>
    </Router>
);

export default Routers;