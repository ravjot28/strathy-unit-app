import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

class AdminSignUpPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: ''
        };
    }

    handleFormSubmit(e){
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if (password.length < 9) {
        return this.setState({error: 'Password must be more than 8 characters long'});
        }

        Accounts.createUser({email, password}, (err) => {
        if (err) {
            this.setState({error: err.reason});
        } else {
            this.setState({error: ''});
        }
        });
    }

    render(){
        return(
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Join Canadian English Atlas</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.handleFormSubmit.bind(this)} noValidate className="boxed-view__form">
                    <input type="email" ref="email" name="email" placeholder="Email"/>
                    <input type="password" ref="password" name="password"  placeholder="Password"/>
                    <button className="button">Create Account</button>
                    </form>
                    <Link to="/adminLandingPage">Have an account?</Link>
                </div>
            </div>
        );
    }

}

export default AdminSignUpPage;