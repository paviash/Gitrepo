/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';

const UserList = require('./components/UserList.react');

ReactDOM.render(<UserList />, document.getElementById('application'));

module.hot.accept();
