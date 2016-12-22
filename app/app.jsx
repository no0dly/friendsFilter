import React      from 'react';
import ReactDOM   from 'react-dom';
import {Route}    from 'react-router';
import {Provider} from 'react-redux';

import Main       from 'Main';

const store  = require('configureStore').configure();

require('public/fonts/fira/fonts.scss');
require('AppCss');


ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>,
    document.getElementById('app')
);
