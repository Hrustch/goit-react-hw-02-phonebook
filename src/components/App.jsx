import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section';
import { PhonebookForm } from './PhonebookForm';
import { PhonebookContacts } from './PhonebookContacts';
import { PhonebookFilter } from './PhonebookFilter';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addNewContact = (sentContact) => {
    const isExist = this.state.contacts.find((contact) => (contact.name === sentContact.name || contact.number === sentContact.number) );
    if (isExist) {
      alert('Such contact already exists!');
      return;
    }
    /* for (const contact of this.state.contacts) {
      if (contact.name === sentContact.name || contact.number === sentContact.number) {
        console.log("Return!");
        alert('Such contact already exists! '+  JSON.stringify(contact))
        return;
      } 
    }
    */
    console.log('Writing new user!');
    const user = {
      id: nanoid(),
      name: sentContact.name,
      number: sentContact.number,
    };
  };

  onFilterChange = (event) => {
    console.log('Filter changed!');
    this.setState({ filter: event.target.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContactById = (id) => {
    this.setState(prefState => ({
      contacts: prefState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div>
        <Section title="Phonebook">
          <PhonebookForm addNewContact={this.addNewContact} />
        </Section>
        <Section title="Contacts">
          {this.state.contacts.length > 0 ? (
            <>
              <PhonebookFilter
                filter={this.state.filter}
                onFilterChange={this.onFilterChange}
              />
              <PhonebookContacts
                contactsArr={this.getFilteredContacts()}
                deleteContactById={this.deleteContactById}
              />
            </>
          ) : (
            <p>No contacts found yet. Please add new contact!</p>
          )}
        </Section>
      </div>
    );
  }
}
