import React from 'react'
import { Switch, Route } from 'react-router-dom'

import TestPage from './pages/testpage.jsx'
import AdminPage from './pages/admin.page'
import UtilsPage from './pages/utilities.page'
import LinksPage from './pages/links.page'
import LoginForm from './pages/login.page'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={LoginForm} />
        <Route exact path='/pagehome' component={AdminPage} />
        <Route exact path='/utilities' component={UtilsPage} />
        <Route exact path='/links' component={LinksPage} />
        <Route exact path='/test' component={TestPage}/>
      </Switch>
    </div>
  );
}

export default App;
