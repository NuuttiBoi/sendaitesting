import { faker } from '@faker-js/faker';
import {randomColor} from "./utils";
import {useEffect, useState} from "react";
import axios from 'axios';
import work_types_service from "./services/work_types_service";

const hearts = require('./symbols/hearts.png');
const spiral = require('./symbols/spiral.png');
const star = require('./symbols/star.png');
const arrow = require('./symbols/arrow.png');
const circle = require('./symbols/circle.png');
const flower = require('./symbols/flower.png');
const triangle = require('./symbols/triangle.png');
const club = require('./symbols/club.png');
const diamond = require('./symbols/diamond.png');
const hash = require('./symbols/hash.png');







export default function MakeData(count) {
    // let data = [];

    let options = [];

    let kuvat = [];

    kuvat = [
        kuvat[0] = circle,
        kuvat[1] = star,
        kuvat[2] = club,
        kuvat[3] = diamond,
        kuvat[4] = flower,
        kuvat[5] = hearts,
        kuvat[6] = hash,
        kuvat[7] = arrow,
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

        /*
    const rows = data.map((item, k) => {
        return (
            <tr key={item.id}>
                <td>{item.work1_name}</td>
                <td>{item.work2_name}</td>
                <td>{item.work3_name}</td>
            </tr>
        );
    });
         */

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
    let rows = [
        {
            id: Math.floor(Math.random()*20),
            name: '',
            age: ''
        }
        ];
    return {columns: columns, rows: rows, skipReset: false};
    // return {columns: columns, data: rows, skipReset: false};
}
