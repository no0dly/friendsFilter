import React from 'react';

import FilterContent from 'FilterContent';

export class Filter extends React.Component{
    render() {
        return (
            <div className="filter">
              <div className="filter-friends">
                <div className="filter-logo">
                    <img src="images/title.png" alt="title" className="filter-logo__img"/>
                </div>

                <FilterContent/>

              </div>
            </div>
        )
    }
}

export default Filter;
