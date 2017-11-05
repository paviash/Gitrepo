/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';

const UserAPI = require('./utils/UserAPI');
const UserList = require('./components/UserList.react');

UserAPI.get();

ReactDOM.render(<UserList />, document.getElementById('application'));

module.hot.accept();
