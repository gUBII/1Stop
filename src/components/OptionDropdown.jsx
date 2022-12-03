import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

const OptionDropdown = ({optionsArray, optionProp}) => {
    const [option, setOption] = optionProp
    
  return (
    <Dropdown>
    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
    {option}
    </Dropdown.Toggle>

    <Dropdown.Menu>
        {optionsArray.map(option => <Dropdown.Item onClick={()=> setOption(option)}>{option}</Dropdown.Item>)}
    </Dropdown.Menu>
  </Dropdown>
  )
}

export default OptionDropdown