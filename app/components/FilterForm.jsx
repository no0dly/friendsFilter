import React from 'react';

export class FilterForm extends React.Component{
    render() {
        return (
            <form className="filter-save">
                <input type="submit" value="Сохранить" id="submit" className="filter-save__btn"/>
            </form>
        )
    }
}

export default FilterForm;
