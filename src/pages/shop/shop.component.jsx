import React from "react";
import { Route } from 'react-router-dom';


import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

// Because the ShopPage is routed in App.js, so it will pass the props into it including 'match', 'history', 'location'
// we can access 'match' props 
const ShopPage = ({ match }) => {
	console.log(match);
	return (
  <div className="shop-page">
		<Route exact path={`${match.path}`} component={CollectionsOverview} />
		{/* this allow us to access this categoryId as a parameter on the match object when we are inside of our category */}

		<Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
)};

export default ShopPage;
