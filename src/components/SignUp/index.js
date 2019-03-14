import React, {Component} from 'react';
import * as axios from 'axios';
import {Grid, Header, Message, Segment, Button, Form, Checkbox} from 'semantic-ui-react'
import {API_HOST} from "../../config";
import {testAuthorization} from "../../redux/actions/authorization";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class SignUpApp extends Component {
    state = {
        userData: {
            email: ``,
            password: ``,
            firstName: ``,
            lastName: ``
        },
        agree: false,         //I agree to the Terms and Conditions
        repeatPassword: ``   // test password
    };

    getForm = e => {
        e.preventDefault();
        let validationLogin = /^\w+@\w+\.\w{2,4}$/i,
            email = this.state.userData.email,
            password = this.state.userData.password,
            repeatPassword = this.state.repeatPassword,
            firstName = this.state.userData.firstName,
            lastName = this.state.userData.lastName;

        if (firstName.length === 0 || lastName.length === 0) {
            (firstName.length === 0 && lastName.length === 0) ?
                alert(`Введите имя и фамилию`) : alert((firstName.length === 0) ?
                `Введите имя` : `Введите фамилию`)
        }
        else if (firstName.search(/\d/) !== -1) {
            alert(`Имя введено некорректно!`)
        }
        else if (lastName.search(/\d/) !== -1) {
            alert(`Фамилия введена некорректно!`)
        }
        else if (email.length === 0 || password.length === 0) {
            (email.length === 0 && password.length === 0) ?
                alert(`Введите логин и пароль`) : alert((email.length === 0) ?
                `Email не введен` : `Пароль не введен`)
        }
        else if (!validationLogin.test(email)) {
            alert(`Введен некорректный email!`)
        }
        else if (password !== repeatPassword) {
            alert(`Пароли не совпадают`)
        }
        else if (password.length < 6) {
            alert(`Пароль слишком легкий`)
        }
        else if (!this.state.agree) {
            alert(`Для регистрации Вы должны принять условия и положения сайта`)
        }
        else {
            axios.post(`${API_HOST}signUp`, this.state.userData)
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
                        Sign Up
                    </Header>
                    <Form size='large' onSubmit={this.getForm}>
                        <Segment stacked>
                            <Form.Input
                                name='firstName'
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='First name'
                                onChange={this.inputChange}/>
                            <Form.Input
                                name='lastName'
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='Last name'
                                onChange={this.inputChange}/>
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
                            <Form.Input
                                name='repeatPassword'
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Repeat password'
                                type='password'
                                onChange={(event) => {
                                    this.setState({
                                        repeatPassword: event.target.value
                                    })
                                }}
                            />
                            <Form.Field>
                                <Checkbox
                                    onChange={() => !this.state.agree ? this.setState({agree: true}) : this.setState({agree: false})}
                                    label='I agree to the Terms and Conditions'/>
                            </Form.Field>
                            <Button color='teal' fluid size='large'>
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Do you have an account?  <Link to="/SignIn">Sign In</Link>
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

const SignUp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpApp);

export default SignUp;

