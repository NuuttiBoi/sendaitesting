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
        const pituus = parseInt(name);
        const uusiPituus = (pituus * 3.779527559); // Pixels to mm
        setPituus(uusiPituus);
        console.log(`Form submitted, ${uusiPituus}`);

    }

    const handleFontSubmit = (e) => {
        e.preventDefault();
        const size = parseInt(name);
        const uusiSize = (size * 3.779527559); // Pixels to mm
        setSize(uusiSize);
        console.log(`Form submitted, ${uusiSize}`);
    }

    const hideColumn = () => {
        console.log('piilotetaan kolumnit vitun neekeri');
        document.getElementById('headers').style.display='none';
    }

    // const [pituus, newPituus] = useState(100);
    const [name, setName] = useState('');

    const[pituus, setPituus] = useState(294) ;
    const[size, setSize] = useState(20) ;

    const [lkm, setLkm] = useState('');



    const[currentValue, setCurrentValue] = useState(147);

    function smallerRows() {
        setPituus(100);
    }

    const apprHeight = useState('');

    const handleHeightSubmit = (e) => {
        e.preventDefault();
        /*
        if(lkm <= 2){
            prompt('haista vittu');
            setPituus(294);
        }

         */
        setPituus(588/lkm);
    }


    return (
        <>
            <div {...getTableProps()} className={clsx("table", isTableResizing() && "noselect")}>
                <div>
                    {headerGroups.map((headerGroup) => (
                        <div {...headerGroup.getHeaderGroupProps()} className='tr' id='headers'>
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
                                    <div {...cell.getCellProps({style: {height: pituus},})} className='td'>
                                        {cell.render("Cell")}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>

            <form id="heightForm" onSubmit={handleSubmit}>
                Change The Height of Table Rows
                <input placeholder="mm" style={{padding: 10, margin: 5}} onChange={(e) => setName(e.target.value)}
                       value={name}></input>
                <button type='submit'>Click to submit</button>
            </form>

            {/* Doesn't work

            <form id="fontForm" onSubmit={handleFontSubmit}>
                Change The Font Size
                <input placeholder="mm" style={{padding: 10, margin: 5}} onChange={(e) => setName(e.target.value)}
                       value={name}></input>
                <button type='submit'>Click to submit</button>
            </form>
            */}

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

            {/* <button onClick={hideColumn}>Hide Column</button> */}

            <div>Tietoja mahdollisista korkeuksista
                <form onSubmit={handleHeightSubmit} id={"rowForm"}>Kuinka monta riviä haluat taulukkoon?
                    <input placeholder="lkm" style={{padding: 10, margin: 5}} onChange={(e) => setLkm(e.target.value)}
                           value={lkm}></input>
                    <button type='submit'>Click to submit</button>
                </form>
            </div>


        </>
    );
}
