"use client";
import { useRef, useEffect, useState } from "react";
import { toast } from "sonner";

type SystemData = {
    status: string;
    users: {
        total: number;
        active: number;
        newToday: number;
        premium: number;
        earlyAccess: number;
    };
    feedback: {
        total: number;
        burstMode: number;
    };
    performance: {
        responseTime: string;
        uptime: string;
        lastIncident: string;
    };
    lastUpdated: string;
};

export default function AdminDashboard() {
    const [adminKey, setAdminKey] = useState("IITMADRAS");
    const [authenticated, setAuthenticated] = useState(false);
    const [systemData, setSystemData] = useState<SystemData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const animationRef = useRef<number | undefined>(undefined);

    // Add loading state for data fetching
    const [dataLoading, setDataLoading] = useState(false);

    // Mock data for demonstration
    const mockSystemData: SystemData = {
        status: "healthy",
        users: {
            total: 12847,
            active: 3421,
            newToday: 127,
            premium: 2341,
            earlyAccess: 156
        },
        feedback: {
            total: 8934,
            burstMode: 234
        },
        performance: {
            responseTime: "142ms",
            uptime: "99.97%",
            lastIncident: "3 days ago"
        },
        lastUpdated: new Date().toLocaleString()
    };

    // Get admin key from environment variable (fallback to demo for Claude environment)
    const envKey = process.env.NEXT_PUBLIC_ADMIN_KEY || "IITMADRAS";
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.example.com";

    const verifyAdminKey = (key: string) => {
        setLoading(true);
        setError(null);

        setTimeout(() => {
            if (key === envKey) {
                setAuthenticated(true);
            } else {
                setError(`Invalid admin key. Expected key not matching.`);
            }
            setLoading(false);
        }, 800);
    };

    const fetchSystemData = async () => {
        setDataLoading(true);
        try {
            setError(null);

            // Try to fetch from real API first
            try {
                const response = await fetch(`${apiUrl}health`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${adminKey}`, // Include admin key in headers
                    },
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const data = await response.json();
                setSystemData(data);
                setDataLoading(false);
                return;
            } catch (apiError) {
                console.warn('API call failed, using mock data:', apiError);
                toast.error("Error while getting admin data");
            }
        } catch (err) {
            console.error('Failed to fetch system data:', err);
            setError("Failed to fetch system data. Please check your connection.");
            setSystemData(null);
        } finally {
            setDataLoading(false);
        }
    };

    // Fetch data when authenticated
    useEffect(() => {
        if (authenticated) {
            fetchSystemData();
            const interval = setInterval(fetchSystemData, 30000);
            return () => clearInterval(interval);
        }
    }, [authenticated]);

    // Smooth animation for cards
    useEffect(() => {
        if (authenticated && cardsRef.current.length > 0) {
            const animate = () => {
                const time = Date.now() * 0.001;
                cardsRef.current.forEach((card, index) => {
                    if (card) {
                        const delay = index * 0.15;
                        const offset = Math.sin(time + delay) * 3;
                        card.style.transform = `translateY(${offset}px)`;
                    }
                });
                animationRef.current = requestAnimationFrame(animate);
            };
            animate();
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [authenticated, systemData]);

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (cardsRef.current) {
            cardsRef.current[index] = el;
        }
    };

    const StatCard = ({
        index,
        title,
        value,
        icon,
        trend,
    }: {
        index: number;
        title: string;
        value: React.ReactNode;
        icon: React.ReactNode;
        trend?: string;
    }) => (
        <div
            ref={(el) => addToRefs(el, index)}
            className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{title}</p>
                    <p className="text-3xl font-bold mt-2 text-gray-900">{value}</p>
                    {trend && (
                        <p className={`text-sm mt-2 font-medium ${trend.startsWith("+") ? "text-green-600" : "text-red-600"
                            }`}>
                            {trend}
                        </p>
                    )}
                </div>
                <div className="p-3 bg-indigo-100 rounded-lg ml-4">
                    <span className="text-2xl">{icon}</span>
                </div>
            </div>
        </div>
    );

    const HealthIndicator = ({ status }: { status: string }) => {
        const getStatusColor = (status: string) => {
            switch (status.toLowerCase()) {
                case "healthy": return "bg-green-500";
                case "degraded": return "bg-yellow-500";
                case "down": return "bg-red-500";
                default: return "bg-gray-500";
            }
        };

        return (
            <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(status)} animate-pulse`} />
                <span className="capitalize font-medium text-gray-900">{status}</span>
            </div>
        );
    };

    if (!authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-200 max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🔐</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
                        <p className="text-gray-600">Enter your credentials to access the dashboard</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Admin Key
                            </label>
                            <input
                                type="password"
                                value={adminKey}
                                onChange={(e) => setAdminKey(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && adminKey.trim()) {
                                        verifyAdminKey(adminKey);
                                    }
                                }}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                placeholder="Enter admin key"
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        <button
                            onClick={() => verifyAdminKey(adminKey)}
                            disabled={loading || !adminKey.trim()}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Verifying...
                                </span>
                            ) : (
                                "Access Dashboard"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6 md:p-8">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white rounded-xl p-6 shadow-sm">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
                    <p className="text-gray-600">
                        {systemData?.lastUpdated ? `Last updated: ${systemData.lastUpdated}` : "Loading system data..."}
                    </p>
                </div>
                <div className="flex gap-3 mt-4 sm:mt-0">
                    <button
                        onClick={fetchSystemData}
                        disabled={dataLoading}
                        className="text-sm bg-indigo-100 hover:bg-indigo-200 disabled:bg-gray-300 text-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        {dataLoading ? (
                            <span className="flex items-center">
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-indigo-700 mr-1"></div>
                                Refreshing...
                            </span>
                        ) : (
                            "🔄 Refresh"
                        )}
                    </button>
                    <button
                        onClick={() => {
                            setAuthenticated(false);
                            setSystemData(null);
                            setError(null);
                        }}
                        className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {/* SYSTEM HEALTH */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">System Health</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        index={0}
                        title="Backend Status"
                        value={<HealthIndicator status={systemData?.status ?? "unknown"} />}
                        icon="🩺"
                    />
                    <StatCard
                        index={1}
                        title="Response Time"
                        value={systemData?.performance?.responseTime ?? "..."}
                        icon="⚡"
                    />
                    <StatCard
                        index={2}
                        title="Uptime"
                        value={systemData?.performance?.uptime ?? "..."}
                        icon="📈"
                    />
                </div>
            </section>

            {/* USER METRICS */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">User Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard
                        index={3}
                        title="Total Users"
                        value={systemData?.users?.total?.toLocaleString() ?? "..."}
                        icon="👥"
                    />
                    <StatCard
                        index={4}
                        title="Active Users"
                        value={systemData?.users?.active?.toLocaleString() ?? "..."}
                        icon="🟢"
                    />
                    <StatCard
                        index={5}
                        title="New Today"
                        value={systemData?.users?.newToday?.toLocaleString() ?? "..."}
                        trend={systemData?.users?.newToday ? `+${systemData.users.newToday}` : undefined}
                        icon="✨"
                    />
                    <StatCard
                        index={6}
                        title="Premium Users"
                        value={systemData?.users?.premium?.toLocaleString() ?? "..."}
                        icon="💎"
                    />
                    <StatCard
                        index={7}
                        title="Early Access"
                        value={systemData?.users?.earlyAccess?.toLocaleString() ?? "..."}
                        icon="🚀"
                    />
                </div>
            </section>

            {/* FEEDBACK METRICS */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">Feedback Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatCard
                        index={8}
                        title="Total Feedback"
                        value={systemData?.feedback?.total?.toLocaleString() ?? "..."}
                        icon="💬"
                    />
                    <StatCard
                        index={9}
                        title="Burst Feedback"
                        value={systemData?.feedback?.burstMode?.toLocaleString() ?? "..."}
                        icon="🔥"
                    />
                </div>
            </section>
        </div>
    );
}