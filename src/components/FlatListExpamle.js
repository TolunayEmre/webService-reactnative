import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native';

import axios from 'axios';

export default class FlatListExpamle extends Component {
  state = {
    text: '',
    allContacts: [],
    contacts: [],
    loading: true
  }

  componentDidMount() {
    this.getContacts()
  }

  getContacts = async () => {
    const {data : {results: contacts}} = await axios.get('https://randomuser.me/api?results=100');
    this.setState({
      contacts,
      allContacts: contacts,
      loading: false
    })
  }

  renderFooter = () => {
    if(!this.state.loading) return null;
    return(
      <View>
         <ActivityIndicator size="large"/>
      </View>
    )
  }

  renderContact = ({item, index}) => {
    return(
      <TouchableOpacity style={[styles.renderContainer, {backgroundColor: index % 2 === 1 ? '#ebebeb' : ''}]}>
        <Image 
          style={styles.renderImage} 
          source={{uri: item.picture.large}}
        />
        <View style={styles.renderTextContainer} >
          <Text style={styles.renderName}>{item.name.first} {item.name.last}</Text>
          <Text>{item.location.state}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  renderHeader = () => {
    const {text} = this.state;
    return(
      <View style={styles.renderSearchContainer} >
        <TextInput
          onChangeText={text => {
            this.setState({
              text,
            });

            this.searchFilter(text);
          }}
          value={text}
          placeholder="Search..." 
          style={styles.renderSeacrh}
        />
      </View>
    )
  }

  searchFilter = text => {
    const newData = this.state.allContacts.filter(item => {
      const listItem = 
      `${item.name.first.toLowerCase()} 
      ${item.name.last.toLowerCase()} 
      ${item.location.state.toLowerCase()}`;
      return listItem.indexOf(text.toLowerCase()) > -1;
    });
    this.setState({
      contacts: newData,
    })
  };

  render() {
    return (
        <FlatList
          ListFooterComponent={this.renderFooter}
          data={this.state.contacts}
          renderItem={this.renderContact}
          keyExtractor={item => item.login.uuid}
          ListHeaderComponent={this.renderHeader}
        />
    )
  }
}

const styles = StyleSheet.create({
  renderContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  renderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10
  },
  renderTextContainer: {
    justifyContent: 'space-around'
  },
  renderSearchContainer: {
    padding: 10,
  },
  renderSeacrh: {
    fontSize: 16,
    backgroundColor: '#ebebeb',
    padding: 10,
    borderRadius: 10
  }
});