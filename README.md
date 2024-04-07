# React Dropdown
<p>The dropdown select list is frequently utilized across different projects. While we can easily implement a dropdown menu feature using select tag, it may not offer the best user experience. The summer-ui-react-dropdown, on the other hand, enhances usability by providing support for multiple select features and incorporating a search bar, allowing users to filter the list before making a selection. This modal component is customizable, enabling the creation of personalized placeholder messages and font styling to suit individual preferences.</p>

## Installation

npm i summer-ui-react-dropdown

## Demo

https://k18382003.github.io/react-dropdown-demo/

## Props
| Props Name    | Description   | Data Type      | Required    |
| ------------- | ------------- | -------------  | ------------- |
| multipleSelect  | Multiple select | boolean  | NO  |
| options  | The select options must be [{displayName:'name', value:'value'}] format  | object array  | YES  |
| textbarPlaceHolder  | The placeholder text for the select input | string  | NO  |
| textbarStyle  | Adding a class name to style select input | string  | NO  |
| searchbarStyle  | Adding a class name to style search bar | string  | NO  |
| styleDropDownMenu  | Adding a class name to style dropdown menu | string  | NO  |
| selectedValues  | Selected values variable | stateful value  | YES  |
| setSelectedValues  | Adding a class name to style dropdown menu | SetState function  | YES  |

## Example
```jsx
// App.js
import ReactDropdown from 'summer-ui-react-dropdown';
import { useState } from 'react';
import './App.css';
import './react-dropdown.css';

const App = () => {
  const options = [
    { displayName: 'Apple', value: 1 },
    { displayName: 'Orange', value: 2 },
    { displayName: 'Banana', value: 3 },
  ];
  const [selectedValues, setSelectedValues] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any action with the selected data, such as sending it to a server
    console.log({ ...selectedValues });

    // Clearing the form after submission
    setSelectedValues('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <CustomDropDown
        options={options} //The select options must be [{displayName:'name', value:'value'}] format
        multipleSelect={true} //A multiple choices list
        selectedValues={selectedValues} //Selected values
        setSelectedValues={setSelectedValues} //A UseState to set selectedValues variable
        textbarPlaceHolder={'Favorite fruits'} //The placeholder text for the select input
        textbarStyle={'mytextBar'} //Adding a class name to style select input
        searchbarStyle={'mysearchBar'} //Adding a class name to style search bar
        styleDropDownMenu={'mydropDown'} //Adding a class name to style dropdown menu
      />
      <button>Submit</button>
    </form>
  );
};

export default App;
```

```css
// react-modal.css
.mytextBar {
  font-size: 1.5rem;
  border: 1px solid blue;
}

.mysearchBar{
  font-size: 1.5rem
}

.mydropDown li:hover{
  background-color: red;
}
```
