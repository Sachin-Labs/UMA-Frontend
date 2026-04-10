import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    UserCheck,
    Calendar,
    Umbrella,
    Users,
    ClipboardList,
    Building,
    User,
    FileDown,
    Settings as SettingsIcon,
    Fingerprint
} from 'lucide-react';

const Sidebar = () => {
    const { user } = useAuth();
    const role = user?.role;

    const navItems = [
        { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'HR', 'EMPLOYEE'] },
        { to: '/app/attendance/mark', label: 'Mark Attendance', icon: UserCheck, roles: ['EMPLOYEE'] },
        { to: '/app/attendance/my', label: 'My Attendance', icon: Calendar, roles: ['EMPLOYEE'] },
        { to: '/app/leaves/my', label: 'My Leaves', icon: Umbrella, roles: ['EMPLOYEE'] },
        { to: '/app/attendance/manage', label: 'Attendance', icon: Users, roles: ['ADMIN', 'HR'] },
        { to: '/app/leaves/manage', label: 'Manage Leaves', icon: ClipboardList, roles: ['ADMIN', 'HR'] },
        { to: '/app/teams', label: 'Teams', icon: Building, roles: ['ADMIN', 'HR'] },
        { to: '/app/users', label: 'Users', icon: User, roles: ['ADMIN', 'HR'] },
        { to: '/app/reports', label: 'Reports', icon: FileDown, roles: ['ADMIN', 'HR'] },
        { to: '/app/settings', label: 'Settings', icon: SettingsIcon, roles: ['ADMIN'] },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-line flex flex-col z-[100] transition-colors duration-300">
            <div className="p-8 border-b border-line">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-accent-fg">
                        <Fingerprint size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tighter text-bright leading-none">UMA</h1>
                        <p className="text-[11px] text-muted font-bold tracking-widest mt-0.5">Core System</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto space-y-1">
                {navItems
                    .filter((item) => item.roles.includes(role))
                    .map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all group
                                    ${isActive
                                        ? 'bg-overlay text-bright font-bold'
                                        : 'text-subtle hover:bg-raised hover:text-bright'}
                                `}
                            >
                                <Icon size={18} className="group-hover:scale-110 transition-transform" />
                                {item.label}
                            </NavLink>
                        );
                    })}
            </nav>

            <div className="p-6 border-t border-line">
                <div className="px-3 py-1 bg-accent text-accent-fg text-[11px] font-bold tracking-widest rounded-lg inline-block">
                    {role?.charAt(0).toUpperCase() + role?.slice(1).toLowerCase()}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
