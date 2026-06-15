import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function TaskModal({ onClose, onSave, editTask }) {
  const [form, setForm] = useState({
    title:'', description:'', status:'pending', priority:'medium', dueDate:''
  });

  useEffect(() => {
    if (editTask) setForm({
      title: editTask.title,
      description: editTask.description || '',
      status: editTask.status,
      priority: editTask.priority,
      dueDate: editTask.dueDate
        ? new Date(editTask.dueDate).toISOString().split('T')[0] : '',
    });
  }, [editTask]);
 const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTask) await API.put('/tasks/' + editTask._id, form);
      else await API.post('/tasks', form);
      onSave();
    } catch (err) { alert(err.response?.data?.message || 'Error saving task'); }
  };
    return (
    <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0,
      background:'rgba(0,0,0,0.4)', display:'flex',
      alignItems:'center', justifyContent:'center', zIndex:999 }}
      onClick={onClose}>
      <div style={{ background:'#fff', borderRadius:12, padding:'24px 28px',
        width:'90%', maxWidth:460 }} onClick={e => e.stopPropagation()}>
        <h3 style={{ margin:'0 0 16px' }}>{editTask ? 'Edit task' : 'New task'}</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Task title *" value={form.title}
            onChange={handleChange} required
            style={{ width:'100%', padding:9, marginBottom:10, display:'block' }} />
          <input name="description" placeholder="Description (optional)"
            value={form.description} onChange={handleChange}
            style={{ width:'100%', padding:9, marginBottom:10, display:'block' }} />
          <select name="status" value={form.status} onChange={handleChange}
            style={{ width:'100%', padding:9, marginBottom:10, display:'block' }}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
             <select name="priority" value={form.priority} onChange={handleChange}
            style={{ width:'100%', padding:9, marginBottom:10, display:'block' }}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input type="date" name="dueDate" value={form.dueDate}
            onChange={handleChange}
            style={{ width:'100%', padding:9, marginBottom:14, display:'block' }} />
          <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">{editTask ? 'Save changes' : 'Create task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}