import * as React from "react";
import { Route } from "react-router-dom";
import { AuthConsumer } from "../providers/authProvider";

export const PrivateRoute = ({ component, ...rest }) => {
    const renderFn = (Component) => (props) => (
        <AuthConsumer>
            {({ isAuthenticated, signinRedirect }) => {
                if (!!Component && isAuthenticated()) {
                    // @ts-ignore
                    return <Component {...props} />;
                } else {
                    console.log('wadwad')
                    signinRedirect();
                    return <span>loading</span>;
                }
            }}
        </AuthConsumer>
    );

    return <Route {...rest} render={renderFn(component)} />;
};