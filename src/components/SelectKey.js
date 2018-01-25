import React from 'react';
const SelectKey = ({originalKey, callback }) => {
    const pitches  = ['Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#','Eb', 'E', 'F', 'F#','Gb', 'G', 'G#'];
      
      return (
        <select onChange={callback}>
          <option ></option>
          {pitches.map(pitch => (
            <option value={pitch} key={pitch}> {pitch} </option>
          ))}
        </select>
      );
    }

export default SelectKey;