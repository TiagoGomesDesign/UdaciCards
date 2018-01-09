import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Deck from './Deck'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { reciveDecks } from '../actions'

class DeckList extends Component{
  
  componentDidMount() {
    const { dispatch } = this.props
    getDecks().then(r => dispatch(reciveDecks(JSON.parse(r))))
  }
  
  _renderDeck = ({item}) => {
    
    const { decks } = this.props

    return(
      <Deck
        title={decks[item].title}
        cards={decks[item].questions.length}
        onPress={() => this.props.navigation.navigate('SingleDeck', { deckId: decks[item].title })}
      />
    )
  }
  render(){
    return(
      <FlatList 
        data={Object.keys(this.props.decks)}
        renderItem={ this._renderDeck }
        keyExtractor={ (item, index) => index}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
})

const mapToStateProps = (decks) => ({
  decks,
})

export default connect(mapToStateProps)(DeckList)

