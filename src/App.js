import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth } from './firebase/firebase.utils';

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
		this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
			this.setState({ currentUser: user });

			console.log(user);
		});
	}
	
	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header/>
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
