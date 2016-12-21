import React from 'react';

import FilterSearch from 'FilterSearch';
import FilterMain from 'FilterMain';
import FilterForm from 'FilterForm';

export class FilterContent extends React.Component {
    render() {
        return (
            <div className="filter-friends__wrap">
              <div className="filter-title">
                <div className="filter-title__left">
                  <div className="filter-title__text">Choose friends</div>
                </div>
                <div className="filter-title__right">
                    <a href="#" className="filter-title__close">
                        <i className="fa fa-times"></i>
                    </a>
                </div>
              </div>

              <FilterSearch/>
              <FilterMain/>
              <FilterForm/>

            </div>
        )
    }
}

export default FilterContent;
