import React from 'react';
//import UserList from '../containers/user-list';
import Quote from '../containers/quote';
require('../../scss/style.scss');

const App = () => (
    <div>
      <Quote soruce="http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=mycallback"/>
    </div>
);

export default App;
