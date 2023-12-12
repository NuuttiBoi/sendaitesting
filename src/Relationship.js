import React from "react";
import {grey} from "./colors";
const kuva = require('./img/circle.png');
const triangle = require('./img/triangle.png');


export default function Relationship({value, backgroundColor}) {
    return (
        <span
            style={{
                boxSizing: "border-box",
                height: 40,
                backgroundColor: backgroundColor,
                fontWeight: 400,
                padding: "2px 6px",
                borderRadius: 4,
                textTransform: "capitalize",
                display: "inline-block"
            }}>
            {<img src={value} height={60} width={35}/>}
    </span>
    );
}
