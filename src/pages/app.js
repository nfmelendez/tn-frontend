import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import Login from '../components/Login';
import { logout } from '../controller/authService';
import Button from '@mui/material/Button';
import { navigate } from 'gatsby';
import Operation from '../components/calculator/Operation';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Calculator from '../components/calculator/calculator';
import OperationExplorer from '../components/explorer/OperationExplorer';
import Layout from '../components/layout';

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

export default function AppTabs() {


  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout >

        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Calculator" {...a11yProps(0)} />
          <Tab label="Operation History" {...a11yProps(1)} />
        </Tabs>

        <CustomTabPanel value={value} index={0}>
          <Calculator />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <OperationExplorer />
        </CustomTabPanel>





        <Button variant="outlined" onClick={() => {
          handleSignOut();
        }}>Sign Out
        </Button>

    </Layout>
  );
}
