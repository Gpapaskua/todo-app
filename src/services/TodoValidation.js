/**Check if task with same title exists in tasks or completedTasks arrays */
export const validateTask = (title, priority,  [...tasks], [...completedTasks]) => {
    
    return tasks.some(data => data.title === title || data.priority === priority)  || 
            completedTasks.some(data => data.title === title || data.priority === priority);
       
}


export const updateTask = (title, priority, oldTitle, oldPriority, [...tasks], [...completedTasks]) => {

    const unitedArray = [...tasks, ...completedTasks].filter(el => {

        return el.title !== oldTitle && el.priority !== oldPriority;
    })

    return  unitedArray.some(item => {

        return item.title === title || parseInt(item.priority) === parseInt(priority)});
       
}


 
