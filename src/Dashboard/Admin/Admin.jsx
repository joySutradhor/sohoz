import * as React from 'react';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};



export default function Admin() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', }}>

            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                // centered = {true}
                className='fixed top-0 left-0 right-0 bg-gray-100'
            >

                {/* all tabs render here */}
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
                <Tab label="Item Four" />
                <Tab label="Item Five" />
                <Tab label="Item Six" />
                <Tab label="Item Seven" />
            </Tabs>
            {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}
            <div className='py-12'>
                {/* there is render all tab details */}
                <TabPanel value={value} index={0}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, amet officiis sit similique omnis officia distinctio maiores, voluptatibus, eveniet iste eaque excepturi esse debitis? Eaque reiciendis, Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, amet officiis sit similique omnis officia distinctio maiores, voluptatibus, eveniet iste eaque excepturi esse debitis? Eaque reiciendis, numquam optioLorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, amet officiis sit similique omnis officia distinctio maiores, voluptatibus, eveniet iste eaque excepturi esse debitis? Eaque reiciendis, numquam optioLorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, amet officiis sit similique omnis officia distinctio maiores, voluptatibus, eveniet iste eaque excepturi esse debitis? Eaque reiciendis, numquam optioLorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, amet officiis sit similique omnis officia distinctio maiores, voluptatibus, eveniet iste eaque excepturi esse debitis? Eaque reiciendis, numquam optioLorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, amet officiis sit similique omnis officia distinctio maiores, voluptatibus, eveniet iste eaque excepturi esse debitis? Eaque reiciendis, numquam optioLorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, amet officiis sit similique omnis officia distinctio maiores, voluptatibus, eveniet iste eaque excepturi esse debitis? Eaque reiciendis, numquam optioLorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, amet officiis sit similique omnis officia distinctio maiores, voluptatibus, eveniet iste eaque excepturi esse debitis? Eaque reiciendis, numquam optioLorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, amet officiis sit similique omnis officia distinctio maiores, voluptatibus, eveniet iste eaque excepturi esse debitis? Eaque reiciendis, numquam optioLorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, amet officiis sit similique omnis officia distinctio maiores, voluptatibus, eveniet iste eaque excepturi esse debitis? Eaque reiciendis, numquam optioLorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, amet officiis sit similique omnis officia distinctio maiores, voluptatibus, eveniet iste eaque excepturi esse debitis? Eaque reiciendis, numquam optioLorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, amet officiis sit similique omnis officia distinctio maiores, voluptatibus, eveniet iste eaque excepturi esse debitis? Eaque reiciendis, numquam optioLorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, amet officiis sit similique omnis officia distinctio maiores, voluptatibus, eveniet iste eaque excepturi esse debitis? Eaque reiciendis, numquam optionumquam optio
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, amet officiis sit similique omnis officia distinctio maiores, voluptatibus, eveniet iste eaque excepturi esse debitis? Eaque reiciendis, numquam optio

                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={4}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={5}>
                    Item Three
                </TabPanel>
            </div>
            {/* </SwipeableViews> */}
        </Box>
    );
}