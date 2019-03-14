//////////////   React     ///////////////////////
import React, {Component} from 'react';
//////////////   Router     ///////////////////////
import {Route, NavLink} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {Router} from 'react-router-dom';
//////////////   Links    //////////////////////
import AuthLinks from "./AuthLinks"
import AppLinks from "./AppLinks"
//////////////   Routes  ///////////////////////
import AuthRoutes from "./AuthRoutes"
import AppRoutes from "./AppRoutes"
/////////////    Redux  ///////////////////////
import {connect} from 'react-redux'


const history = createBrowserHistory();


class Routers extends Component {
    render() {
        this.arrAuth = [AuthLinks, AuthRoutes];
        this.arrApp = [AppLinks, AppRoutes];

        this.arrList = (!this.props.authorization.authBool) ?  this.arrAuth : this.arrApp;
        this.Links = this.arrList[0].map(item => {
            return (
                <NavLink to={item.path} key={item.key}>{item.title}</NavLink>
            )
        });
        this.Routes = this.arrList[1].map(item => {
            return (
                <Route path={item.path} component={item.component} key={item.key}/>
            )
        });
        return (
            <Router history={history}>
                <>
                    <div className="SideBar">
                        {this.Links}
                    </div>
                    <div className={"Menu"}>
                        {this.Routes}
                    </div>
                </>
            </Router>
        );
    }
}

const mapStateToProps = ({authorization}) => ({authorization});

const RouterApp = connect(
    mapStateToProps
)(Routers);

export default RouterApp;