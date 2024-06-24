
// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Slider, { SliderThumb } from '@mui/material/Slider';
// import { styled } from '@mui/material/styles';
// import Tooltip from '@mui/material/Tooltip';
// import Box from '@mui/material/Box';
// import storeMIni from './data';
// const textColor = storeMIni?.color?.productListColor.textColor || "#000";
// const borderColor = storeMIni?.color?.productListColor.borderColor || "#000";
// const sideBarBorder = storeMIni?.color?.productListColor.sideBarBorder || "#000";
// const backgroundColor = storeMIni?.color?.productListColor.backgroundColor || "#000";
// const cardBackground = storeMIni?.color?.productListColor.cardBackground || "#000";
// const priceColor = storeMIni?.color?.productListColor.priceColor || "#000";
// const buttonColor = storeMIni?.color?.productListColor.buttonBgColor || "#000";
// const buttonBorderColor = storeMIni?.color?.productListColor.buttonBorderColor || "#000";
// const buttonBgColorOnHover = storeMIni?.color?.productListColor.buttonBgColorOnHover || "#000";

// function ValueLabelComponent(props) {
//   const { children, value } = props;

//   return (
//     <Tooltip enterTouchDelay={0} placement="top" title={value}>
//       {children}
//     </Tooltip>
//   );
// }

// ValueLabelComponent.propTypes = {
//   children: PropTypes.element.isRequired,
//   value: PropTypes.number.isRequired,
// };

// const AirbnbSlider = styled(Slider)(({ theme }) => ({
//   color: textColor,
//   height: 3,
//   padding: '13px 0',
//   marginLeft: 10,
//   marginRight: 10,

//   '& .MuiSlider-thumb': {
//     height: 18,
//     width: 18,
//     backgroundColor: textColor,
//     border: '1px solid currentColor',
//     borderRadius: 0,
//     '& .airbnb-bar': {
//       height: 9,
//       width: 1,
//       backgroundColor: '#AD7A29',
//       marginLeft: 1,
//       marginRight: 1,
//     },
//   },
//   '& .MuiSlider-track': {
//     height: 3,
//   },
//   '& .MuiSlider-rail': {
//     color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
//     opacity: theme.palette.mode === 'dark' ? undefined : 1,
//     height: 1,
//   },
// }));

// function AirbnbThumbComponent(props) {
//   const { children, ...other } = props;
//   return (
//     <SliderThumb {...other}>
//       {children}
//       <span className="airbnb-bar" />
//       <span className="airbnb-bar" />
//     </SliderThumb>
//   );
// }

// AirbnbThumbComponent.propTypes = {
//   children: PropTypes.node,
// };

// const CustomizedSlider = ({ value, onChange, min, max }) => {
//   return (
//     <Box sx={{ width: '90%' }}>
//       <AirbnbSlider
//         value={value}
//         onChange={onChange}
//         min={min}
//         max={max}
//         slots={{ thumb: AirbnbThumbComponent }}
//         getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
//       />
//     </Box>
//   );
// };

// CustomizedSlider.propTypes = {
//   value: PropTypes.arrayOf(PropTypes.number).isRequired,
//   onChange: PropTypes.func.isRequired,
//   min: PropTypes.number.isRequired,
//   max: PropTypes.number.isRequired,
// };

// export default CustomizedSlider;
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

const AirbnbSlider = styled(Slider)(({ theme, sliderColor }) => ({
  color: sliderColor.textColor,
  height: 3,
  padding: '13px 0',
  marginLeft: 10,
  marginRight: 10,

  '& .MuiSlider-thumb': {
    height: 18,
    width: 18,
    backgroundColor: sliderColor.textColor,
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

const CustomizedSlider = ({ value, onChange, min, max, sliderColor }) => {
  return (
    <Box sx={{ width: '90%' }}>
      <AirbnbSlider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        slots={{ thumb: AirbnbThumbComponent }}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        sliderColor={sliderColor}
      />
    </Box>
  );
};

CustomizedSlider.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  sliderColor: PropTypes.object.isRequired,
};

export default CustomizedSlider;
