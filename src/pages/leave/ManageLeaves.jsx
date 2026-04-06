import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Check, X, Filter, Loader2, ClipboardX, User, SearchX } from 'lucide-react';

const ManageLeaves = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('PENDING');

    useEffect(() => { fetchLeaves(); }, [filter]);

    const fetchLeaves = async () => {
        setLoading(true);
        try {
            const params = filter ? { status: filter } : {};
            const { data } = await api.get('/leaves', { params });
            setLeaves(data.data.leaves || []);
        } catch { /* ignore */ }
        setLoading(false);
    };

    const handleAction = async (id, action) => {
        try {
            await api.patch(`/leaves/${id}/${action}`);
            fetchLeaves();
        } catch { /* ignore */ }
    };

    const getStatusBadge = (status) => {
        const styles = {
            PENDING: 'bg-secondary text-foreground border border-border',
            APPROVED: 'bg-foreground text-background',
            REJECTED: 'bg-muted text-secondary border border-border/50'
        };
        return (
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold tracking-widest ${styles[status] || styles.PENDING}`}>
                {status.charAt(0) + status.slice(1).toLowerCase()}
            </span>
        );
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold tracking-tight text-foreground">Manage Leaves</h1>
                <p className="text-[15px] text-secondary">Review and respond to team leave requests</p>
            </div>

            <div className="card flex flex-wrap items-center gap-2 p-2">
                {['PENDING', 'APPROVED', 'REJECTED', ''].map((s) => (
                    <button 
                        key={s} 
                        className={`
                            px-4 py-1.5 rounded-md text-[11px] font-bold tracking-widest transition-all
                            ${filter === s 
                                ? 'bg-foreground text-background' 
                                : 'text-secondary hover:text-foreground hover:bg-secondary'}
                        `}
                        onClick={() => setFilter(s)}
                    >
                        {s ? s.charAt(0) + s.slice(1).toLowerCase() : 'All'}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 text-secondary gap-4">
                    <Loader2 size={32} className="animate-spin opacity-50" />
                    <p className="text-[15px] font-medium animate-pulse">Loading requests...</p>
                </div>
            ) : leaves.length === 0 ? (
                <div className="card flex flex-col items-center justify-center py-24 text-center border-dashed border-2 border-border/60">
                    <div className="p-4 rounded-full bg-secondary mb-4">
                        <SearchX size={32} className="text-muted" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground tracking-tight">No leave requests</h3>
                    <p className="text-[15px] text-secondary mt-2 max-w-[300px] leading-relaxed">There are no leave requests to review at this time.</p>
                </div>
            ) : (
                <div className="card p-0 overflow-hidden border-border/50">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-secondary/30 border-b border-border">
                                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-muted">Employee</th>
                                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-muted">Leave Type</th>
                                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-muted">Dates</th>
                                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-muted">Reason</th>
                                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-muted text-center">Status</th>
                                    <th className="px-6 py-4 text-[11px] font-bold tracking-widest text-muted text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {leaves.map((l) => (
                                    <tr key={l._id} className="hover:bg-glass-hover transition-colors duration-200 group">
                                        <td className="px-6 py-4 text-[15px]">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-[10px] font-bold text-secondary">
                                                    {l.userId?.name?.substring(0, 2) || '—'}
                                                </div>
                                                <span className="font-medium text-foreground">{l.userId?.name || '—'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[11px] font-bold text-secondary tracking-widest">{l.leaveType?.charAt(0) + l.leaveType?.slice(1).toLowerCase()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-[15px] font-medium text-foreground">{l.startDate}</span>
                                                <span className="text-xs text-muted font-bold">to {l.endDate}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-[15px] text-secondary max-w-[200px] truncate" title={l.reason}>
                                                {l.reason}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {getStatusBadge(l.status)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {l.status === 'PENDING' ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        className="p-2 bg-foreground text-background rounded-md hover:opacity-90 transition-all" 
                                                        onClick={() => handleAction(l._id, 'approve')}
                                                        title="Approve"
                                                    >
                                                        <Check size={14} strokeWidth={3} />
                                                    </button>
                                                    <button 
                                                        className="p-2 bg-secondary text-foreground rounded-md hover:bg-muted transition-all border border-border" 
                                                        onClick={() => handleAction(l._id, 'reject')}
                                                        title="Reject"
                                                    >
                                                        <X size={14} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-muted font-bold opacity-50">Done</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageLeaves;
