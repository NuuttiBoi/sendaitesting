import React, {useMemo, useRef, useState} from "react";
import clsx from "clsx";
import {useTable, useFlexLayout, useResizeColumns, useSortBy} from "react-table";
import Cell from "./Cell";
import Header from "./Header";
import PlusIcon from "./img/Plus";
import Trash from "./img/Trash";
import kuva from "./img/circle.png";
import Slider from "./Slider";
import slider from "./Slider";
import ReactSlider from "react-slider";
import TableSlider from "./TableSlider";

const defaultColumn = {
    minWidth: 50,
    width: 150,
    maxWidth: 400,
    Cell: Cell,
    Header: Header,
    sortType: "alphanumericFalsyLast"
};

/*
export default function Table({columns, data, dispatch: dataDispatch, skipReset}) {
    const sortTypes = useMemo(
        () => ({
            alphanumericFalsyLast(rowA, rowB, columnId, desc) {
                if (!rowA.values[columnId] && !rowB.values[columnId]) {
                    return 0;
                }

                if (!rowA.values[columnId]) {
                    return desc ? -1 : 1;
                }

                if (!rowB.values[columnId]) {
                    return desc ? 1 : -1;
                }

                return isNaN(rowA.values[columnId])
                    ? rowA.values[columnId].localeCompare(rowB.values[columnId])
                    : rowA.values[columnId] - rowB.values[columnId];
            }
        }),
        []
    );

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable(
        {
            columns,
            data,
            defaultColumn,
            dataDispatch,
            autoResetSortBy: !skipReset,
            autoResetFilters: !skipReset,
            autoResetRowState: !skipReset,
            sortTypes
        },
        useFlexLayout,
        useResizeColumns,
        useSortBy
    );


    function isTableResizing() {
        for (let headerGroup of headerGroups) {
            for (let column of headerGroup.headers) {
                if (column.isResizing) {
                    return true;
                }
            }
        }

        return false;
    }

    return (
        <>
            <div {...getTableProps()} className={clsx("table", isTableResizing() && "noselect")}>
                <div>
                    {headerGroups.map((headerGroup) => (
                        <div {...headerGroup.getHeaderGroupProps()} className='tr'>
                            {headerGroup.headers.map((column) => column.render("Header"))}
                        </div>
                    ))}
                </div>
                <div {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <div {...row.getRowProps()} className='tr'>
                                {row.cells.map((cell) => (
                                    <div {...cell.getCellProps()} className='td'>
                                        {cell.render("Cell")}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
 */


export default function Table({columns, data, dispatch: dataDispatch, skipReset}) {
    const sortTypes = useMemo(
        () => ({
            alphanumericFalsyLast(rowA, rowB, columnId, desc) {
                if (!rowA.values[columnId] && !rowB.values[columnId]) {
                    return 0;
                }

                if (!rowA.values[columnId]) {
                    return desc ? -1 : 1;
                }

                if (!rowB.values[columnId]) {
                    return desc ? 1 : -1;
                }

                return isNaN(rowA.values[columnId])
                    ? rowA.values[columnId].localeCompare(rowB.values[columnId])
                    : rowA.values[columnId] - rowB.values[columnId];
            }
        }),
        []
    );

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable(
        {
            columns,
            data,
            defaultColumn,
            dataDispatch,
            autoResetSortBy: !skipReset,
            autoResetFilters: !skipReset,
            autoResetRowState: !skipReset,
            sortTypes
        },
        useFlexLayout,
        useResizeColumns,
        useSortBy
    );


    function isTableResizing() {
        for (let headerGroup of headerGroups) {
            for (let column of headerGroup.headers) {
                if (column.isResizing) {
                    return true;
                }
            }
        }

        return false;
    }

    /*
    function addNewRow(){
        dataDispatch({type: "add_row", focus: false})
    }
     */

    const heightRef = useRef(200);

    const [rangeSliderValue, setRangeSliderValue] = useState(500);

    /*
    const handleChange = (e) => {
        setRangeSliderValue(e.target.value);
        setPituus(e.target.value);
        console.log(slider.get());
        console.log('moi');
    };
     */

    const handleChange = (e) => {
        setCurrentValue(e);
       setPituus(currentValue);
    }


    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(`Form submitted, ${name}`);

        setPituus(parseInt(name));
    }

    // const [pituus, newPituus] = useState(100);
    const [name, setName] = useState('');

    const[pituus, setPituus] = useState(500) ;

    const[currentValue, setCurrentValue] = useState(200);

    function smallerRows() {
        setPituus(100);
    }


    return (
        <>
            <div {...getTableProps()} className={clsx("table", isTableResizing() && "noselect")}>
                <div>
                    {headerGroups.map((headerGroup) => (
                        <div {...headerGroup.getHeaderGroupProps()} className='tr'>
                            {headerGroup.headers.map((column) => column.render("Header"))}
                        </div>
                    ))}
                </div>
                <div {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <div {...row.getRowProps()} className='tr'>
                                {row.cells.map((cell) => (
                                    <div {...cell.getCellProps({style: {height: pituus}})} className='td'>
                                        {cell.render("Cell")}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>

            <form  id="heightForm" onSubmit={handleSubmit}>
                Change The Height of Table Rows
                <input style={{padding:10, margin:10}} onChange = {(e) => setName(e.target.value)} value={name}></input>
                <button style={{display:"flex"}} className="button" type='submit'>Click to submit</button>
            </form>

            <div id="tableSlider" className='sliderContainer'>
                <ReactSlider
                    defaultValue={0}
                    value={currentValue}
                    onChange={(value) => handleChange(value)}
                    className="customSlider"
                    trackClassName="customSlider-track"
                    thumbClassName="customSlider-thumb"
                    markClassName="customSlider-mark"
                    min={0}
                    max={1000}
                >Change The Table Row Heights </ReactSlider>
            </div>

        </>
    );
}
