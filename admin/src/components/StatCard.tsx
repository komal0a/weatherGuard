import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 shadow-lg hover:border-sky-500 transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400">{title}</p>

          <h2 className="text-5xl font-bold mt-3 text-sky-400">{value}</h2>
        </div>

        <div className="text-sky-400">{icon}</div>
      </div>
    </div>
  );
}
