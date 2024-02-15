import React from "react";
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
            {<img src={value} height={80} width={70} alt='kuva'/>}
    </span>
    );
}
