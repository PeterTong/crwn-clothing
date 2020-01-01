import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';
import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
	const { title, items } = collection;
	return(
		<div className='collection-page'>
		<h2 className='title'>{title}</h2>
		<div className='items'>
			{items.map(item =>(
				<CollectionItem key={item.id} item={item}/>
			))}
		</div>
	</div>
	);
};
	
// ownProps which is the props of the component that we are wrapping in our connect
// ownProps refers to the props that were passed down by the parent(Route).
const mapStateToProps = (state, ownProps) => ({
	// this is necessary to pass the state in this selector because unlike other selectors,
	// this selector needs a part of the state depending on the URL parameter!
	// because our select collection is a function that returns a function we pass the function that comes out of this function the state in order for us to wrap everything together
	collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
