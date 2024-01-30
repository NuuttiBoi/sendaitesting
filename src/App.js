 import React, {useEffect, useReducer, useState} from "react";
import Select from 'react-select';
 import ReactSlider from "react-slider";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import jsPDF from "jspdf";
import "./style.css";
import MakeData from "./makeData";
import Table from "./Table";
import { randomColor, shortId } from "./utils";
import { grey } from "./colors";
import Slider  from "./Slider";
import axios from "axios";
import Pdf from "./toPdf";
import {usePDF} from "react-to-pdf";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import Relationship from "./Relationship";
import { components } from 'react-select';
import SortableComponent from "./sortableList";
import {tab} from "@testing-library/user-event/dist/tab";
import nanoid from "nanoid";

import { rotatePlugin } from '@react-pdf-viewer/rotate';
import { Viewer } from '@react-pdf-viewer/core';
 import PDFViewer from "./pdfView";



const { SingleValue, Option } = components;

const options = {
   // default is `save`
   method: 'open',
   // default is Resolution.MEDIUM = 3, which should be enough, higher values
   // increases the image quality but also the size of the PDF, so be careful
   // using values higher than 10 when having multiple pages generated, it
   // might cause the page to crash or hang.
   resolution: Resolution.HIGH,
   page: {
     // margin is in MM, default is Margin.NONE = 0
     margin: Margin.SMALL,
     // default is 'A4'
     format: 'letter',
     rotate: '90',
     // default is 'portrait'
     orientation: 'landscape',
   },
   canvas: {
     // default is 'image/jpeg' for better size performance
     mimeType: 'image/png',
     qualityRatio: 1
   },
   // Customize any value passed to the jsPDF instance and html2canvas
   // function. You probably will not need this and things can break,
   // so use with caution.
   overrides: {
     // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
     pdf: {
       compress: true
     },
     // see https://html2canvas.hertzen.com/configuration for more options
     canvas: {
       useCORS: true
     }
   },
 };
const getTargetElement = () => document.getElementById('target-ref');


const hearts = require('./symbols/hearts.png');
const square = require('./symbols/square.png');
const cross = require('./symbols/cross.png');
const spiral = require('./symbols/spiral.png');
const star = require('./symbols/star.png');
const arrow = require('./symbols/arrow.png');
const circle = require('./symbols/circle.png');
const flower = require('./symbols/flower.png');
const triangle = require('./symbols/triangle.png');
const club = require('./symbols/club.png');
const diamond = require('./symbols/diamond.png');
const hash = require('./symbols/hash.png');


function reducer(state, action) {
  // Handles different cases for columns and cells
  switch (action.type) {
    case "add_option_to_column":
      const optionIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
      );
      return {
        ...state,
        skipReset: true,
        columns: [
          ...state.columns.slice(0, optionIndex),
          {
            ...state.columns[optionIndex],
            options: [
              ...state.columns[optionIndex].options,
              { label: action.option }
            ]
          },
          ...state.columns.slice(optionIndex + 1, state.columns.length)
        ]
      };
    case "add_row":
      console.log('uuden rivin lisays');
      const newWork = {
        work1_name: '',
        work2_name: '',
        work3_name: '',
        work4_name:''
      }
      console.log('moi');
      console.log(state.data);
      console.log(state.data);


      /*
      work_types_service.create(newWork)
          .then(response => {
            console.log("success", response.data)
          })
          .catch(error => {
            console.log(error)
          })
       */

      console.log('saving ', newWork)
/*
      data: state.data.map((row) => ({
        ...row,
        [action.columnId]: row[action.columnId] + ""
      }))
 */
      return {
        data:{

        }
      };
      case "update_column_type":
      const typeIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
      );
      switch (action.dataType) {
        case "number":
          if (state.columns[typeIndex].dataType === "number") {
            return state;
          } else {
            return {
              ...state,
              columns: [
                ...state.columns.slice(0, typeIndex),
                { ...state.columns[typeIndex], dataType: action.dataType },
                ...state.columns.slice(typeIndex + 1, state.columns.length)
              ],
              data: state.data.map((row) => ({
                ...row,
                [action.columnId]: isNaN(row[action.columnId])
                    ? ""
                    : Number.parseInt(row[action.columnId])
              }))
            };
          }
        case "select":
          if (state.columns[typeIndex].dataType === "select") {
            return {
              ...state,
              columns: [
                ...state.columns.slice(0, typeIndex),
                { ...state.columns[typeIndex], dataType: action.dataType },
                ...state.columns.slice(typeIndex + 1, state.columns.length)
              ],
              skipReset: true
            };
          } else {
            const options = [
              {
                value: 0,
                label: hearts,
                image: hearts,
              },
              {
                value: 1,
                image: square,
                label: square,
              },
              {
                value: 2,
                image: circle,
                label: circle,
              },
              {
                value: 3,
                image: star,
                label: star,
              },
              {
                value: 4,
                image: flower,
                label: flower,
              },
              {
                value: 5,
                image: arrow,
                label: arrow,
              },
              {
                value: 6,
                image: club,
                label: club,
              },
              {
                value: 7,
                label: cross,
                image: cross,
              },
              {
                value: 8,
                image: triangle,
                label: triangle,
              },
              {
                value: 9,
                image: hash,
                label: hash,
              }
            ];
            state.data?.forEach((row) => {
              if (row[action.columnId]) {
                options.push({
                  label: row[action.columnId],
                  backgroundColor: randomColor()
                });
              }
            });
            return {
              ...state,
              columns: [
                ...state.columns.slice(0, typeIndex),
                {
                  ...state.columns[typeIndex],
                  dataType: action.dataType,
                  options: [...state.columns[typeIndex].options, ...options]
                },
                ...state.columns.slice(typeIndex + 1, state.columns.length)
              ],
              skipReset: true
            };
          }
        case "text":
          if (state.columns[typeIndex].dataType === "text") {
            return state;
          } else if (state.columns[typeIndex].dataType === "select") {
            return {
              ...state,
              skipReset: true,
              columns: [
                ...state.columns.slice(0, typeIndex),
                { ...state.columns[typeIndex], dataType: action.dataType },
                ...state.columns.slice(typeIndex + 1, state.columns.length)
              ]
            };
          } else {
            return {
              ...state,
              skipReset: true,
              columns: [
                ...state.columns.slice(0, typeIndex),
                { ...state.columns[typeIndex], dataType: action.dataType },
                ...state.columns.slice(typeIndex + 1, state.columns.length)
              ],
              data: state.data.map((row) => ({
                ...row,
                [action.columnId]: row[action.columnId] + ""
              }))
            };
          }
        default:
          return state;
      }
    case "update_column_header":
      const index = state.columns.findIndex(
          (column) => column.id === action.columnId
      );
      return {
        ...state,
        skipReset: true,
        columns: [
          ...state.columns.slice(0, index),
          { ...state.columns[index], label: action.label },
          ...state.columns.slice(index + 1, state.columns.length)
        ]
      };
    case "update_cell":
      return {
        ...state,
        skipReset: true,
        data: state.data?.map((row, index) => {
          if (index === action.rowIndex) {
            return {
              ...state.data[action.rowIndex],
              [action.columnId]: action.value
            };
          }
          return row;
        })
      };
    case "add_column_to_left":
      const leftIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
      );
      let leftId = shortId();
      return {
        ...state,
        skipReset: true,
        columns: [
          ...state.columns.slice(0, leftIndex),
          {
            id: leftId,
            label: "Column",
            accessor: leftId,
            dataType: "select",
            created: action.focus && true,
            options: [{
              value: 0,
              label: hearts,
              image: hearts,
            },
              {
                value: 1,
                image: square,
                label: square,
              },
              {
                value: 2,
                image: circle,
                label: circle,
              },
              {
                value: 3,
                image: star,
                label: star,
              },
              {
                value: 4,
                image: flower,
                label: flower,
              },
              {
                value: 5,
                image: arrow,
                label: arrow,
              },
              {
                value: 6,
                image: club,
                label: club,
              },
              {
                value: 7,
                label: cross,
                image: cross,
              },
              {
                value: 8,
                image: triangle,
                label: triangle,
              },
              {
                value: 9,
                image: hash,
                label: hash,
              }]
          },
          ...state.columns.slice(leftIndex, state.columns.length)
        ]
      };
    case "add_column_to_right":
      const rightIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
      );
      const rightId = shortId();
      return {
        ...state,
        skipReset: true,
        columns: [
          ...state.columns.slice(0, rightIndex + 1),
          {
            id: rightId,
            label: "Column",
            accessor: rightId,
            dataType: "select",
            created: action.focus && true,
            options: [{
              value: 0,
              label: hearts,
              image: hearts,
            },
              {
                value: 1,
                image: square,
                label: square,
              },
              {
                value: 2,
                image: circle,
                label: circle,
              },
              {
                value: 3,
                image: star,
                label: star,
              },
              {
                value: 4,
                image: flower,
                label: flower,
              },
              {
                value: 5,
                image: arrow,
                label: arrow,
              },
              {
                value: 6,
                image: club,
                label: club,
              },
              {
                value: 7,
                label: cross,
                image: cross,
              },
              {
                value: 8,
                image: triangle,
                label: triangle,
              },
              {
                value: 9,
                image: hash,
                label: hash,
              }]
          },
          ...state.columns.slice(rightIndex + 1, state.columns.length)
        ]
      };
    case "delete_column":
      const deleteIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
      );
      return {
        ...state,
        skipReset: true,
        columns: [
          ...state.columns.slice(0, deleteIndex),
          ...state.columns.slice(deleteIndex + 1, state.columns.length)
        ]
      };
    case "delete_row":
      const deleteRowIndex = state.rows.findIndex(
          (row) => row.id === action.rowId
      );
      return {
        ...state,
        skipReset: true,
        rows: [
          ...state.rows.slice(0, deleteRowIndex),
          ...state.rows.slice(deleteRowIndex + 1, state.rows.length)
        ]
      };
    case "enable_reset":
      return {
        ...state,
        skipReset: false
      };
    default:
      return state;
  }
}

function App() {

  const [data, setData] = useState(['']);

  const [skipPageReset, setSkipPageReset] = React.useState(false)

  
  const {toPDF, targetRef} = usePDF({filename: 'page.pdf'});

  // Maybe a database isn't necessary for this kind of simple application?
  /*
  useEffect(() => {
        axios.get("http://localhost:3001/work_types")
            .then(response => setData(response.data))
            .catch(error => console.error(error));
      }
  )

   */

  // Reducer sets the state
  const [state, dispatch] = useReducer(reducer, MakeData());

  const [tableData, setTableData] = React.useState([]);

  /*
  const tabledata = [
    {
      id: 1,
      name: '',
      age: '',
    },
    {
      id: 2,
      name: '',
      age: '',
    },
    {
      id: 3,
      name: '',
      age: '',
    }
  ]
  //setTableData(tabledata);

  React.useEffect(() => {
    setTableData(tabledata);
  }, []);

   */

  // Adds row to table
  const handleAdd = () => {
    const newData = {
      id: Math.floor(Math.random()*20),
      name: '',
      age: ''
    }
    // tableData.push(newData);
    setTableData([...tableData, newData]);
  };
  console.log(tableData.length);

  // Removes row from table
  const handleRemove = () => {
    console.log(tableData);
    console.log(tableData.length);
    const newVals = [];
    for(let i = 0; i < tableData.length-1; i++){
      newVals[i] = {
        id: Math.floor(Math.random()*20),
        name: '',
        age: '',
      }
    }
    console.log(newVals);
    // setTableData([newVals]);
    // const numero = tableData.length;
    /*
    if(tableData.length > 1 && tableData.length < 2){
      setTableData(tableData.filter((row) => row.id !== tableData.length-1));
    } else if(tableData.length >= 2){
      const newVals = [];
      for(let i = 0; i < tableData.length - 1; i++){
        newVals[i] = {
          id: Math.floor(Math.random()*20),
          name: '',
          age: '',
        }
      }
      console.log(newVals);
      setTableData([newVals]);
    } else {
      console.log('mit vittua');
      setTableData([]);
    }

     */
    // tableData.pop();
    //const newList = tableData.filter( li => li.id !== id);
    console.log(tableData);
    setTableData(newVals);
  }
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setTableData(old =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [columnId]: value,
            }
          }
          return row
        })
    )
  }

  const options = [
    {
      value: 0,
      image: hearts,
    },
    {
      value: 1,
      image: diamond,
    },
    {
      value: 2,
      image: circle,
    },
    {
      value: 3,
      image: star,
    },
    {
      value: 4,
      image: flower,
    },
    {
      value: 5,
      image: hearts,
    },
    {
      value: 6,
      image: club,
    },
    {
      value: 7,
      image: spiral,
    },
    {
      value: 8,
      image: triangle,
    },
    {
      value: 9,
      image: arrow,
    },
    {
      value: 10,
      image: hash,
    }
  ];


  const Options = {
    // default is `save`
    method: 'open',
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.LOW,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: 'letter',
      rotate: '90',
      // default is 'portrait'
      orientation: 'landscape',
    },
    canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: 'image/png',
      qualityRatio: 1
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
        useCORS: true
      }
    },
  };

  const IconSingleValue = (props) => (
      <SingleValue {...props}>
        <img src={props.data.image} style={{ height: '40px', width: '50px', borderRadius: '20%', marginRight: '10px' }}/>
        {props.data.label}
      </SingleValue>
  );
  const IconOption = (props) => (
      <Option {...props}>
        <img src={props.data.image} style={{ height: '30px', width: '50px', borderRadius: '50%', marginRight: '10px' }}/>
        {props.data.label}
      </Option>
  );

  // Style for the React select dropdown menu
  const colourStylesRow = {
    dropdownIndicator: styles => ({
      ...styles,
      color: '#FFAE12',
    })
  }

  // const [state, dispatch] = data;

  useEffect(() => {
    dispatch({ type: "enable_reset" });
  }, [state.columns, state.data]);


  const [rangeSliderValue, setRangeSliderValue] = useState(50);

  const handleRangeSliderChange = (e) => {
    setRangeSliderValue(e.target.value);
    const tableCs = document.getElementsByClassName('table-container');
    tableCs.styles={backgroundColor:':#000000'};
    console.log('haista vittu');
    console.log(e.target.value);
  };


  function rotate90() {
    /*
    document.querySelector('.table').style.transform
        = 'rotate(90deg)';
    document.querySelector('#tableId').style.transform
        = 'rotate(90deg)';
    document.querySelector('#firstSelect').style.transform
        = 'rotate(90deg)';
    document.querySelector('#secondSelect').style.transform
        = 'rotate(90deg)'
     */

    document.querySelector('.table').style.transform
        = 'rotate(90deg)';
    document.querySelector('#firstSelect').style.transform
        = 'rotate(90deg)';
    document.querySelector('#secondSelect').style.transform
        = 'rotate(90deg)';
    document.querySelector('#tableId').style.transform
        = 'rotate(90deg)';
    document.querySelector('#tableId').style.transform
        = 'flex';
    document.querySelector('#tableId').style.transform
        = 'left:20';
    targetRef.transform = 'rotate(90deg)';
  }

  const rotatePluginInstance = rotatePlugin();



  return (
      <div
          style={{
            width: "100vw",
            height: "100vh",
            overflowX: "hidden"
          }}
      >
        <div
            style={{
              height: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
        >
          <h1 style={{ color: grey(800) }}>Create your own work table</h1>

        </div>
        <div className="container">
          <div style={{display:"flex", justifyContent: "center",
            alignItems: "center"}}>
            <button onClick={handleAdd} className="button">Add New Row</button>
            <button onClick={handleRemove} className="delButton">Remove Row</button>
          </div>
        <div style={{ overflow: "auto", display: "flex" }}>
          <div
              style={{
                flex: "1 1 auto",
                padding: "1rem",
                maxWidth: 1000,
                marginLeft: "auto",
                marginRight: "auto"
              }}
          >

            <div id="targetContainer">
            <div ref={targetRef} id="targetDiv" style={{minHeight:100, minWidth:100}}>

              <div className='table-container'
                  style={{minHeight:`${rangeSliderValue}%`}}
              >
                <div style={{verticalAlign: "top", left: 20, width: 100}} id="firstSelect">
                  <Select
                      components={{SingleValue: IconSingleValue, Option: IconOption, DropdownIndicator: () => null}}
                      options={options}
                      menuPortalTarget={document.body}
                      styles={{colourStylesRow}}
                      autoSize={true}
                  />
                </div>
                <Table
                    columns={state.columns}
                    rows={state.rows}
                    manualRowResize={true}
                    data={tableData}
                    dispatch={dispatch}
                    skipReset={state.skipReset}
                    pageSize={100}
                    rotate={90}
                    updateMyData={updateMyData}/>
                <div style={{verticalAlign: "bottom", position:'fixed', right: 280,  width: 100}} id="secondSelect">
                </div>
              </div>
              <div style={{
                display: "flex",
                float: "right",
                verticalAlign: "bottom",
                right: 20,
                width: 100,
                fontSize: 20
              }}>
                <div style={{verticalAlign: "bottom",  width: 100}} id="secondSelect">
                  <Select
                      components={{SingleValue: IconSingleValue, Option: IconOption, DropdownIndicator: () => null}}
                      options={options}
                      styles={{colourStylesRow}}
                      autoSize={true}
                      menuPortalTarget={document.body}

                  />
              </div>
              </div>

              <div id="tableId" style={{display: "flex", fontSize: 20}}>
                <Select
                    components={
                      {SingleValue: IconSingleValue, Option: IconOption, DropdownIndicator: () => null}}
                    options={options}
                    styles={{colourStylesRow}}
                    autoSize={true}
                    menuPortalTarget={document.body}
                />
                <Select
                    components={{
                      SingleValue: IconSingleValue, Option: IconOption,
                      DropdownIndicator: () => null
                    }}
                    options={options}
                    styles={{colourStylesRow}}
                    autoSize={true}
                    menuPortalTarget={document.body}
                />
                <Select
                    components={{
                      SingleValue: IconSingleValue, Option: IconOption,
                      DropdownIndicator: () => null
                    }}
                    options={options}
                    styles={{colourStylesRow}}
                    autoSize={true}
                    menuPortalTarget={document.body}
                />
                <Select
                    components={{
                      SingleValue: IconSingleValue, Option: IconOption,
                      DropdownIndicator: () => null
                    }}
                    options={options}
                    styles={{colourStylesRow}}
                    autoSize={true}
                    menuPortalTarget={document.body}
                />
                <Select
                    components={{
                      SingleValue: IconSingleValue, Option: IconOption,
                      DropdownIndicator: () => null
                    }}
                    options={options}
                    styles={{colourStylesRow}}
                    autoSize={true}
                    menuPortalTarget={document.body}
                />
              </div>
            </div>
            </div>

            <div>
              <button className="button" onClick={() => generatePDF(targetRef, Options)}>Generate PDF</button>
              <div id="content-id">
                Content to be generated to PDF
              </div>
            </div>
            <button className="button" onClick={() => toPDF()} style={{
              justifyContent: "center",
              alignItems: "center", margin: 20
            }}>
              Download PDF
            </button>
          </div>
        </div>

        </div>
        <div
            style={{
              height: 140,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
        >
        </div>
        <footer style={{alignItems:"center",fontSize:10, marginLeft:5, marginBottom:0}}>
          Icon by: <a href="https://www.flaticon.com/free-animated-icons/calendar" title="calendar animated icons">Calendar
          animated icons created by Freepik - Flaticon</a>
        </footer>
        <ReactSlider>
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        </ReactSlider>
        <div className='sliderContainer'>
          <Slider>
            <input
                type="range"
                min="1"
                max="100"
                value={rangeSliderValue}
                onChange={handleRangeSliderChange}
                className="slider"
            />
          </Slider>
        </div>

        <button className="button" onClick={rotate90}>Rotate</button>


      </div>


  );
}

 export default App;
