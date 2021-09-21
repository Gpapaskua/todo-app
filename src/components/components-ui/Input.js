import React, { useCallback, useEffect, useState } from 'react'

const Input = ({data, onChangeHandler}) => {

    const [template, setTemplate] = useState(null); // created input

    const drawInput = useCallback(
        () => {

           let inputTemplate = ``;

           switch(data.type){
               
                case 'text':
                    inputTemplate = 
                        <input className='form-control w-75 mx-1'
                               type={data.type} 
                               placeholder={data.placeholder}
                               value={data.value} 
                               onChange={e => onChangeHandler(e.target.value)} 
                               required />
                    
                    break;

                case 'number':
                    inputTemplate = 
                        <input className='form-control w-25'
                        type={data.type} 
                        value={data.value}
                        onChange={e => onChangeHandler(e.target.value)}
                        required/>

                    break;

                case 'checkbox':
                    inputTemplate = 
                        <input className='form-check-input'
                        id={data.id} type={data.type} 
                        checked={data.checked}
                        onChange={onChangeHandler} />  

                    break;

                default:
                    break;    
           }

           setTemplate(inputTemplate);  

        },
        [data, onChangeHandler],
    )

    useEffect(() => {

        drawInput();
       
    }, [drawInput])

    return (template)
}

export default Input
