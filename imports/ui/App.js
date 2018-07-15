import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import Header from '../ui/components/Header';
import PrivateHeader from '../ui/components/PrivateHeader';

import LandingPage from '../ui/components/pages/LandingPage';
import AddAudioPage from '../ui/components/pages/AddAudioPage';
import AdminLandingPage from '../ui/components/pages/AdminLandingPage';
import AdminSignUpPage from '../ui/components/pages/AdminSignUpPage';
import AdminOperationsPage from '../ui/components/pages/AdminOperationsPage';
import NotFoundPage from '../ui/components/pages/NotFoundPage';
import {history} from '../ui/components/history';

class App extends Component{

    onEnterPrivatePage() {
        if (!Meteor.userId()) {
          browserHistory.replace('/');
        }
      };

    render(){
        return (
        <div>
            {!!Meteor.userId()?<PrivateHeader/>:<Header/>}
            <Switch>
                <Route exact path='/' component= {LandingPage}  onEnter={this.onEnterPublicPage}/>
                <Route exact path='/addAudioPage' component= {AddAudioPage}  onEnter={this.onEnterPublicPage}/>
                <Route exact path='/adminLandingPage' component={AdminLandingPage}  onEnter={this.onEnterPublicPage}/>
                <Route exact path='/adminOperationsPage' component={AdminOperationsPage}  onEnter={this.onEnterPublicPage}/>
                <Route exact path='/adminSignUpPage' component={AdminSignUpPage}  onEnter={this.onEnterPublicPage}/>
                <Route path='*' component={NotFoundPage}/>
            </Switch>
        </div>
        );
    }
}

export default App;