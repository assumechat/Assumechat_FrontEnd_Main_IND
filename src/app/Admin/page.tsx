"use client"
import { useRef, useEffect, useState } from 'react';
import Head from 'next/head';

type SystemData = {
    status: string;
    users: {
        total: number;
        active: number;
        newToday: number;
    };
    performance: {
        responseTime: string;
        uptime: string;
        lastIncident: string;
    };
    assumptions: {
        dailyMatches: number;
        retentionRate: string;
        premiumConversion: string;
    };
    lastUpdated: string;
};

export default function AdminDashboard() {
    const [adminKey, setAdminKey] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [systemData, setSystemData] = useState<SystemData | null>(null);
    const [loading, setLoading] = useState(false);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        // Try to get admin key from env first
        const envKey = process.env.NEXT_PUBLIC_ADMIN_KEY;
        if (envKey) {
            setAdminKey(envKey);
            verifyAdminKey(envKey);
        }
    }, []);

    useEffect(() => {
        if (authenticated) {
            fetchSystemData();
            const interval = setInterval(fetchSystemData, 30000); // Refresh every 30 seconds
            return () => clearInterval(interval);
        }
    }, [authenticated]);

    const verifyAdminKey = (key: string) => {
        setLoading(true);
        // In a real app, this would be an API call
        setTimeout(() => {
            if (key === process.env.NEXT_PUBLIC_ADMIN_KEY) {
                setAuthenticated(true);
            } else {
                alert('Invalid admin key');
            }
            setLoading(false);
        }, 800);
    };

    const fetchSystemData = async () => {
        // Mock data - replace with actual API calls
        const mockData = {
            status: 'healthy',
            users: {
                total: Math.floor(Math.random() * 1000) + 5000,
                active: Math.floor(Math.random() * 800) + 1200,
                newToday: Math.floor(Math.random() * 100) + 50,
            },
            performance: {
                responseTime: (Math.random() * 50 + 50).toFixed(2),
                uptime: '99.98%',
                lastIncident: 'None',
            },
            assumptions: {
                dailyMatches: Math.floor(Math.random() * 500) + 1500,
                retentionRate: (Math.random() * 20 + 70).toFixed(1) + '%',
                premiumConversion: (Math.random() * 5 + 8).toFixed(1) + '%',
            },
            lastUpdated: new Date().toLocaleTimeString(),
        };
        setSystemData(mockData);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const animateElements = () => {
                const time = Date.now() * 0.001;
                cardsRef.current.forEach((card, index) => {
                    const delay = index * 0.15;
                    card.style.transform = `translateY(${Math.sin(time + delay) * 5}px)`;
                });
                requestAnimationFrame(animateElements);
            };
            animateElements();
        }
    }, []);

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (!el) return;
        cardsRef.current[index] = el;
    };

    const StatCard = ({
        index,
        title,
        value,
        trend,
        icon
    }: {
        index: number;
        title: string;
        value: string | number;
        trend?: string;
        icon: React.ReactNode;
    }) => (
        <div
            ref={el => addToRefs(el, index)}
            className="bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200 transition-transform duration-300"
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-sm font-medium">{title}</p>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                    {trend && (
                        <p className={`text-sm mt-1 ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {trend}
                        </p>
                    )}
                </div>
                <div className="p-2 bg-[#B30738] bg-opacity-10 rounded-lg">
                    {icon}
                </div>
            </div>
        </div>
    );

    const HealthIndicator = ({ status }: { status: string }) => (
        <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${status === 'healthy' ? 'bg-green-500' :
                status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
            <span className="capitalize">{status}</span>
        </div>
    );

    if (!authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-200 max-w-md w-full">
                    <h1 className="text-2xl font-bold text-center mb-6">Admin Portal</h1>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Admin Key
                            </label>
                            <input
                                type="password"
                                value={adminKey}
                                onChange={(e) => setAdminKey(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B30738] focus:border-transparent"
                                placeholder="Enter admin key"
                            />
                        </div>
                        <button
                            onClick={() => verifyAdminKey(adminKey)}
                            disabled={loading}
                            className="w-full bg-[#B30738] hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </>
                            ) : 'Enter Dashboard'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-white">
            {/* Background SVGs */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <svg width="1124" height="776" viewBox="0 0 1124 776" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_2001_4022)">
                        <path d="M632.264 141.194C767.715 180.033 882.393 242.83 958.309 312.936C1034.25 383.065 1071.29 460.391 1051.81 528.332C1032.32 596.273 959.936 642.221 858.373 661.452C756.842 680.677 626.313 673.161 490.862 634.321C355.411 595.481 240.733 532.685 164.817 462.578C88.8779 392.449 51.8378 315.123 71.3196 247.182C90.8013 179.241 163.19 133.293 264.753 114.062C366.284 94.8376 496.813 102.354 632.264 141.194Z" stroke="#B30738" />
                    </g>
                    <defs>
                        <filter id="filter0_f_2001_4022" x="61.6885" y="99.4001" width="999.749" height="576.714" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_2001_4022" />
                        </filter>
                    </defs>
                </svg>
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-6 md:p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-gray-600">
                            {systemData ? `Last updated: ${systemData.lastUpdated}` : 'Loading...'}
                        </p>
                    </div>
                    <button
                        onClick={() => setAuthenticated(false)}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors"
                    >
                        Sign Out
                    </button>
                </header>

                {systemData ? (
                    <>
                        {/* Health Status */}
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">System Health</h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div
                                    ref={el => addToRefs(el, 0)}
                                    className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200 col-span-2 transition-transform duration-300"
                                >
                                    <h3 className="text-lg font-medium mb-4">Backend Status</h3>
                                    <div className="flex items-center justify-between">
                                        <HealthIndicator status={systemData.status} />
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Response Time</p>
                                            <p className="text-xl font-bold">
                                                {systemData.performance.responseTime}ms
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <p className="text-sm text-gray-500 mb-1">Uptime</p>
                                        <p className="text-lg font-medium">
                                            {systemData.performance.uptime}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Last Incident: {systemData.performance.lastIncident}
                                        </p>
                                    </div>
                                </div>

                                <StatCard
                                    index={1}
                                    title="Total Users"
                                    value={systemData.users.total.toLocaleString()}
                                    trend={`+${systemData.users.newToday} today`}
                                    icon={
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="#B30738" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    }
                                />

                                <StatCard
                                    index={2}
                                    title="Active Now"
                                    value={systemData.users.active.toLocaleString()}
                                    icon={
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#B30738" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 6V12L16 14" stroke="#B30738" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    }
                                />
                            </div>
                        </section>

                        {/* Analytics */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <StatCard
                                    index={3}
                                    title="Daily Matches"
                                    value={systemData.assumptions.dailyMatches}
                                    icon={
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 12L10.5347 14.2812C10.9662 14.6696 11.6366 14.6101 11.993 14.1519L16 9" stroke="#B30738" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#B30738" strokeWidth="2" />
                                        </svg>
                                    }
                                />

                                <StatCard
                                    index={4}
                                    title="Retention Rate"
                                    value={systemData.assumptions.retentionRate}
                                    icon={
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="#B30738" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    }
                                />

                                <StatCard
                                    index={5}
                                    title="Premium Conversion"
                                    value={systemData.assumptions.premiumConversion}
                                    icon={
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#B30738" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    }
                                />
                            </div>
                        </section>

                        {/* Recent Activity */}
                        <section className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                            <div
                                ref={el => addToRefs(el, 6)}
                                className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200 transition-transform duration-300"
                            >
                                <div className="space-y-4">
                                    {[
                                        { time: '2 mins ago', event: 'New user from IIT Bombay signed up' },
                                        { time: '15 mins ago', event: 'Server maintenance completed' },
                                        { time: '1 hour ago', event: 'Premium subscription purchased by IIT Delhi user' },
                                        { time: '3 hours ago', event: 'Database backup completed' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start pb-2 border-b border-gray-100 last:border-0">
                                            <div className="w-2 h-2 bg-[#B30738] rounded-full mt-2 mr-3"></div>
                                            <div>
                                                <p className="font-medium">{item.event}</p>
                                                <p className="text-sm text-gray-500">{item.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <svg className="animate-spin h-8 w-8 text-[#B30738]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
}