import React from 'react';

import FilterPerson from 'FilterPerson';

export class FilterList extends React.Component {
    render() {
        const {list, type} = this.props;
        const renderFriends = () => {
            if(list) {
                return list.map( (friend) => {
                    return <FilterPerson key={friend.uid} {...friend} type={type}/>
                })
            }
        }

        return (
            <ul id="allFriends" className="filter-content__list">
                {renderFriends()}
            </ul>
        )
    }
}

export default FilterList;
