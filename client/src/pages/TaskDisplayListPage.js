import React from 'react';
import { useParams } from 'react-router-dom';

import TaskList from '../components/TaskList/tasksList';

function TaskDisplayListPage() {
  const params = useParams();
  return (
    <div>
      <TaskList worktasks={params.worktasks} />
    </div>
    
  )
}

export default TaskDisplayListPage