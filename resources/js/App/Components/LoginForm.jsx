import React from 'react';

export default class LoginForm extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind( this );
        this.handleFormSubmit = this.handleFormSubmit.bind( this );
    }

    handleChange( event ) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState( { [nam]: val } );
    }

    handleFormSubmit( event ) {
        event.preventDefault();

        fetch( 'api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                email: this.state.email,
                password: this.state.password
            } )
        } )
            .then( response => response.json() )
            .then( data => {
                if ( data.status === 'success' ) {
                    this.props.onLoginSuccess( data.data.token )
                }
            } )
    }

    render() {
        return (
            <>
                <h1>Login form</h1>
                <form action="" method="post" onSubmit={this.handleFormSubmit}>
                    Email:<br />
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} /><br />
                    Password:<br />
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /><br />
                    <input type="submit" value="Log in" />
                </form>
            </>
        )
    }
}
