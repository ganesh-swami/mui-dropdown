"use client"
import React, { useState, useRef, useEffect } from 'react'
import {
  Input,
  InputAdornment,
  ButtonBase,
  Menu,
  MenuItem,
  Chip,
  Icon,
  FormHelperText,
  Avatar,
  Typography,
  TextField
} from '@mui/material'

import { makeStyles } from '@mui/styles';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ClearIcon from '@mui/icons-material/Clear';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import classNames from 'classnames'

const useStyles = makeStyles((theme) => ({
  selectedItemsWrapper: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap'
  },
  selectedList: {
    listStyle: 'none',
    padding: '3px 0'
  },
  checkBox: {
    color: theme.palette.primary.main
  },
  chip: {
    marginRight: '0.5em'
  },
  Menupaper: {
    overflowY: 'hidden !important'
  },
  artwork: {
    width: '1em',
    height: '1em',
    marginLeft: '3px',
    marginRight: '5px'
  }
}))

export default function MuiDropdown() {

  const [open, setOpen] = useState(false)
  const [filteredValues, setFilteredValues] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [error,setError]=useState(false);


  const [selectedData, setSelectedData] = useState([]);
  const [data, setData] = useState([]);

  const inputRef = useRef()
  const wrapperRef = useRef()
  const classes = useStyles()
  const multiple= true;
  const errorText='this is error ....'
  const allItemValue='all';
  const allItemId ='all';
  const notFoundText='Not Found';
  const disabled=false;
  const simpleValue=true;

  const itemId="id",
        itemLabel="name",
        imageLabel="path",
        searchByValue="name",
        itemValue="id";

  const populateData = () => {
    const skillsData = [
      { id: 1, name: 'React Js' },
      { id: 2, name: 'Angular' },
      { id: 3, name: 'Node JS' }
    ];
    setData(skillsData);
    const SelectedSkills = [];
    setSelectedData(SelectedSkills);
  };

  useEffect(() => {
    populateData();
  }, []);



  useEffect(() => {
    if (data && data.length > 0 ) {
      data.unshift({ [allItemId]: allItemValue, [itemLabel]: 'All' })
    }
    const values =
      !multiple && selectedData.length > 1
        ? selectedData.filter((_, i) => i === 0)
        : selectedData.concat()
    setSelectedItems(values)
    setFilteredValues(data)
  }, [data])

  const handleClose = () => {
    setOpen(false)
    handleSearchKeyword('')
  }

  const onItemSelect = async (item) => {
    let selected = selectedItems
    let isAllSelected = false
    if (multiple) {
      if (item[allItemId] === allItemValue) {
        item = filteredValues.filter((v) => v[allItemId] !== allItemValue)
        isAllSelected = true
      }
      if (
        isAllSelected &&
        item.length ===
          selectedItems.filter((v) => v[allItemId] !== allItemValue).length
      ) {
        selected = []
      } else if (isItemSelected(item)) {
        selected = selected.filter((v) => v[itemId] !== item[itemId])
        populateDeletedValue(item)
      } else {
        selected = isAllSelected ? item : [...selectedItems, item]
      }
    } else {
      selected = [item]
    }
    setSelectedItems(selected)
    populateSelectedValues(selected)
    if (!multiple) {
      handleClose()
    }
  }

  const handleRemoveItem = (item) => {
    const filteredSelectedItems = selectedItems.filter(
      (v) => v[itemId] !== item[itemId]
    )
    setSelectedItems(filteredSelectedItems)
    populateSelectedValues(filteredSelectedItems)
    populateDeletedValue(item)
  }

  const removeAllSelectedItems = () => {
    setSelectedItems([])
    populateSelectedValues([])
  }

  const isItemSelected = (item) => {
    if (
      item[allItemId] === allItemValue &&
      selectedItems.length ===
        data.filter((v) => v[allItemId] !== allItemValue).length
    ) {
      return true
    }
    return selectedItems.filter((v) => v[itemId] === item[itemId]).length > 0
  }

  const populateSelectedValues = (values) => {
    let valuesToPopulate

    if (values && values.length === 0) {
      valuesToPopulate = simpleValue ? null : []
    } else {
      valuesToPopulate = simpleValue ? values.map((v) => v[itemValue]) : values
      valuesToPopulate = multiple ? valuesToPopulate : valuesToPopulate[0]
    }
    // onItemClick(valuesToPopulate)
  }

  const populateDeletedValue = (item) => {
    const deletedValue = simpleValue ? item[itemValue] : item
    // onDeleteItem(deletedValue)
  }

  const handleSearch = (keyword) => {
    keyword = keyword ? keyword.toLowerCase() : keyword
    let exactMatchFound=false;
    let filtredResult = data.filter((v) =>{
      if(v[searchByValue].toString().toLowerCase()===keyword){
        exactMatchFound=true;
      }
      return v[searchByValue].toString().toLowerCase().includes(keyword)
    }
    )
    if(!exactMatchFound && keyword && keyword.length>0){
      filtredResult.unshift({ [itemId]: keyword, [itemLabel]: keyword })
    }
    // const ignoreResult = data.filter((v) => v[allItemId] === allItemValue)
    // if (JSON.stringify(filtredResult) === JSON.stringify(ignoreResult)) {
    //   filtredResult = []
    // }
    setFilteredValues(filtredResult)
  }

  const handleSearchKeyword = (keyword) => {
    setSearchKeyword(keyword)
    handleSearch(keyword)
  }


 const searchSection = () =>(
    
      <div>
        <Input
          //fullWidth
          placeholder={"Search"}
          value={searchKeyword}
          onChange={(e) => {
            handleSearchKeyword(e.target.value)
          }}
          style={{
            minWidth: wrapperRef.current
              ? wrapperRef.current.getBoundingClientRect().width
              : undefined,
            paddingLeft: '13px'
          }}
          endAdornment={
            <InputAdornment>
              {searchKeyword && (
                <ButtonBase
                  centerRipple
                  tabIndex={-1}
                  onClick={() => {
                    setSearchKeyword('')
                    handleSearchKeyword('')
                  }}
                >
                  <ClearIcon style={{ fontSize: '1.2em' }} />
                </ButtonBase>
              )}
            </InputAdornment>
          }
        />
      </div>
 )
  const optionsSection = () => (
    <div
      style={{
        maxHeight: '300px',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      {filteredValues && filteredValues.length > 0 ? (
        filteredValues.map((v) => (
          <MenuItem
            key={v[itemId]}
            onClick={() => {
              onItemSelect(v)
            }}
            style={{
              minWidth: wrapperRef.current
                ? wrapperRef.current.getBoundingClientRect().width
                : undefined
            }}
          >
            {multiple && (
              <Icon style={{ marginRight: '3px' }}>
                {isItemSelected(v) ? (
                  <CheckBoxIcon
                    className={classNames(
                      classes.checkBox,
                      // customStyles.checkBox
                    )}
                  />
                ) : (
                  <CheckBoxOutlineBlankOutlinedIcon
                    className={classNames(
                      classes.checkBox,
                      // customStyles.checkBox
                    )}
                  />
                )}
              </Icon>
            )}
            <span>
              {v[itemLabel]}
            </span>
          </MenuItem>
        ))
      ) : (
        <MenuItem>{notFoundText}</MenuItem>
      )}
    </div>
  )

  const selectedOptionSetion = () => (
    <div
      className={classes.selectedItemsWrapper}
      onClick={(e) => {
        e.stopPropagation()
        !disabled && setOpen(true)
      }}
      style={{
        cursor: disabled ? '' : 'pointer',
        height: selectedItems && selectedItems.length > 0 ? 'auto' : '1.3rem'
      }}
    >
      {selectedItems &&
        selectedItems.length > 0 &&
        selectedItems.map((item) => (
          <li key={item[itemId]} className={classes.selectedList}>
            {multiple ? (
              <Chip
                // avatar={
                //   showImage ? <Avatar src={item[imageLabel]} /> : undefined
                // }
                className={classes.chip}
                label={item[itemLabel]}
                onDelete={() => {
                  handleRemoveItem(item)
                }}
              />
            ) : (
              <span>
                {/* {showImage && (
                  <img
                    className={classes.artwork}
                    src={item[imageLabel]}
                    alt='img'
                  />
                )} */}
                {item[itemLabel]}
              </span>
            )}
          </li>
        ))}
    </div>
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div ref={wrapperRef}>
        <Typography> MultiSelect Dropdown</Typography>

        <TextField id="outlined-basic" label="Outlined" variant="outlined" onClick={()=>setOpen(true)} />
        <Input
          error={error}
          inputComponent={selectedOptionSetion}
          // fullWidth={fullWidth}
          // disabled={disabled}
          readOnly
          // variant=''
          inputRef={inputRef}
          endAdornment={
            <InputAdornment disablePointerEvents={disabled}>
              {selectedItems && selectedItems.length > 0 && (
                <ButtonBase
                  centerRipple
                  tabIndex={-1}
                  onClick={() => {
                    removeAllSelectedItems()
                  }}
                >
                  <ClearIcon style={{ fontSize: '1.2em' }} />
                </ButtonBase>
              )}

              <ButtonBase
                centerRipple
                tabIndex={-1}
                onClick={() => {
                  setOpen(true)
                }}
              >
                <ArrowDropDownIcon />
              </ButtonBase>
            </InputAdornment>
          }
        />
        {error && errorText && (
          <FormHelperText className={'test'} error={error}>
            {errorText}
          </FormHelperText>
        )}
        {open && (
          <Menu
            id='simple-menu'
            anchorEl={wrapperRef.current}
            keepMounted
            open
            variant='menu'
            // PopoverClasses={{
            //   paper: classes.Menupaper
            // }}
            // style={{
            //   overflowY: 'hidden !important'
            // }}
            onClose={() => {
              handleClose()
            }}
          >
            <span>
              {searchSection()}
              {optionsSection()}
            </span>
          </Menu>
        )}
      </div>
    </main>
  )
}
