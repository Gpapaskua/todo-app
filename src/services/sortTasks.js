/**sort tasks by priority */
export const sortTasks = tasks => { 
    return tasks.sort((a,b) => (a.priority < b.priority) ? 1 : ((b.priority < a.priority) ? -1 : 0))
  }