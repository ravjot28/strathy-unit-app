import { Meteor } from 'meteor/meteor';
import ReactDom from 'react-dom';
import Routers,{onAuthChange} from '../imports/routes/routes';
import { Tracker } from 'meteor/tracker';

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);

});



Meteor.startup(() => {
    ReactDom.render(Routers, document.getElementById('app'));
});

