import React, { useState, useContext } from 'react';

const FormContext = React.createContext({
    data: {},
    handleChange: () => {},
});

export const Select = ({name, options, defaultOption, ...props}) => {
    const {data, handleChange} = useContext(FormContext);
    if (data[name] === undefined) {data[name]= defaultOption};
    return (
        <>
            <label for={name} > {name} </label>
            <select name={name} onChange={handleChange} {...props} >
                {options.map((item, index) => {
                    if(item !== null) { 
                        return item !== defaultOption ? <option value={item} key={index}>{item}</option> : <option value={item} key={index} selected>{item}</option> 
                    } else { 
                        return null; 
                    }
                })}
            </select>
        </>
    )
}

export const Form = ({onSubmit, ...props}) => {
    const [data, setData] = useState({})

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setData({...data, [name]: value});
    }

    const submitFunc = (event) => {
        event.preventDefault();
        onSubmit(data);
    }

    return (
        <FormContext.Provider value = {{data, handleChange}}>
            <form onSubmit={submitFunc} {...props} >
                {props.children}
            </form>
        </FormContext.Provider>
    )
}

export const Input = ({name, type, ...props}) => {
    const {handleChange} = useContext(FormContext);
    return (
        <>
        {/* <label for={name}> {name[0].toUpperCase() + name.slice(1)} </label>
        &nbsp; */}
        <input name={name} type={type}onChange={handleChange} {...props} style={{width: '100%', marginTop: '10px'}} />
        </>
    )
}
