import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';

function App() {
  const [currentTab, setCurrentTab] = useState('1');

  const handleChange = (event, newTab) => {
    setCurrentTab(newTab);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="main tabs">
              <Tab label="Customers" value="1" />
              <Tab label="Trainings" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <CustomerList />
          </TabPanel>
          <TabPanel value="2">
            <TrainingList />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default App;