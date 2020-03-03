import React from "react";
import { Route } from 'react-router-dom';


import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// Because the ShopPage is routed in App.js, so it will pass the props into it including 'match', 'history', 'location'
// we can access 'match' props
class ShopPage extends React.Component {
	unsubscribeFromSnapshot = null;

	componentDidMount(){
		const collectionRef = firestore.collection('collections');
		// we perform some asychronous requests because the data is on the actual objects inside of this query snapshot 
		collectionRef.onSnapshot(async snapshot => {
			
			convertCollectionsSnapshotToMap(snapshot);
		});
	}

	render() {
		const { match } = this.props;
		return (
			<div className="shop-page">
				<Route exact path={`${match.path}`} component={CollectionsOverview} />
				{/* this allow us to access this categoryId as a parameter on the match object when we are inside of our category */}
		
				<Route path={`${match.path}/:collectionId`} component={CollectionPage} />
			</div>
		);
	}
}

export default ShopPage;
