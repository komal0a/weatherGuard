import type { User } from "../types/user";

interface UserCardProps {
  user: User;
  onApprove: (id: string) => void;
}

export default function UserCard({ user, onApprove }: UserCardProps) {
  return (
    <div className="flex justify-between items-center bg-slate-800/70 backdrop-blur-lg rounded-2xl p-5 mb-4 border border-slate-700 shadow-lg hover:border-sky-500 transition">
      <div>
        <h3 className="text-lg font-semibold">{user.name}</h3>

        <p className="text-slate-400">{user.email}</p>

        <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-sky-500/20 text-sky-300">
          {user.status}
        </span>
      </div>

      <button
        onClick={() => onApprove(user._id)}
        className="bg-emerald-600 hover:bg-emerald-700 transition px-5 py-2 rounded-xl font-medium">
        Approve
      </button>
    </div>
  );
}
