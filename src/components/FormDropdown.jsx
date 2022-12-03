import React from 'react'
import {Button, Form, InputGroup, Dropdown } from 'react-bootstrap';
import {FaPlus} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'

const FormDropdown = ({optionProp}) => {
    const [options, setOptions] = optionProp

    const handleOptionTitleChange =(option, newTerm)=>{
        const newArray = [...options]
        let index = options.findIndex(opt => opt.optionTitle === option.optionTitle)
        newArray[index]={...option, optionTitle : newTerm}
        setOptions(newArray)
      }
  
      const handleOptionValuesChange =(option, optionValue, newTerm)=>{
        const newArray = [...options]
        let newOptions = [...option.optionValues]
        newOptions.splice(option.optionValues.indexOf(optionValue), 1, newTerm);
        let index = options.findIndex(opt => opt.optionTitle === option.optionTitle)
        newArray[index]={...option, optionValues : newOptions}
        setOptions(newArray)
      }
  
      const addNewOptionValue = (option)=>{
        const newArray = [...options]
        let index = options.findIndex(opt => opt.optionTitle === option.optionTitle)
        newArray[index]={...option, optionValues : [...option.optionValues, '']}
        setOptions(newArray)
      }
  
      const deleteOptionValue = (option, optionValue)=>{
        const newArray = [...options]
        let newOptions = option.optionValues.filter(val => val !== optionValue)
        let index = options.findIndex(opt => opt.optionTitle === option.optionTitle)
        newArray[index]={...option, optionValues : newOptions}
        setOptions(newArray)
      }
  
      const deleteOption = (option)=>{
        const newArray = options.filter(opt => opt.optionTitle !== option.optionTitle)
        setOptions(newArray)
      }
      
      const dropdown = options?.map((option, index) => {
        return(
        <div key = {index}>
    <InputGroup className="mt-3">
      <Form.Control className="w-50"
                value={option.optionTitle}
                onChange={e=> handleOptionTitleChange(option, e.target.value)}
                />
      <Button 
        variant="danger"
        onClick = {() => deleteOption(option)}>
          <AiOutlineClose/>
      </Button>
    </InputGroup>
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {option.optionValues[0]}
      </Dropdown.Toggle>
  
      <Dropdown.Menu>
          {option.optionValues?.map((optionValue, index) => {
            return(
              <InputGroup key = {index} className="mb-3" >
                <Form.Control 
                autoFocus
                key = {index}
                value={optionValue}
                onChange={e=> handleOptionValuesChange(option, optionValue, e.target.value)}
              />
              <Button 
                variant="danger" 
                onClick = {() => deleteOptionValue(option, optionValue)}>
                <AiOutlineClose/>
              </Button>
            </InputGroup>
            )
          })}
          <Button onClick = {()=> addNewOptionValue(option)}>
            Add Option<FaPlus/>
          </Button>
      </Dropdown.Menu>
  </Dropdown>
</div>
)})
      
    return (
        <>
         {dropdown}
        </>
    )
}
export default FormDropdown