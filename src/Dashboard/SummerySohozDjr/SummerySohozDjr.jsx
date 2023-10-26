import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

// Your custom tab content components
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node, // Add prop validation for children
    value: PropTypes.number, // Add prop validation for value
    index: PropTypes.number.isRequired,
};

export default function SummerySohozDjr() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
            <div>
            <p className='text-md text-gray-300 font-poppins pl-4 py-4 '>Dashboard Summery</p>
            </div>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab label="summery" />
                <Tab label="Users" />
                <Tab label="Dillers" />
                <Tab label="Riders" />
                <Tab label="Employee" />
                <Tab label="Item Six" />
                <Tab label="Item Seven" />
            </Tabs>

            {/* Tab content */}
            <TabPanel value={value} index={0}>
                Content for Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Content for Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Content for Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Content for Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Content for Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Content for Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Content for Item Seven
            </TabPanel>
        </Box>
    );
}
