import ReactSlider from "react-slider";
import { useState } from "react";


const Slider = () => {
    const [currentValue, setCurrentValue] = useState(0);

    const handleChange = (e) => {
        setCurrentValue(e);
        console.log('haista vittu');
        document.getElementById("myFrame").width = e;
        document.getElementsByClassName("table").minWidth = e;

    }

    return (
        <ReactSlider
            defaultValue={0}
            value={currentValue}
            onChange={(value) => handleChange(value)}
            className="customSlider"
            trackClassName="customSlider-track"
            thumbClassName="customSlider-thumb"
            markClassName="customSlider-mark"
            min={500}
            max={1000}
        />
    );
};

export default Slider;