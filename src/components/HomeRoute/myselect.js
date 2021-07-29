import React from 'react'
import Select from 'react-select'
import {BsSearch} from 'react-icons/bs'

class MySelect extends React.Component {
  render() {
    const {selected, onChange, options} = this.props
    return (
      <div className="search-box">
        <BsSearch className="search-icon" />
        <Select
          defaultValue="Enter a State"
          label="Single select"
          theme={theme => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: 'gray',
              primary: 'black',
            },
          })}
          classNamePrefix="select-component"
          value={selected}
          onChange={onChange}
          options={options}
          backgroundColor="#161625"
        />
      </div>
    )
  }
}

export default MySelect
