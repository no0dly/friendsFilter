import React from 'react';

export class FilterSearch extends React.Component {
    render() {
        return (
            <div className="filter-search">
              <div className="filter-search-left">
                <input type="search" name="left-name" id="leftName" placeholder="Начните вводить имя друга" className="filter-search__input"/>
                <div className="filter-search__btn"><i className="fa fa-search"></i></div>
              </div>
              <div className="filter-search-right">
                <input type="search" name="right-name" id="rightName" placeholder="Имя в списке" className="filter-search__input"/>
                <div className="filter-search__btn"><i className="fa fa-search"></i></div>
              </div>
            </div>
        )
    }
}

export default FilterSearch;
