import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import Login from '../components/Login';
import { logout } from '../services/authService';
import Button from '@mui/material/Button';
import { navigate } from 'gatsby';
import Operation from '../components/calculator/Operation';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function handleSignOut() {
    logout();
    navigate("/");
}

export default function Calculator() {

  const [state, setState] = useState({result : 0, credit: 0});

  const [value, setValue] = useState(0);


  const onResult = (r) => {
    setState((prevState) => ({
      ...prevState,
      result: r.result,
      credit : r.credit
    }));

  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>


      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        </Tabs>

        <CustomTabPanel value={value} index={0}>
        <Operation opName="Addition" opSymbol="+" opActionName="Add" onResult={onResult} parentState={state}></Operation>
            <Operation opName="Subtraction" opSymbol="-" opActionName="Substract" onResult={onResult} parentState={state}></Operation>
            <Operation opName="Multiplication" opSymbol="+*" opActionName="Multiply" onResult={onResult} parentState={state}></Operation>
            <Operation opName="Division" opSymbol="/" opActionName="Divide" onResult={onResult} parentState={state}></Operation>
            <Operation opName="Square root" opSymbol="sqr" opActionName="Operate" onResult={onResult} parentState={state}></Operation>
            <Operation opName="Random String" opSymbol="" opActionName="Execute" onResult={onResult} parentState={state}></Operation>
            The Calculator result {state.result}
            The credit {state.credit}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>





        <Button variant="outlined" onClick={() => {
              handleSignOut();
            }}>Sign Out
          </Button>

      </Box>
    </Container>
  );
}
