
/**Function returns certain amount of tasks based on index */
export const splitTasks = (tasks, index) =>{
    if(tasks.length < 4 || index * 3 >= tasks.length){
        return tasks;
    }

    const splitedTasks = tasks.slice(0, index * 3);

    return splitedTasks;
}