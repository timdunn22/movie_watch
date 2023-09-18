import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField, Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';


export function SortingButton({ onChange, options }) {
    return (
        <ButtonBasicDropDown options={options} onChange={onChange} label={"Sort By"} default_value={'[]'}
            value_option={"value"} label_option={"label"} />
    )
}
export function RatingButton({ onChange, options }) {
    return (
        <ButtonBasicDropDown options={options} onChange={onChange} label={"Rating"} default_value={options[0]['value']}
            value_option={"value"} label_option={"value"} count={true} />
    )
}
export function PopularityButton({ onChange, options }) {

    return (
        <ButtonBasicDropDown options={options} onChange={onChange} label={"Popularity"} default_value={options[0]['value']}
            value_option={"value"} label_option={"value"} count={true} />
    )
}
export function ColorButton({ onChange, options }) {

    return (
        <ButtonBasicDropDown options={options} onChange={onChange} label={"Color"} default_value={options[0]['value']}
            value_option={"value"} label_option={"value"} count={true} />
    )
}
export function LanguageButton({ onChange, options }) {

    return (
        <ButtonBasicDropDown options={options} onChange={onChange} label={"Language"} default_value={options[0]['value']}
            value_option={"value"} label_option={"value"} count={true} />
    )
}
export function DubbingButton({ onChange, options }) {

    return (
        <ButtonBasicDropDown options={options} onChange={onChange} label={"Dubbing"} default_value={options[0]['value']}
            value_option={"value"} label_option={"value"} count={true} />
    )
}
export function MovieTypeButton({ onRemove, onSelect, options}) {

    return (
        <ManySelectFacet options={options} onRemove={onRemove} onSelect={onSelect} label={"Movie Type"} value_option={"value"} 
        label_option={"value"} count={true} field={'title_type'} />
    )
}
export function GenreButton({ onRemove, onSelect, options}) {

    return (
        <ManySelectFacet options={options} onRemove={onRemove} onSelect={onSelect} label={"Genres"} value_option={"value"} 
        label_option={"value"} count={true} field={'genres'} />
    )
}
export function YearButton({ onRemove, onSelect, options}) {

    return (
        <ManySelectFacet options={options} onRemove={onRemove} onSelect={onSelect} label={"Year"} value_option={"value"} 
        label_option={"value"} count={true} field={'start_year'} />
    )
}

export function ManySelectFacet({label, options, onRemove, onSelect, value_option, label_option, count, field}) {
    const getOptionParam = (option, key) => {
        if (key) {
            return option[key]
        }
        else {
            return option
        }
    }
    return (
        <FormControl variant='filled' sx={{backgroundColor: 'darkgreen', width: '100px'}}>

            <InputLabel sx={{ color: 'white', fontFamily: "Gill Sans", fontSize: '10px' }} >{label}</InputLabel>
            <Select
                label={label}
                sx={{ fontFamily: 'sans-serif', color: 'darkgreen', fontSize: '10px' }}
            >
                {options.map((option) => (
                    <MenuItem key={getOptionParam(option, value_option)}
                        value={getOptionParam(option, value_option)}
                        sx={{ color: 'green', fontFamily: 'sans-serif', fontSize: '10px' }}
                        >
                        <Checkbox 
                            sx={{ marginRight: '8px', height: '10px', width: '10px' }}
                            checked={option.selected}
                            onChange={() => (option.selected ? onRemove(option.value) : onSelect(option.value))}
                            value={getOptionParam(option, value_option)}
                        />
                        {getOptionParam(option, label_option)}
                        {count && 
                        <strong  style={{  marginLeft: '12px', color: 'darkgreen'}}>  {`  ${option['count']}`}</strong>
                        }
                    </MenuItem>
                ))}
            </Select>

        </FormControl>
    )
    
}

export function ButtonBasicDropDown({ options, onChange, label, default_value, value_option, label_option, count }) {
    const [perPageOption, setPerPageOption] = React.useState('')
    const changeData = (event) => {
        setPerPageOption(event.target.value)
        onChange(event.target.value)
    }
    const getValue = (value) => {
        if (value === '') {
            return default_value
        }
        else {
            return value
        }
    }
    const getOptionParam = (option, key) => {
        if (key) {
            return option[key]
        }
        else {
            return option
        }
    }

    return (
        <FormControl variant='filled' sx={{backgroundColor: 'purple', width: '100px' }}>

            <InputLabel sx={{ color: 'white', fontFamily: "Gill Sans" }} >{label}</InputLabel>
            <Select
                label={label}
                value={getValue(perPageOption)}
                sx={{ fontFamily: 'sans-serif', color: 'darkgreen', fontSize: '10px' }}
                defaultValue={default_value}
                onChange={changeData}
            >
                {options.map((option) => (
                    <MenuItem key={getOptionParam(option, value_option)} 
                    value={getOptionParam(option, value_option)} 
                    sx={{ color: 'green', fontFamily: 'sans-serif', fontSize: '10px' }}>
                        {getOptionParam(option, label_option)}
                        {count && 
                        <strong  style={{  marginLeft: '12px', color: 'darkgreen'}}>  {`  ${option['count']}`}</strong>
                        }
                        {/* {count && 
                        <strong  style={{  float: 'right', color: 'darkgreen'}}>  {`  ${option['count']}`}</strong>
                        } */}
                    </MenuItem>
                ))}
            </Select>

        </FormControl>
    )

}
export function ResultsPerPage({ options, onChange }) {
    return (
        <ButtonBasicDropDown options={options} onChange={onChange} label="Per Page" default_value={32} />
    )
}