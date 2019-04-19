import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import Films from '../components/films/list/Films';
import FilmDetail from '../components/films/detail/FilmDetail';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/films/:idMovie" component={FilmDetail}/>
        <Route path="/films" component={Films}/>
        <Route path="/home" component={Home}/>
        <Redirect from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  )
}