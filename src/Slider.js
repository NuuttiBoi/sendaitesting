import ReactSlider from "react-slider";
import { useState } from "react";


const Slider = () => {
    const [currentValue, setCurrentValue] = useState(0);

    const handleChange = () => {

    }

    return (
        <ReactSlider
            defaultValue={0}
            value={currentValue}
            onChange={(value) => setCurrentValue(value)}
            className="customSlider"
            trackClassName="customSlider-track"
            thumbClassName="customSlider-thumb"
            markClassName="customSlider-mark"
            marks={20}
            min={0}
            max={100}
        />
    );
};

export default Slider;