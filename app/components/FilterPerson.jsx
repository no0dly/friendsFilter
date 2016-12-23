import React from 'react';

export class FilterPerson extends React.Component {
    cons
    onAdd(e) {
        e.preventDefault();

        const {dispatch} = this.props;

        dispatch();
    }

    onRemove(e) {
        e.preventDefault();

        const {dispatch} = this.props;
    }

    render() {
        const {first_name, last_name, photo_50, type} = this.props;

        const renderControl = () => {
            if (type === 'all') {
                return (
                    <a className="filter-content-btn__add" onClick={this.onAdd.bind(this)} href="#" draggable="false">
                        <i className="fa fa-plus"></i>
                    </a>
                );
            } else if (type === 'added') {
                return (
                    <a className="filter-content-btn__remove" onClick={this.onRemove.bind(this)} href="#" draggable="false">
                        <i className="fa fa-times"></i>
                    </a>
                );
            }
        }
        return (
            <li className="filter-content__item" draggable="true" data-id='uid'>
                <div className="filter-content-ava">
                    <img className="filter-content-ava__img" src={photo_50} alt="ava" draggable="false"/>
                </div>
                <div className="filter-content-name" draggable="false">
                    <div className="filter-content-name__text">
                        {first_name} {last_name}
                    </div>
                </div>
                <div className="filter-content-btn" draggable="false">
                    {renderControl()}
                </div>
            </li>
        )
    }
}

export default FilterPerson;
