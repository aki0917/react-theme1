import React from 'react';

const TodoApp = () => {
  const [tasks,setTasks] = React.useState([]);
  const [currentTask,setCurrentTask] = React.useState('');

  const addTask = () => {
    if (!currentTask) return; 

    const comment = currentTask;

    const newTask = {
      id: tasks.length,
      comment,
      status: '作業中'
    };

    setTasks([...tasks,newTask]);
    setCurrentTask('');
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks.map((task,index) => ({...task,id:index})));
  };
 
  const toggleStatus = (id) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.status = task.status === '作業中' ? '完了' : '作業中';
      }
      return task;
    });
    setTasks(newTasks);
  };

  const [selectedStatus, setSelectedStatus] = React.useState('全て');

  return (
    <div>
      <h1>TODOリスト</h1>

      <div id="radio-buttons">
        <input 
          type="radio" 
          value="全て" 
          checked={selectedStatus === '全て'} 
          onChange={() => setSelectedStatus('全て')} 
        />
        <label htmlFor="all">全て</label>

        <input 
          type="radio" 
          value="作業中" 
          checked={selectedStatus === '作業中'} 
          onChange={() => setSelectedStatus('作業中')} 
        />
        <label htmlFor="working">作業中</label>

        <input 
          type="radio" 
          value="完了" 
          checked={selectedStatus === '完了'} 
          onChange={() => setSelectedStatus('完了')} 
        />
        <label htmlFor="done">完了</label>
      </div>


      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>コメント</th>
            <th>状態</th>
          </tr>
        </thead>

        <tbody id="task-list">
          {tasks.filter(task => {
            if(selectedStatus === '全て') return true;
            return task.status === selectedStatus;
          }).map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.comment}</td>
              <td>
                <button onClick={() => toggleStatus(task.id)}>
                  {task.status}
                </button>
              </td>
              <td><button onClick={()=> deleteTask(task.id)}>削除</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>新規タスク追加</h2>
      <div id="app">
        <input 
          type="text" 
          id="task-input" 
          value={currentTask} 
          onChange={(e) => setCurrentTask(e.target.value)}
        />
        <button id="add-button" onClick={addTask}>追加</button>
      </div>
    </div>
  );
}

export default TodoApp;
