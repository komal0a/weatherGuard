import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { User } from "./types/user";
import UserCard from "./components/UserCard";

import StatCard from "./components/StatCard";
import toast from "react-hot-toast";
import { useApi } from "./hooks/useApi";
import { CloudSun } from "lucide-react";
import { motion } from "framer-motion";
import { Clock3, CheckCircle2 } from "lucide-react";

function Dashboard() {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [approvedCount, setApprovedCount] = useState(0);

  const isAdmin = currentUser?.role === "admin";
  const authApi = useApi();
  async function loadPending() {
    const pendingRes = await authApi.get("/users/pending");

    setPendingUsers(pendingRes.data);

    const approvedRes = await authApi.get("/users/approved-count");

    setApprovedCount(approvedRes.data.count);
  }

  async function loadCurrentUser() {
    try {
      const res = await authApi.get(`/users/me/${user?.id}`);
      setCurrentUser(res.data);
    } finally {
      setLoadingUser(false);
    }
  }

  async function requestAccess() {
    await authApi.post(`/users/request-access`, {
      clerkId: user?.id,
      name: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
    });

    toast.success("Request submitted successfully!");
  }

  async function approve(id: string) {
    await authApi.patch(`/users/approve/${id}`);

    toast.success("User approved!");

    await loadPending();
  }

  useEffect(() => {
    if (!user) return;

    loadCurrentUser();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      loadPending();
    }
  }, [isAdmin]);
  if (loadingUser) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center text-white">
        <div className="text-center">
          <CloudSun className="w-12 h-12 mx-auto mb-4 animate-pulse text-sky-400" />
          <p className="text-slate-400">Loading WeatherGuard...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-extrabold">WeatherGuard</h1>

            <p className="text-slate-400 mt-2">
              Welcome back, {user?.firstName}
            </p>

            <p className="text-slate-500 text-sm mt-1">
              Secure Weather Alert Dashboard
            </p>
          </div>

          <UserButton />
        </div>

        {!isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl w-full bg-slate-900/70 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-10 text-center">
            <h2 className="text-3xl font-bold mb-2">
              Welcome {user?.firstName}
            </h2>
            <p className="text-slate-400 mb-8">
              Request access to WeatherGuard and connect your Telegram account
              to receive automated weather alerts.
            </p>
            <button
              onClick={requestAccess}
              className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-xl font-semibold">
              Request Access
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://t.me/weatherguard_komal_bot?start=${user?.id}`,
                  "_blank",
                )
              }
              className="ml-4 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold">
              Connect Telegram
            </button>
          </motion.div>
        )}

        {isAdmin && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">Admin Dashboard</h2>

                <p className="text-slate-400 mt-1">
                  Manage user access and monitor WeatherGuard.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <StatCard
                title="Pending Users"
                value={pendingUsers.length}
                icon={<Clock3 size={42} />}
              />

              <StatCard
                title="Approved Users"
                value={approvedCount}
                icon={<CheckCircle2 size={42} />}
              />
            </div>

            {pendingUsers.length === 0 ? (
              <div className="bg-slate-800/70 backdrop-blur-lg rounded-2xl p-12 border border-slate-700 text-center">
                <CheckCircle2
                  size={60}
                  className="mx-auto text-green-500 mb-4"
                />

                <h3 className="text-2xl font-semibold">All caught up!</h3>

                <p className="text-slate-400 mt-2">
                  There are no pending approval requests.
                </p>
                <p className="text-slate-500 text-sm mt-4">
                  New access requests will appear here automatically.
                </p>
              </div>
            ) : (
              pendingUsers.map((u) => (
                <UserCard key={u._id} user={u} onApprove={approve} />
              ))
            )}
          </div>
        )}
      </div>
      <footer className="mt-16 text-center text-slate-500 text-sm">
        WeatherGuard • Built with React, NestJS, MongoDB & Telegram Bot API
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <SignedOut>
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-6">
          <div className="max-w-xl w-full bg-slate-900/70 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-10 text-center">
            <div className="flex flex-col items-center mb-6">
              <CloudSun className="w-12 h-12 text-sky-400 mb-4" />

              <h1 className="text-5xl font-extrabold text-slate-200">
                WeatherGuard
              </h1>
            </div>

            <p className="text-slate-400 mt-4 text-lg">
              Secure weather alerts delivered to Telegram after administrator
              approval.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8 mb-10">
              <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-sm">
                Telegram Alerts
              </span>

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm">
                Admin Approval
              </span>

              <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm">
                Live Weather
              </span>
            </div>
            <div className="mt-10">
              <SignInButton mode="modal">
                <button className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-xl text-lg font-semibold">
                  Sign in to Continue
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <Dashboard />
      </SignedIn>
    </div>
  );
}
