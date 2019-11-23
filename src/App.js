import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import Header from './components/header/header.component';

class App extends React.Component {
	constructor(){
		super();

		this.state = {
			currentUser: null
		}
	}

	unsubscribeFromAuth = null;

	componentDidMount() {
		// this method(onAuthStateChanged) is open subscription so we need to close it until we don't need it and save memony
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => {
						// console.log(this.state);
					});

          
        });
      }else{
				// if the user log out set the current user to null
				this.setState({ currentUser: userAuth });
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
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path='/' component={HomePage}></Route>
					<Route path='/shop' component={ShopPage}></Route>
					<Route path='/signin' component={SignInAndSignUpPage}></Route>
				</Switch>
			</div>
		);
	}
  
}

export default App;
