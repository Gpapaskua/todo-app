import { useState } from 'react';

/**components */
import NewTodo from './components/NewTodo';
import Todo from './components/common/Todo';

/**helpers */
import { sortTasks } from './services/sortTasks';
import { validateTaskTitle } from './services/NewTodoValidation';
import { splitTasks } from './services/splitTasks';



const App = () => {

  const [tasks, setTasks] = useState([]); // tasks   
  const [showAddTask, setShowAddTask] = useState(false); // update task  
  const [completedTasks, setCompletedTasks] = useState([]); // list of completed tasks
  const [activeTasksPage, setActiveTasksPage] = useState(1);
  const [finishedTasksPage, setFinishedTasksPage] = useState(1);
  
  /**remove task*/
  const onTaskRemoveHandler = (task, index) => {

    //remove item using index
    // const newTasks = tasks.filter((el, elIndex) =>  index !== elIndex); 
    
    //remove item using title
    if(tasks.includes(task)){
      
      const renderedActiveTasks = splitTasks(tasks, activeTasksPage).length;
      
      if(renderedActiveTasks - 1 < activeTasksPage * 2 && renderedActiveTasks > 3 ){
        
          setActiveTasksPage(activeTasksPage - 1);
      }

      const newTasks = tasks.filter(el =>  el.title !== task.title);
      setTasks(newTasks);
    }
    else {
    
      const renderedFinishedTasks = splitTasks(completedTasks, finishedTasksPage).length;
      

      if(renderedFinishedTasks - 1  < finishedTasksPage * 2 && renderedFinishedTasks > 3 ){

          setFinishedTasksPage(finishedTasksPage - 1);
      }

      const newCompletedTasks = completedTasks.filter(el => el !== task);
      setCompletedTasks(newCompletedTasks);
    }
    
}

  /**add new task */
  const handleNewTaskSubmit = (e, newTask, priority) => {

    e.preventDefault();
    const newList = [...tasks, {title: newTask, priority}];
    setTasks(newList);
    
  }

  /**add task to finished tasks or to active tasks and handle pagination*/
  const finishTaskHandler = task => {
  
    if(completedTasks.includes(task)){

      const newCompletedTasks = completedTasks.filter(el => el !== task);
      const newActiveTasks = [...tasks, task];
      const renderedFinishedTasks = splitTasks(completedTasks, finishedTasksPage).length;
      

      if(renderedFinishedTasks - 1  < finishedTasksPage * 2 && renderedFinishedTasks > 3 ){

          setFinishedTasksPage(finishedTasksPage - 1);
      }
     

      setCompletedTasks(newCompletedTasks);
      setTasks(newActiveTasks);
    }
    else{

      const newCompletedTasks = [...completedTasks, task];
      const newActiveTasks = tasks.filter(el => el !== task);
      const renderedActiveTasks = splitTasks(tasks, activeTasksPage).length;
      
      if(renderedActiveTasks - 1 < activeTasksPage * 2 && renderedActiveTasks > 3 ){
        
          setActiveTasksPage(activeTasksPage - 1);
      }
      

      setCompletedTasks(newCompletedTasks);
      setTasks(newActiveTasks);
    }
    
  }

  /**handle task update */
  const handleEditTask = (title, priority, oldTitle, oldPriority) => {

    if(!validateTaskTitle(title, tasks, completedTasks)){

      const newList = tasks.map( task => {

      if(task.priority === oldPriority && task.title === oldTitle){

        const updatedTask = {
          title,
          priority
        };

        return updatedTask;
      }

      return task;
    });

  setTasks(newList);

  return true;

    } else {

      return false;
    }
  }

  
  return (
    <div className='container-fluid bg-dark d-flex 
    flex-column align-items-center min-vh-100'>
      <div className='w-100 rounded bg-dark text-white'>
        <div className='border d-flex flex-column align-items-center
         border-secondary p-3 mt-2 rounded'>
          <span className='d-flex align-items-center' role="button" 
          onClick={() => setShowAddTask(!showAddTask)}>
            
            {

             showAddTask ? 

             <i className="fas fa-minus-circle fs-4 mx-2" style={{color: '#ff0090'}}></i>
             : 
             <i className="fas fa-plus-circle fs-4 mx-2" style={{color: '#ff0090'}}></i>

            }
            New Todo</span>

      {
          showAddTask ? 

            <NewTodo 
                handleNewTaskSubmit={handleNewTaskSubmit}
                tasks={tasks}
                completedTasks={completedTasks}

         /> : null
      }
        </div>
      <h3 className='text-center mt-5'>Todo List</h3>
      <div className='container'>
        <div className='row'>
      <div className='col-md-6'>
        <h3 className='text-center my-2'>Active Tasks</h3>
        {

          tasks.length > 0 ? 
          
          splitTasks(sortTasks(tasks), activeTasksPage).map((task, index) => { 
            return <Todo 
                      key={index}
                      task={task}  
                      canUpdate={completedTasks.includes(task)}
                      finishTaskHandler={finishTaskHandler}
                      onTaskRemoveHandler={onTaskRemoveHandler} 
                      handleEditTask={handleEditTask} 
                      index={index}  />

          }) 
          :

          <p className='display-5 text-muted text-center'>No Tasks Found</p>

        }

        {
          activeTasksPage * 3 < tasks.length ?

            <span 
            role='button'
            className='text-center my-2'
            onClick={() => setActiveTasksPage(activeTasksPage + 1)}>Show more...</span>
          :
            null
        }
        

        </div>
        <div className='col-md-6'>
        <h3 className='text-center my-2'>Completed Tasks</h3>
            {

              completedTasks.length > 0 ? 

              splitTasks(completedTasks, finishedTasksPage).map((task, index) => {

                return <Todo 
                          key={index}
                          task={task}  
                          canUpdate={completedTasks.includes(task)}
                          finishTaskHandler={finishTaskHandler}
                          onTaskRemoveHandler={onTaskRemoveHandler} 
                          handleEditTask={handleEditTask} 
                          index={index}  />

              }) :  

              <p className='display-5 text-muted text-center'>No Tasks Found</p>

            }
            
            {
              finishedTasksPage * 3 < completedTasks.length ?

                <span 
                role='button'
                className='text-center my-2'
                onClick={() => setFinishedTasksPage(finishedTasksPage + 1)}>Show more</span>
              :
                null
            }
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
