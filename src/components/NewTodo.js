import React, { useState } from 'react'

/**UI components */
import Input from './components-ui/Input'

/**helpers */
import { validateTask } from '../services/TodoValidation';


const NewTodo = ({handleNewTaskSubmit, tasks, completedTasks}) => {

    const [newTask, setNewTask] = useState(''); // task title
    const [priority, setPriority] = useState(1); // priority level
    const [titleError, setTitleError] = useState(false); // priority level
    

    const cleanUp = () => {
        setNewTask('');
        setPriority(1);
        setTitleError(false);

    }

    /**handle new task submit and validate task title*/
    const handleSubmit = e => {

        e.preventDefault();

        const isValid = validateTask(newTask, priority, tasks, completedTasks);

        if(!isValid)  {

            handleNewTaskSubmit(e, newTask, priority);
            cleanUp();
        }

        else {

            setTitleError(true);

        }
        
    }


    return (
        <form onSubmit={handleSubmit} 
        className='w-75 d-flex flex-column align-items-center my-2'>
        <label className='my-1 text-muted' htmlFor='titleInput'>Enter Task</label>

        <Input 
                data={
                      {
                            type: 'text',
                            value: newTask,
                            placeholder: 'Todo'
                      }
                     } 
                onChangeHandler={ setNewTask } />

        {
            titleError ? 
                <span className='text-danger my-1'>Task title and priority should be unique!</span> 
                : null
        }
        <label className='my-1 text-muted' htmlFor='priorityInput'>Choose Priority</label>
        
        <Input 
                data={
                      {
                          type: 'number',
                          value: priority
                      }
                     } 
                onChangeHandler={ setPriority } />

        <button type='submit' className='btn btn-success w-25 my-3'>Add</button>
    </form>
    )
}

export default NewTodo
