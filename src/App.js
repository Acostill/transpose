import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SelectKey from './components/SelectKey';
import log from './log';
const pitches  = ['Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#','Eb', 'E', 'F', 'F#','Gb', 'G', 'G#'];

const notes = [

  {Id:  3, natural:  'C', sharp: 'B#', flat: null},
  {Id:  4, natural: null, sharp: 'C#', flat: 'Db'},    
  {Id:  5, natural:  'D', sharp: null, flat: null},
  {Id:  6, natural: null, sharp: 'D#', flat: 'Eb'},    
  {Id:  7, natural:  'E', sharp: null, flat: 'Fb'},
  {Id:  8, natural:  'F', sharp: 'E#', flat: null},
  {Id:  9, natural: null, sharp: 'F#', flat: 'Gb'},    
  {Id: 10, natural:  'G', sharp: null, flat: null},
  {Id: 11, natural: null, sharp: 'G#', flat: 'Ab'},
  {Id:  0, natural:  'A', sharp: null, flat: null},
  {Id:  1, natural: null, sharp: 'A#', flat: 'Bb'},
  {Id:  2, natural:  'B', sharp: null, flat: 'Cb'}, 
] 

const romanNums = ['I', 'bII', 'II', 'bIII', 'III', 'IV', 'bV', 'V', 'a', 'VI', 'bVII', 'VII'];

const scales = {
  ionian: [0, -1, 0, -1, 0, 0, -1, 0, -1, 0, -1, 0]
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      chords   : [],
      degrees  : '',
      numerals : [],
      originalKey : 'A',
      newKey   : '',
    }
  }

  getNote = (str) => {
    let result = null;
    for (let i = 0; i < notes.length; i++) {
        let obj = notes[i]
        for (let key in obj) {
            if (obj[key] === str) {
                result = obj;
            }
        }
    }
    return result;
  }

  handleTextArea = (e) => {
    // let chords = e.target.value.split(' ').filter(el => el !== '');
    let inputArr = document.querySelector('#input').value.split(' ').filter(el => el !== ''  && el !== '\n');
    let chords = [];
    inputArr.forEach(str => {
      chords.push(this.getNote(str));
    })
    let indexes = chords.map(chord => {
      return (
        (notes.indexOf(chord)
        + notes.length
        - notes.indexOf(this.state.originalKey))
        % 12
      )
    });
    let numerals = indexes.map(position => {
      return romanNums[position % 12];
    });
    this.setState({
      chords,
      indexes,
      numerals
    });
  }

  handleOriginalKey = (e) => {
    let originalKey = e.target.value;
    let input = document.querySelector('#input').value.split(' ').filter(el => el !== '');
    let chords = [];
    input.forEach(el => {
      chords.push(this.getNote(el));
    })
    console.log('handleOK Chords', chords)
    let indexes = chords.map(chord => {
      return (
        (notes.indexOf(chord)
        + notes.length
        - notes.indexOf(this.state.originalKey))
        % 12
      )
    });
    let numerals = indexes.map(position => {
      return romanNums[position % 12];
    })
    this.setState({
      originalKey,
      chords,
      indexes,
      numerals
    })
  }

  handleNewKey = (e) => {
    let newKey = e.target.value;
    this.setState({
      newKey
    })
  }

  render() {
    let { originalKey, newKey, chords } = this.state;
    let { handleOriginalKey, handleNewKey } = this;
    let offset = notes.indexOf(this.getNote(newKey))
    
    let indexes = chords.map(chord => {
      return (
        (notes.indexOf(chord)
        + notes.length
        - notes.indexOf(this.getNote(originalKey)))
        % 12
      )
    })
    let numerals = indexes.map(position => {
      return romanNums[position % 12];
    })
    let transposed = newKey ? indexes.map(position => {
      let note = notes[(position + offset) % 12].natural;
      let spell;
      switch(newKey) {
        case 'A#':
        case 'B':
        case 'C#':
        case 'D#':        
        case 'F#':        
        case 'G#':               
          spell = 'sharp';
          break;
        default: 
          spell = 'flat';
      }
      if (!note) {
        note = notes[(position + offset) % 12][spell]
      }
      return note;
    }) : [];

    log({originalKey, newKey, chords, offset, indexes, numerals});
    console.log(this.state);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br/> 
        {'Original Key '}
        <SelectKey value={originalKey}
          originalKey={originalKey} 
          callback={handleOriginalKey}
        />
        <br/><br/>
        <textarea id='input' onChange={this.handleTextArea}/>
        <br/> <br/>
        {'New Key '} 
        <SelectKey callback={handleNewKey} />
        <p>Numerals: {numerals.join(' ')}</p>
        <p>Transposed: {transposed.join(' ')}</p>
      </div>
    );
  }
}

export default App;
