import React from 'react';

export class FilterMain extends React.Component {

    render() {
        return (
            <div className="filter-content">
              <div className="filter-content-left">
                <div className="filter-content-title">
                  <div className="filter-content-title__text">Your friends</div>
                </div>
                <ul id="allFriends" className="filter-content__list filter-content__list--all">

                </ul>
              </div>
              <div className="filter-content-right">
                <div className="filter-content-title">
                  <div className="filter-content-title__text">Friends in the list</div>
                </div>
                <ul id="addedFriends" className="filter-content__list filter-content__list--added">

                </ul>
              </div>
            </div>
        )
    }
}

export default FilterMain;
