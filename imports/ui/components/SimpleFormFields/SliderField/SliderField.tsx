import React from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import {hasValue} from "/imports/libs/hasValue";
import {sliderFieldStyle} from "./SliderFieldStyle";

export default ({name,label,value,onChange,readOnly,error, ...otherProps}:IBaseSimpleFormComponent)=>{

  //const [scale, setScale] = React.useState(value);

  const handleChange = (event: React.BaseSyntheticEvent, valueS: Number) => {
    if(!readOnly){
      onChange({name,target:{name,value: valueS}},{name,value: valueS});
    }
  }

    return (
      <div key={name} style={error? sliderFieldStyle.containerSliderError:sliderFieldStyle.containerSlider}>
        <SimpleLabelView label={label}/>
        <div style={sliderFieldStyle.subContainerSlider}>
          {!hasValue(value) || value!="-" ?
            (
              <Slider
                id={`slider${name}`}
                value={value}
                step={10}
                min={otherProps.min}
                max={otherProps.max}
                disabled={readOnly}
                onChange={handleChange}
                valueLabelDisplay="on"
                marks
                style={sliderFieldStyle.slider}
              />
            ): null
          }
        </div>
      </div>
    )
}