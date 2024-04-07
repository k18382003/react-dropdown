import React, { useEffect, useRef, useState } from 'react';
import './CustomDropDown.css';

interface objOption {
  displayName: string,
  value: any
}

interface Props {
  /** 
   * A multiple choices list
   */
  multipleSelect?: boolean | undefined
  /**
   * The select options must be [{displayName:'name', value:'value'}] format
   */
  options: any[]
  /**
   * The placeholder text for the select input 
   */
  textbarPlaceHolder?: string
  /**
   * Adding a class name to style select input 
   */
  textbarStyle?: string
  /**
   * Adding a class name to style search bar
   */
  searchbarStyle?: string
  /**
   * Adding a class name to style dropdown menu
   */
  styleDropDownMenu?: string
  /** 
   * Selected values variable (stateful value)
   */
  selectedValues: any
  /** 
   * A UseState function to update selectedValues variable
   */
  setSelectedValues: React.Dispatch<React.SetStateAction<any>>
}



const CustomDropDown = ({
  multipleSelect,
  options,
  textbarPlaceHolder,
  textbarStyle,
  searchbarStyle,
  styleDropDownMenu,
  selectedValues,
  setSelectedValues,
}: Props) => {

  if (!options || options == undefined) {
    console.error("You are missing options props, and it must be [{displayName:'name', value:'value'}] format")
    return;
  }

  if (!selectedValues) {
    console.error("You are missing selectedValues props, a selected values variable (stateful value)")
    return;
  }

  if (!setSelectedValues) {
    console.error("You are missing setSelectedValues props, a UseState function to update selectedValues variable")
    return;
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [displayName, setDisplayName] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
        setFilteredOptions(options);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (option: objOption) => {
    if (
      selectedValues.some(
        (_option: { displayName: string; value: any; }) =>
          _option.displayName === option.displayName &&
          _option.value === option.value
      )
    ) {
      setSelectedValues(
        selectedValues.filter(
          (item: { displayName: string; value: any; }) =>
            item.displayName !== option.displayName &&
            item.value !== option.value
        )
      );
      setDisplayName(
        selectedValues.filter((item: { displayName: string; value: any; }) => item !== option).displayName || []
      );
    } else {
      setSelectedValues([...selectedValues, option]);
      setDisplayName([...displayName, option.displayName]);
    }
  };

  const handleInputChange = (event: any) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = options.filter((option) =>
      option.displayName?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const toggleDropdown = () => {
    setIsOpen(false);
  };

  const handleOptionClick = (option: objOption) => {
    setSelectedValues(option);
    toggleDropdown();
  };

  return (
    <>
      {multipleSelect ? (
        <div className="dropdown" ref={dropdownRef}>
          <input
            type="text"
            placeholder={textbarPlaceHolder || 'Select...'}
            value={[...selectedValues]
              .map((item) => item?.displayName)
              .join(', ')}
            onFocus={() => setIsOpen(true)}
            className={textbarStyle}
            readOnly
          />
          {isOpen && (
            <ul className={`${styleDropDownMenu} options`}>
              <input
                className={`search-bar ${searchbarStyle}`}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
              />
              {filteredOptions.map((option, index) => (
                <li key={index} onClick={() => handleCheckboxChange(option)}>
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedValues.some(
                      (_option: { displayName: any; value: any; }) =>
                        _option.displayName === option.displayName &&
                        _option.value === option.value
                    )}
                    readOnly
                  />
                  <label htmlFor={option.displayName}>
                    {option.displayName}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="dropdown" ref={dropdownRef}>
          <input
            type="text"
            placeholder={textbarPlaceHolder || 'Select...'}
            value={selectedValues}
            onFocus={() => setIsOpen(true)}
            className={textbarStyle}
            readOnly
          />
          {isOpen && (
            <ul className="options">
              <input
                className={`search-bar ${searchbarStyle}`}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
              />
              {filteredOptions.map((option, index) => (
                <li key={index} onClick={() => handleOptionClick(option)}>
                  {option.displayName}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default CustomDropDown;
