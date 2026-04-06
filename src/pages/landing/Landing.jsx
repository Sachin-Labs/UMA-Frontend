import { Link } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';
import {
    Users,
    Calendar,
    ArrowRight,
    MapPin,
    ShieldCheck,
    Clock,
    Fingerprint
} from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen bg-canvas font-sans text-bright">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-accent-fg">
                            <Fingerprint size={24} />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Attendance MS</span>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <ThemeToggle />
                        <Link to="/login" className="btn btn-outline btn-sm">Sign In</Link>
                        <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-48 pb-32">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 animate-fade-in">
                        Effortless Attendance for Modern Teams
                    </h1>
                    <p className="text-[15px] text-dim mb-12 max-w-2xl mx-auto leading-relaxed">
                        Track attendance, manage leaves, and set office boundaries in one simple interface.
                        No bloat, just the tools your team needs.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register" className="btn btn-primary btn-lg w-full sm:w-auto px-10">
                            Start for Free <ArrowRight size={18} className="ml-2" />
                        </Link>
                        <Link to="/login" className="btn btn-outline btn-lg w-full sm:w-auto px-10">
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Core Features */}
            <section className="py-32 bg-surface border-y border-line">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent">
                                <MapPin size={24} />
                            </div>
                            <h3 className="text-xl font-bold">Location Rules</h3>
                            <p className="text-[15px] text-subtle leading-relaxed">
                                Define where your team works and verify their presence automatically.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent">
                                <Calendar size={24} />
                            </div>
                            <h3 className="text-xl font-bold">Leave Tracking</h3>
                            <p className="text-[15px] text-subtle leading-relaxed">
                                Simple leave requests and approvals that keep everyone in sync.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold">Team Control</h3>
                            <p className="text-[15px] text-subtle leading-relaxed">
                                Add employees to teams and manage their roles with ease.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-32">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-raised text-subtle text-xs font-semibold rounded-full border border-line">
                        <ShieldCheck size={14} className="text-accent" />
                        Secure & Reliable
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight">Focus on building, we'll handle the logistics.</h2>
                    <p className="text-dim text-[15px]">
                        The essential tool for growing companies.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-line py-24 bg-surface/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2 space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-accent-fg">
                                    <Fingerprint size={24} />
                                </div>
                                <span className="text-xl font-bold tracking-tight">Attendance MS</span>
                            </div>
                            <p className="text-[15px] text-dim max-w-sm leading-relaxed">
                                The essential tool for modern team attendance and workforce logistics.
                                Built for speed and focus.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted mb-6">Product</h4>
                            <ul className="space-y-4 text-sm text-dim font-medium">
                                <li><a href="#" className="hover:text-bright transition-colors">Features</a></li>
                                <li><Link to="/register" className="hover:text-bright transition-colors">Get Started</Link></li>
                                <li><Link to="/login" className="hover:text-bright transition-colors">Sign In</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted mb-6">Support</h4>
                            <ul className="space-y-4 text-sm text-dim font-medium">
                                <li><a href="#" className="hover:text-bright transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-bright transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-bright transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-12 border-t border-line/50 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-xs text-muted">
                            © {new Date().getFullYear()} AMS. All rights reserved.
                        </p>
                        <div className="flex gap-8">
                            <span className="text-xs font-bold text-muted uppercase tracking-widest">Version 1.0.0</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
