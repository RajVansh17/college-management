import { motion } from 'framer-motion'
import { Users, Calendar, TrendingUp, Activity } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import GlassCard from '@/components/GlassCard'
import StatCard from '@/components/StatCard'

const lineData = [
  { name: 'Jan', events: 12, members: 240 },
  { name: 'Feb', events: 18, members: 310 },
  { name: 'Mar', events: 15, members: 380 },
  { name: 'Apr', events: 22, members: 420 },
  { name: 'May', events: 28, members: 510 },
  { name: 'Jun', events: 24, members: 580 },
]

const pieData = [
  { name: 'Tech', value: 35, color: '#00f5ff' },
  { name: 'Cultural', value: 25, color: '#a855f7' },
  { name: 'Sports', value: 20, color: '#22c55e' },
  { name: 'Literary', value: 12, color: '#f59e0b' },
  { name: 'Other', value: 8, color: '#64748b' },
]

const recentActivity = [
  { id: 1, text: 'Tech Society added new event "HackNight"', time: '2m ago' },
  { id: 2, text: 'Cultural Fest registration opened', time: '15m ago' },
  { id: 3, text: 'Sports Society reached 100 members', time: '1h ago' },
  { id: 4, text: 'Literary Club published new blog', time: '2h ago' },
]

const upcomingEvents = [
  { id: 1, title: 'HackNight', society: 'Tech Society', date: 'Feb 18, 6:00 PM' },
  { id: 2, title: 'Cultural Fest', society: 'Cultural', date: 'Feb 22, 4:00 PM' },
  { id: 3, title: 'Football Finals', society: 'Sports', date: 'Feb 25, 3:00 PM' },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
          Dashboard
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Overview of your society management
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Societies"
          value={24}
          icon={Users}
          trend={{ value: 12, up: true }}
          delay={0}
        />
        <StatCard
          title="Upcoming Events"
          value={18}
          icon={Calendar}
          trend={{ value: 8, up: true }}
          delay={1}
        />
        <StatCard
          title="Total Members"
          value={1240}
          icon={TrendingUp}
          trend={{ value: 5, up: true }}
          delay={2}
        />
        <StatCard
          title="Active This Week"
          value={89}
          suffix="%"
          icon={Activity}
          delay={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Activity Overview
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="name" className="text-xs" stroke="currentColor" />
                <YAxis className="text-xs" stroke="currentColor" />
                <Tooltip
                  contentStyle={{
                    borderRadius: '1rem',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.95)',
                  }}
                  labelStyle={{ color: '#0f172a' }}
                />
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="#00f5ff"
                  strokeWidth={2}
                  dot={{ fill: '#00f5ff', strokeWidth: 0 }}
                  name="Events"
                />
                <Line
                  type="monotone"
                  dataKey="members"
                  stroke="#a855f7"
                  strokeWidth={2}
                  dot={{ fill: '#a855f7', strokeWidth: 0 }}
                  name="Members"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Society Distribution
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '1rem',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.95)',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-neon-cyan" />
            Recent Activity
          </h2>
          <ul className="space-y-3">
            {recentActivity.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start justify-between gap-4 py-2 border-b border-white/10 dark:border-white/5 last:border-0"
              >
                <span className="text-sm text-slate-700 dark:text-slate-300">{item.text}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">
                  {item.time}
                </span>
              </motion.li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-neon-purple" />
            Upcoming Events
          </h2>
          <ul className="space-y-3">
            {upcomingEvents.map((event, i) => (
              <motion.li
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between gap-4 py-3 px-4 rounded-2xl bg-white/5 dark:bg-black/5 hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
              >
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">{event.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {event.society} · {event.date}
                  </p>
                </div>
                <span className="text-xs font-medium text-neon-cyan bg-neon-cyan/10 dark:bg-neon-cyan/20 px-3 py-1 rounded-full">
                  Soon
                </span>
              </motion.li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  )
}
