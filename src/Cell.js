import React, {useEffect, useState} from "react";
import ContentEditable from "react-contenteditable";
import Relationship from "./Relationship";
import {usePopper} from "react-popper";
import {grey} from "./colors";
import PlusIcon from "./img/Plus";
import {randomColor} from "./utils";
import Trash from "./img/Trash";

export default function Cell({value: initialValue, row: {index}, column: {id, dataType, options}, dataDispatch}) {
    const [value, setValue] = useState({value: initialValue, update: false});
    const [selectRef, setSelectRef] = useState(null);
    const [selectPop, setSelectPop] = useState(null);
    const [showSelect, setShowSelect] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const onChange = (e) => {
        setValue({value: e.target.value, update: false});
    };
    const [showAdd, setShowAdd] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const [addSelectRef, setAddSelectRef] = useState(null);

    useEffect(() => {
        setValue({value: initialValue, update: false});
    }, [initialValue]);

    useEffect(() => {
        if (value.update) {
            dataDispatch({type: "update_cell", columnId: id, rowIndex: index, value: value.value});
        }
    }, [value, dataDispatch, id, index]);



    function handleOptionKeyDown(e) {
        if (e.key === "Enter") {
            if (e.target.value !== "") {
                dataDispatch({
                    type: "add_option_to_column",
                    option: e.target.value,
                    backgroundColor: randomColor(),
                    columnId: id
                });
            }
            setShowAdd(false);
        }
    }


    const onDelete = (index, _id) => {
        // delete a row
        setValue(value.filter((item, i) => i !== index));
    }
    function handleOptionBlur(e) {
        if (e.target.value !== "") {
            dataDispatch({
                type: "add_option_to_column",
                option: e.target.value,
                backgroundColor: randomColor(),
                columnId: id
            });
        }
        setShowAdd(false);
    }

    const {styles, attributes} = usePopper(selectRef, selectPop, {
        placement: "bottom-start",
        strategy: "fixed",
    });

    function getColor() {
        let match = options.find((option) => option.label === value.value);
        return (match && match.backgroundColor);
    }

    useEffect(() => {
        if (addSelectRef && showAdd) {
            addSelectRef.focus();
        }
    }, [addSelectRef, showAdd]);

    let element;
    switch (dataType) {
        case "text":
            element = (
                <ContentEditable
                    html={(value.value && value.value.toString()) || ""}
                    onChange={onChange}
                    onBlur={() => setValue((old) => ({value: old.value, update: true}))}
                    className='data-input'
                />
            );
            break;
            /*
        case "null":
            element = (
                <button onClick={onDelete}>
                    <Trash />
                </button>
            );
            break;

             */
        case "number":
            element = (
                <ContentEditable
                    html={(value.value && value.value.toString()) || ""}
                    onChange={onChange}
                    onBlur={() => setValue((old) => ({value: old.value, update: true}))}
                    className='data-input text-align-right'
                />
            );
            break;
        case "select":
            element = (
                <>
                    <div
                        ref={setSelectRef}
                        className='cell-padding d-flex cursor-default align-items-center flex-1'
                        onClick={() => setShowSelect(true)}>
                        {value.value && <Relationship value={value.value} backgroundColor={getColor()} />}
                    </div>
                    {showSelect && <div className='overlay' onClick={() => setShowSelect(false)} />}
                    {showSelect && (
                        <div
                            className='shadow-5 bg-white border-radius-md'
                            ref={setSelectPop}
                            {...attributes.popper}
                            style={{
                                ...styles.popper,
                                zIndex: 4,
                                minWidth: 200,
                                maxWidth: 320,
                                padding: "0.75rem"
                            }}>
                            <div className='d-flex flex-wrap-wrap' style={{marginTop: "-0.5rem",}}>
                                {options.map((option) => (
                                    <div
                                        className='cursor-pointer'
                                        style={{marginRight: "0.5rem", marginTop: "0.5rem"}}
                                        onClick={() => {
                                            setValue({value: option.label, update: true});
                                            setShowSelect(false);
                                        }}>
                                        <Relationship value={option.label} backgroundColor={option.backgroundColor} />
                                    </div>
                                ))}
                                {showAdd && (
                                    <div
                                        style={{
                                            marginRight: "0.5rem",
                                            marginTop: "0.5rem",
                                            width: 120,
                                            padding: "2px 4px",
                                            borderRadius: 4
                                        }}>
                                        <input
                                            type='text'
                                            className='option-input'
                                            onBlur={handleOptionBlur}
                                            ref={setAddSelectRef}
                                            onKeyDown={handleOptionKeyDown}
                                            style={{fontSize:'500px'}}
                                        />
                                    </div>
                                )}

                            </div>
                        </div>
                    )}
                </>
            );
            break;
        default:
            element = <span></span>;
            break;
    }

    return element;
}
