import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import { LogOut, Building2, Fingerprint } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="h-16 px-8 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 md:hidden">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-accent-fg">
                        <Fingerprint size={18} />
                    </div>
                </div>
                <h2 className="text-[15px] font-medium text-dim">
                    {getGreeting()}, <span className="font-semibold text-bright">{user?.name}</span>
                </h2>
            </div>
            <div className="flex items-center gap-4">
                <ThemeToggle />

                {user?.organisationId && (
                    <div className="flex items-center gap-1 text-secondary opacity-60">
                        <Building2 size={16} />
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-sm font-semibold hover:bg-glass-hover transition-all active:scale-95 text-secondary hover:text-foreground"
                    id="logout-btn"
                >
                    <LogOut size={14} />
                    Logout
                </button>
            </div>
        </header>
    );
};

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
}

export default Header;
