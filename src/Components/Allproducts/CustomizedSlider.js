
import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#4F3100',
  height: 3,
  padding: '13px 0',
  marginLeft: 10,
  marginRight: 10,

  '& .MuiSlider-thumb': {
    height: 18,
    width: 18,
    backgroundColor: '#4F3100',
    border: '1px solid currentColor',
    borderRadius: 0,
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: '#AD7A29',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 1,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

const CustomizedSlider = ({ value, onChange, min, max }) => {
  return (
    <Box sx={{ width: '90%' }}>
      <AirbnbSlider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        slots={{ thumb: AirbnbThumbComponent }}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
      />
    </Box>
  );
};

CustomizedSlider.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default CustomizedSlider;
