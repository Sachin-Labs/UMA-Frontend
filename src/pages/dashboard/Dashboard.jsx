import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import api from '../../api/axios';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale, BarElement, Title
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
    CheckCircle2,
    Clock,
    Home,
    XCircle,
    Activity,
    TrendingUp,
    Users,
    Calendar,
    ArrowUpRight,
    Loader2
} from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
    const { user } = useAuth();
    const { theme } = useTheme();
    const [stats, setStats] = useState({ present: 0, late: 0, absent: 0, wfh: 0, onLeave: 0, total: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const monthStart = today.substring(0, 7) + '-01';

            if (user.role === 'EMPLOYEE') {
                const { data } = await api.get('/attendance/my', { params: { startDate: monthStart, endDate: today } });
                const records = data.data.records || [];
                setStats({
                    present: records.filter(r => r.status === 'PRESENT').length,
                    late: records.filter(r => r.status === 'LATE').length,
                    absent: 0,
                    wfh: records.filter(r => r.workType === 'WFH').length,
                    onLeave: 0,
                    total: records.length,
                });
            } else {
                const { data } = await api.get('/attendance', { params: { startDate: today, endDate: today } });
                const records = data.data.records || [];
                setStats({
                    present: records.filter(r => r.status === 'PRESENT').length,
                    late: records.filter(r => r.status === 'LATE').length,
                    absent: 0,
                    wfh: records.filter(r => r.workType === 'WFH').length,
                    onLeave: 0,
                    total: records.length,
                });
            }
        } catch { /* ignore */ }
        setLoading(false);
    };

    const isDark = theme === 'dark';
    const primaryColor = isDark ? '#ffffff' : '#000000';
    const secondaryColor = isDark ? '#a1a1aa' : '#71717a';
    const mutedColor = isDark ? '#27272a' : '#f4f4f5';
    const borderColor = isDark ? '#3f3f46' : '#e4e4e7';

    const doughnutData = {
        labels: ['Present', 'Late', 'WFH', 'Absent'],
        datasets: [{
            data: [stats.present, stats.late, stats.wfh, stats.absent],
            backgroundColor: [
                primaryColor,
                secondaryColor,
                mutedColor,
                'transparent'
            ],
            borderColor: borderColor,
            borderWidth: 1,
            hoverOffset: 4,
            cutout: '75%'
        }],
    };

    const barData = {
        labels: ['Present', 'Late', 'WFH'],
        datasets: [{
            label: user.role === 'EMPLOYEE' ? 'Records this Month' : 'Attendance Today',
            data: [stats.present, stats.late, stats.wfh],
            backgroundColor: primaryColor,
            borderRadius: 6,
            barThickness: 32,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: secondaryColor,
                    font: { family: 'Inter, system-ui, sans-serif', size: 10, weight: '600' },
                    padding: 24,
                    usePointStyle: true,
                    boxWidth: 6,
                }
            },
            tooltip: {
                backgroundColor: isDark ? '#000000' : '#ffffff',
                titleColor: primaryColor,
                bodyColor: secondaryColor,
                borderColor: borderColor,
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                titleFont: { family: 'Inter, system-ui, sans-serif', size: 12, weight: 'bold' },
                bodyFont: { family: 'Inter, system-ui, sans-serif', size: 11 },
                displayColors: false,
            }
        },
        scales: {
            x: {
                ticks: { color: secondaryColor, font: { family: 'Inter, system-ui, sans-serif', size: 10, weight: '500' } },
                grid: { display: false }
            },
            y: {
                ticks: { color: secondaryColor, font: { family: 'Inter, system-ui, sans-serif', size: 10 }, stepSize: 1 },
                grid: { color: borderColor, borderDash: [4, 4] }
            },
        },
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-8">
                <div className="space-y-1">
                    <h1 className="text-xl font-bold tracking-tight text-foreground">Dashboard</h1>
                    <p className="text-[15px] text-secondary font-medium tracking-wide">
                        {user.role === 'EMPLOYEE' ? 'View your personal attendance stats' : 'View team attendance for today'}
                    </p>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-bold tracking-widest text-muted bg-secondary/30 px-4 py-2 rounded-full border border-border">
                    <Activity size={14} className="text-foreground" />
                    System Active • Live
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Present', value: stats.present, status: 'In Office' },
                    { label: 'Late', value: stats.late, status: 'Delayed' },
                    { label: 'WFH', value: stats.wfh, status: 'Remote' },
                    { label: 'Absent', value: stats.absent, status: 'Away' },
                ].map((item, i) => (
                    <div key={item.label} className="card p-5 border-border/60 transition-colors hover:border-foreground/20">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-bold text-secondary tracking-widest uppercase">{item.label}</p>
                                <span className="text-[10px] font-bold text-muted tracking-widest px-2 py-0.5 bg-raised rounded-full">{item.status}</span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tighter text-foreground leading-none">
                                {loading ? '—' : item.value}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 card p-8 border-border/60">
                    <div className="flex items-center justify-between mb-10">
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
                                Attendance Trends
                                <TrendingUp size={16} className="text-muted" />
                            </h3>
                            <p className="text-[11px] text-muted font-bold tracking-widest">Attendance for this month</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-foreground" />
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            <div className="w-2 h-2 rounded-full bg-muted" />
                        </div>
                    </div>
                    <div className="h-[350px] relative">
                        {loading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 size={32} className="animate-spin text-muted opacity-20" />
                            </div>
                        ) : (
                            <Bar data={barData} options={chartOptions} />
                        )}
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="card p-8 border-border/60 h-full flex flex-col">
                        <div className="space-y-1 mb-10">
                            <h3 className="text-lg font-bold tracking-tight">Status Split</h3>
                            <p className="text-[11px] text-muted font-bold tracking-widest">Total status breakdown</p>
                        </div>
                        <div className="flex-1 relative min-h-[250px]">
                            {loading ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full border-4 border-dashed border-border animate-spin" />
                                </div>
                            ) : (
                                <Doughnut data={doughnutData} options={chartOptions} />
                            )}
                        </div>

                        <div className="mt-8 space-y-3">
                            <div className="p-4 rounded-xl bg-secondary/20 border border-border/50 flex items-center justify-between group cursor-default">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-background border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                                        <Users size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-muted tracking-widest">Total Employees</p>
                                        <p className="text-[15px] font-bold">{stats.total}</p>
                                    </div>
                                </div>
                                <ArrowUpRight size={14} className="text-muted group-hover:text-foreground transition-colors" />
                            </div>
                            <div className="p-4 rounded-xl bg-secondary/20 border border-border/50 flex items-center justify-between group cursor-default">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-background border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                                        <Calendar size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-muted tracking-widest">Updates</p>
                                        <p className="text-[15px] font-bold">Real-time</p>
                                    </div>
                                </div>
                                <ArrowUpRight size={14} className="text-muted group-hover:text-foreground transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
