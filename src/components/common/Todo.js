import React, { useState } from 'react'

/**UI components */
import Input from '../components-ui/Input';

const Todo = ({task,  canUpdate, finishTaskHandler, onTaskRemoveHandler, handleEditTask,index
  }) => {

  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title); // value of updated task
  const [updateTaskPriority, setUpdateTaskPriority] = useState(task.priority); // value of updated task
  const [editTask, setEditTask] = useState(false); // update task
  const [taskToModify, setTaskToModify] = useState(null); // task to update
  const [updateError, setUpdateError] = useState(false);


  /**Close task edit form and reset values */
  const handleTaskEditCancel = () => {

    setEditTask(false); 
    setUpdateError(null);
    setTaskToModify(null);
    setUpdateTaskPriority(task.priority);
    setUpdateTaskTitle(task.title);

  }

  /**Update task and reset new task values */
  const handleTaskUpdate = (e) => {

    e.preventDefault();
    
    const didUpdate = 
      handleEditTask(updateTaskTitle, updateTaskPriority, taskToModify.title, taskToModify.priority);

    if(didUpdate){

      setTaskToModify(null); 
      setEditTask(false);
      setUpdateError(null);
    } else {

      setUpdateError(true);
    }
   
    
  }


    return (
        <div className='d-flex align-items-center justify-content-evenly
                        py-3 bg-secondary rounded my-2'>
                <span className=''>{index + 1}.</span>

              {

              editTask && taskToModify === task && !canUpdate ? 

              <form onSubmit={handleTaskUpdate}>
                <div className="d-flex">

                  <Input 
                          data={
                                {
                                  type: "text", value: updateTaskTitle
                                }
                              }
                          onChangeHandler={ setUpdateTaskTitle } />
                  
                  <Input 
                          data={
                                {
                                  type: "number", value: updateTaskPriority
                                }
                              }
                          onChangeHandler={ setUpdateTaskPriority }
                          />

                  <button 
                        type='button'
                        className='btn btn-warning mx-2' 
                        onClick={handleTaskEditCancel}>Cancel</button>

                  <button 
                        type='submit'
                        className='btn btn-success'>Save</button>
                </div>

               {
                 updateError ? 
                  <span className='text-danger my-1'>This task appears to be in Todo list!</span>
                  : null
               } 
              </form> : 
              <>
              {

              canUpdate ? 

              <del className='text-break mx-2 w-50'>{task.title}</del>
               : 
               <p className='text-break mb-0 mx-2 w-50' 
                        onClick={() => {setEditTask(!editTask); setTaskToModify(task)}}>{task.title}</p>

              }
              <span className="position-relative priority">{task.priority}</span>
              </>
              }
               <div className="form-check mx-2">
               <label className="form-check-label" htmlFor="flexCheckChecked">
                    Finished
                  </label>

                <Input 
                        data={
                              {
                                id: "flexCheckChecked",
                                type: "checkbox", 
                                checked: canUpdate
                              }
                            }
                        onChangeHandler={ () => finishTaskHandler(task) } />  

                </div>

                <button className='btn btn-small btn-danger mx-2'
                        onClick={() => onTaskRemoveHandler(task, index)}>X</button>

              </div> 
    )
}

export default Todo
