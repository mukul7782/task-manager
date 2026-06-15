import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const url = filter !== 'all' ? '/tasks?status=' + filter : '/tasks';
      const { data } = await API.get(url);
      setTasks(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchTasks(); }, [filter]);
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await API.delete('/tasks/' + id);
    fetchTasks();
  };

  const handleEdit = (task) => { setEditTask(task); setShowModal(true); };

  const handleModalSave = () => {
    setShowModal(false); setEditTask(null); fetchTasks();
  };

  return (
    <div style={{ maxWidth:700, margin:'0 auto', padding:'24px 16px' }}>
      <div style={{ display:'flex', justifyContent:'space-between',
        alignItems:'center', marginBottom:20 }}>
        <h2 style={{ margin:0 }}>Hello, {user?.name}</h2>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={() => { setEditTask(null); setShowModal(true); }}>
            + New task
          </button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <div style={{ display:'flex', gap:8, marginBottom:20 }}>
        {['all','pending','in-progress','done'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ fontWeight: filter===f ? 700 : 400 }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {tasks.length === 0
        ? <p style={{ color:'#888' }}>No tasks yet. Click + New task!</p>
        : tasks.map(t => <TaskCard key={t._id} task={t}
            onDelete={handleDelete} onEdit={handleEdit} />)
      }

      {showModal && <TaskModal
        onClose={() => { setShowModal(false); setEditTask(null); }}
        onSave={handleModalSave}
        editTask={editTask}
      />}
    </div>
  );
}