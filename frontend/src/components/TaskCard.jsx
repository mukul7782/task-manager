const statusStyle = {
  pending:      { bg:'#FAEEDA', color:'#633806' },
  'in-progress':{ bg:'#EEEDFE', color:'#3C3489' },
  done:         { bg:'#E1F5EE', color:'#085041' },
};

export default function TaskCard({ task, onDelete, onEdit }) {
  const s = statusStyle[task.status] || statusStyle.pending;
  return (
    <div style={{ border:'1px solid #eee', borderRadius:10,
      padding:'14px 16px', marginBottom:12, background:'#fff' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <h4 style={{ margin:0, fontSize:15, color:'#1a1a1a' }}>{task.title}</h4>
        <span style={{ fontSize:11, padding:'3px 9px', borderRadius:20,
          background:s.bg, color:s.color, fontWeight:500 }}>
          {task.status}
        </span>
      </div>
      {task.description &&
        <p style={{ fontSize:13, color:'#666', margin:'6px 0 0' }}>
          {task.description}
        </p>}
             <div style={{ display:'flex', gap:12, marginTop:8, fontSize:12, color:'#888' }}>
        <span>Priority: {task.priority}</span>
        {task.dueDate &&
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
      </div>
      <div style={{ display:'flex', gap:8, marginTop:10 }}>
        <button onClick={() => onEdit(task)} style={{ fontSize:12, padding:'4px 12px' }}>
          Edit
        </button>
        <button onClick={() => onDelete(task._id)}
          style={{ fontSize:12, padding:'4px 12px', color:'#c0392b' }}>
          Delete
        </button>
      </div>
    </div>
  );
}
