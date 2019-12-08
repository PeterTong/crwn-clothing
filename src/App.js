import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { createStructuredSelector } from 'reselect';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from './redux/user/user.selectors';

import Header from "./components/header/header.component";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
		const {setCurrentUser} = this.props;
    // this method(onAuthStateChanged) is open subscription so we need to close it until we don't need it and save memony
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(
          snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
          },
          () => {
            // console.log(this.state);
          }
        );
      } else {
        // if the user log out set the current user to null
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    // Calling the unsubscribe function when the component is about to unmount is the best way to make sure we don't get any memory leaks in our application
    // related to listeners still being open even if the component that cares about the listener is no longer on the page.
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}></Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  // get the user object
  // dispatch means whatever object you're passing me is going to be
  // an action object that I am going to pass to every reducer so
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
// DispatchToProps vs MapStateToProps
// to clarify  DispatchToProps triggers a function from actions file and MapStateToProps allows you to access the state types on your reducer files correct? :)

