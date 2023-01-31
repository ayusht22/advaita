import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';

import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import NavBar from '../navbar'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const names = [
  'English',
  'Hindi',
  'Telugu',
  'Tamil',
  'Malyalam'
];

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

export default function AddressForm({FormData,setFormData}) {

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    
    
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
        setFormData({...FormData,"languages":event.target.value})
    };

      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          id: data.get('url'),
          name: data.get('languages'),
          vaccineById:data.get('valid'),
          format:data.get('format')
        });
      };


  return (
    <React.Fragment>
          <Box
      sx={{
      //  marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container
        direction="column"
        //alignItems="center"
        //justifyContent="center"
        //style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
              <TextField
                required
                id="url"
                label="URL"
                name="url"
                variant="standard"
                style={{minWidth:'50vh'}}
                
                onChange={(e)=>setFormData({...FormData,"url":e.target.value})}
                value={FormData["url"]}
              />
            </Grid>
            <Grid item xs={3}>
                <InputLabel id="demo-multiple-name-label" style={{paddingTop:"20px"}}>Select Language</InputLabel>
                <Select
                labelId="demo-multiple-name-label"
                id="languages"
                style={{minWidth:'50vh'}}
                multiple
                value={FormData["languages"]}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
                variant="standard"
                name="languages"
                
                >
                {names.map((name) => (
                    <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                    >
                    {name}
                    </MenuItem>
                ))}
                </Select>
                
            </Grid>
            
            <FormControlLabel control={<Checkbox />} label="Expert Validation" name="valid" style={{paddingTop:'20px'}}
            onChange={(e)=>setFormData({...FormData,"validation":e.target.checked})}
            checked={FormData["validation"]}
            />
         
          <FormLabel id="format" style={{marginTop:'20px'}}>Format</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="format"
              defaultValue="top"
              value={FormData['format']}
              onChange={(e)=>setFormData({...FormData,"format":e.target.value})}
            >
                <FormControlLabel
                    value="Netflix"
                    control={<Radio />}
                    label="Netflix"
                    
                  />
                  <FormControlLabel
                    value="xyz"
                    control={<Radio />}
                    label="xyz"
                  
                  />
                  <FormControlLabel
                    value="abc"
                    control={<Radio />}
                    label="abc"
                  
                  />
                  
                  <FormControlLabel value="end" control={<Radio />} label="End" />

          </RadioGroup>
          
          
        </Grid>
      </Box>
    </Box>
    </React.Fragment>
  );
}