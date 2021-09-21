/**Check if task with same title exists in tasks or completedTasks arrays */
export const validateTaskTitle = (title, tasks, completedTasks) => {
    return tasks.some(task => task.title === title) || 
    completedTasks.some(task => task.title === title);
       
}