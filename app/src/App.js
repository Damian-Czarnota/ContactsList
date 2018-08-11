import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
  state = {
   screen:'list',
   contacts : []
  };

    componentDidMount(){
        ContactsAPI.getAll().then(data =>{
            this.setState({contacts:data})
        })
    }

  removeContact = (contact) =>{
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !==contact.id)
    }));
      ContactsAPI.remove(contact);
  };

    createContact = (contact) =>{
        ContactsAPI.create(contact).then( contacts =>{
            this.setState((state) =>({
                contacts:state.contacts.concat([contacts])
            }))
        });
    };

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={() => (<ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts}/>)} />
          <Route path="/create" render={({history}) => (
          <CreateContact onCreateContact={(contact) =>{
          this.createContact(contact);
          history.push('/');
          }
          }/>
          )} />
      </div>
        )
  }
}

export default App;
