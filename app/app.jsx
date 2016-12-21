import React      from 'react';
import ReactDOM   from 'react-dom';
import {Route}    from 'react-router';
import {Provider} from 'react-redux';

import Main       from 'Main';

const store  = require('configureStore').configure();


require('style!css!sass!AppCss')
// require('font-awesome/css/font-awesome.css')

ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>,
    document.getElementById('app')
);
