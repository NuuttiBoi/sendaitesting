import { faker } from '@faker-js/faker';
import {randomColor} from "./utils";
import {useEffect, useState} from "react";
import axios from 'axios';
import work_types_service from "./services/work_types_service";
const kuva = require('./img/circle.png');
const triangle = require('./img/triangle.png');
const star = require('./img/star.png');
const davidStar = require('./img/davidStar.png');
const circle = require('./img/circle.png');
const cirlceTriangle = require('./img/circleTriangle.png');
const heart = require('./img/heart.png');
const spiral = require('./img/spiral.png');
const square = require('./img/square.png');
const cross = require('./img/cross.png');
const pentagon = require('./img/pentagon.png');

export default function MakeData(count) {
    // let data = [];

    console.log(kuva);

    let options = [];

    let kuvat = [];

    kuvat = [
        kuvat[0] = circle,
        kuvat[1] = star,
        kuvat[2] = davidStar,
        kuvat[3] = cirlceTriangle,
        kuvat[4] = cross,
        kuvat[5] = heart,
        kuvat[6] = pentagon,
        kuvat[7] = square,
        kuvat[8] = spiral,
        kuvat[9] = triangle
    ]

        for (let j = 0; j < kuvat.length; j++) {
            let roww = {
                music: kuvat[j]
            };
            options.push({label: roww.music});
        }


    const [data, setData] = useState([]);

    const [work3Name, setWork3Name] = useState(null);
    const [work1Name, setWork1Name] = useState(null);
    const [work2Name, setWork2Name] = useState(null);

    /*
    useEffect(() => {
        axios.get("http://localhost:3001/work_types")
            .then(response => setData(response.data))
            .catch(error => console.error(error));
        }
    )

     */

/*
    const backendItems = data.map((item,index) =>
        let row = {}
    {
        ID: index,
        firstName:item.work1_name,
        lastName: item.work2_name,
        email: item.work3_name
    })

 */


        for (let i = 0; i < count; i++) {
        let row = {
            ID: i,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
        };
        // options.push({label: row.music, backgroundColor: randomColor()});

         data.push(row);
    }



    let [row, setRow] = useState('');

    const rows = data.map((item, k) => {
        return (
            <tr key={item.id}>
                <td>{item.work1_name}</td>
                <td>{item.work2_name}</td>
                <td>{item.work3_name}</td>
            </tr>
        );
    });

/*
    let rows = data.map((_,index) => {
        let columnValues = data.map(i => data[index][i])
        return columnValues
    })

 */

    let columns = [
        {
            id: "_id",
            label: "work1_name",
            accessor: "work1_name",
            minWidth: 100,
            dataType: "select",
            options: options
        },
        {
            id: "lastName",
            label: "work2_name",
            accessor: "work2_name",
            minWidth: 100,
            dataType: "select",
            options: options
        },
        {
            id: "age",
            label: "work3_name",
            accessor: "work3_name",
            width: 80,
            dataType: "select",
            options: options,
            Footer: (
                <span>{
                    // Get the total of the price
                    <select></select>
                }</span>
            )
        },
        {
            id: 999999,
            width: 20,
            label: "+",
            disableResizing: true,
            dataType: "null"
        }
    ];
    return {columns: columns, data: rows, skipReset: false};
}
