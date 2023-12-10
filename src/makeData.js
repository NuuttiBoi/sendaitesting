import { faker } from '@faker-js/faker';
import {randomColor} from "./utils";
import {useEffect, useState} from "react";
import axios from 'axios';
import work_types_service from "./services/work_types_service";

export default function MakeData(count) {
    // let data = [];

    let options = [];

    const [data, setData] = useState([]);

    const [work3Name, setWork3Name] = useState(null);
    const [work1Name, setWork1Name] = useState(null);
    const [work2Name, setWork2Name] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/work_types")
            .then(response => setData(response.data))
            .catch(error => console.error(error));
        }
    )

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

        /*
        for (let i = 0; i < count; i++) {
        let row = {
            ID: i,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
        };
        // options.push({label: row.music, backgroundColor: randomColor()});

        // data.push(row);
    }

         */

    let [row, setRow] = useState('');

    const columns = data.map((item, k) => {
        return (
            <tr key={item.id}>
                <td>{item.work1_name}</td>
                <td>{item.work2_name}</td>
                <td>{item.work3_name}</td>
            </tr>
        );
    });


    let rowsS = data.map((_,index) => {
        let columnValues = data.map(i => data[index][i])
        return columnValues
    })

    let rows = [
        {
            id: "_id",
            label: "work1_name",
            accessor: "work1_name",
            minWidth: 100,
            dataType: "text",
            options: []
        },
        {
            id: "lastName",
            label: "work2_name",
            accessor: "work2_name",
            minWidth: 100,
            dataType: "text",
            options: []
        },
        {
            id: "age",
            label: "work3_name",
            accessor: "work3_name",
            width: 80,
            dataType: "text",
            options: []
        },
        {
            id: 999999,
            width: 20,
            label: "+",
            disableResizing: true,
            dataType: "null"
        }
    ];
    return {columns: rows, data: columns, skipReset: false};
}
