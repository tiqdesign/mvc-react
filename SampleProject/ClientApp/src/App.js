import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { CalisanListe } from './components/CalisanListe';
import { CalisanEkle } from './components/CalisanEkle';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route exact path='/CalisanListe' component={CalisanListe} />
            <Route exact path='/CalisanEkle' component={CalisanEkle} />
            <Route exact path='/CalisanEkle/Edit/:id' component={CalisanEkle} />
      </Layout>
    );
  }
}
