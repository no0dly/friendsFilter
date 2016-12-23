import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

import FilterList from 'FilterList';

var api = require('api');

export class FilterMain extends React.Component {

    componentDidMount() {

        var {dispatch} = this.props;

        api.init().then(()=> {
            dispatch(actions.startGetAllFriends());
        });
    }

    render() {
        const { allFriends, addedFriends } = this.props;

        return (
            <div className="filter-content">
                <div className="filter-content-left">
                    <div className="filter-content-title">
                        <div className="filter-content-title__text">Your friends</div>
                    </div>

                    <FilterList list={allFriends} type='all'/>

                </div>
                <div className="filter-content-right">
                    <div className="filter-content-title">
                        <div className="filter-content-title__text">Friends in the list</div>
                    </div>

                    <FilterList list={addedFriends} type='added'/>
                  </div>
            </div>
        )
    }
}

export default Redux.connect(
    (state) => {
        return {
            allFriends: state.allFriends,
            addedFriends: state.addedFriends
        }
    }
)(FilterMain);
