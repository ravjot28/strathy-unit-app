import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class AdminLandingPage extends Component{
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

        Meteor.loginWithPassword({email}, password, (err) => {
        if (err) {
            this.setState({error: 'Unable to login. Check email and password.'});
        } else {
            this.setState({error: ''});
        }
        });
    }

    render(){
        return(
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Canadian English Atlas Login</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.handleFormSubmit.bind(this)} noValidate className="boxed-view__form">
                    <input type="email" ref="email" name="email" placeholder="Email Address"/>
                    <input type="password" ref="password" name="password" placeholder="Password"/>
                    <button className="button">Login</button>
                    </form>
                    <Link to="/adminSignUpPage">Don't have the account?</Link>
                </div>
            </div>
        );
    }

}

export default AdminLandingPage;