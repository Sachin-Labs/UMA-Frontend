import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Fingerprint } from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const SetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.post('/auth/set-password', { token, password });

            // Log in the user automatically
            login(data.data.user, data.data.accessToken, data.data.refreshToken);

            navigate('/app/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to set password. Link may be invalid or expired.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page relative">
            <div className="fixed top-8 right-8 z-50">
                <ThemeToggle className="bg-surface border border-line" />
            </div>
            <div className="auth-card">
                <div className="auth-header mb-8 text-center flex flex-col items-center">
                    <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-accent-fg mb-4">
                        <Fingerprint size={28} />
                    </div>
                    <h1 className="auth-logo text-xl font-bold tracking-tighter text-bright mb-2">Attendance MS</h1>
                    <p className="auth-subtitle text-[15px] text-subtle">Welcome! Set a password for your account.</p>
                </div>

                {error && <div className="error-msg" style={{ marginBottom: '1.5rem' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Min 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Repeat password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block btn-lg"
                        disabled={loading}
                        style={{ marginTop: '1rem' }}
                    >
                        {loading ? <div className="spinner spinner-sm"></div> : 'Set Password & Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SetPassword;
