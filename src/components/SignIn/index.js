import React, {Component} from 'react';
import * as axios from 'axios';
import {connect} from 'react-redux'
import {testAuthorization} from "../../redux/actions/authorization"
import {Grid, Header, Message, Segment, Button, Form} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {API_HOST} from "../../config";

class SignInApp extends Component {
    state = {
        userData: {
            email: ``,
            password: ``
        }
    };
    getForm = e => {
        e.preventDefault();
        let validationLogin = /^\w+@\w+\.\w{2,4}$/i,
            email = this.state.userData.email,
            password = this.state.userData.password;
        if (email.length === 0 || password.length === 0) {
            (email.length === 0 && password.length === 0) ?
                alert(`Введите логин и пароль`) : alert((email.length === 0) ?
                `Email не введен` : `Пароль не введен`)
        }
        else if (!validationLogin.test(email)) {
            alert(`Введен некорректный email!`)
        }
        else {
            axios.post(`${API_HOST}signIn`, this.state.userData)
                .then(({data}) => {
                        localStorage.setItem("token", data.token);
                        this.props.testAuthorization(data.email, data.token);
                    }
                )
        }
    };
    inputChange = event => {
        this.setState({
            userData: {
                ...this.state.userData,
                [event.target.name]: event.target.value
            }
        });
    };

    render() {
        return (
            <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Log-in to your account
                    </Header>
                    <Form size='large' onSubmit={this.getForm}>
                        <Segment stacked>
                            <Form.Input
                                name='email'
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                onChange={this.inputChange}/>
                            <Form.Input
                                name='password'
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={this.inputChange}
                            />
                            <Button color='teal' fluid size='large'>
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to="/SignUp">Sign Up</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = ({authorization}) => ({authorization});

const mapDispatchToProps = dispatch => ({
    testAuthorization: (email, token) => dispatch(testAuthorization(email, token))
});

const SignIn = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInApp);

export default SignIn;
