import React from 'react'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'
import { t } from '../../lib/i18n'

export default function Dashboard({ user }) {
  const stats = [
    {
      label: t('dashboard.totalClients'),
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      label: t('dashboard.totalProperties'),
      value: '856',
      change: '+8%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      label: t('dashboard.activeRentals'),
      value: '634',
      change: '+5%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: 'from-green-600 to-emerald-600',
    },
    {
      label: t('dashboard.monthlyRevenue'),
      value: '124,500€',
      change: '+15%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-yellow-600 to-orange-600',
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'client',
      title: 'Nouveau client ajouté',
      description: 'Marie Martin a été ajoutée au système',
      time: 'Il y a 5 minutes',
      avatar: 'MM',
    },
    {
      id: 2,
      type: 'property',
      title: 'Propriété mise à jour',
      description: 'Appartement 3 pièces - 75 m² - Paris 15ème',
      time: 'Il y a 1 heure',
      avatar: null,
    },
    {
      id: 3,
      type: 'rental',
      title: 'Nouveau bail signé',
      description: 'Contrat de location pour M. Dubois',
      time: 'Il y a 3 heures',
      avatar: 'PD',
    },
    {
      id: 4,
      type: 'payment',
      title: 'Paiement reçu',
      description: 'Loyer de décembre - 1,250€',
      time: 'Il y a 5 heures',
      avatar: null,
    },
  ]

  const quickActions = [
    {
      title: t('clients.add'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      variant: 'primary',
    },
    {
      title: t('properties.add'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      variant: 'secondary',
    },
    {
      title: t('rentals.add'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      variant: 'success',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('dashboard.welcome')}, {user?.name || 'Utilisateur'} 👋
          </h1>
          <p className="text-slate-400">
            {t('dashboard.overview')}
          </p>
        </div>
        <Badge variant="success" dot>
          En ligne
        </Badge>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover gradient className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <Badge variant={stat.trend === 'up' ? 'success' : 'danger'} size="sm">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {t('dashboard.recentActivity')}
              </h2>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                {t('dashboard.viewAll')}
              </button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
                >
                  <Avatar
                    name={activity.avatar || activity.title}
                    size="md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium mb-1">{activity.title}</p>
                    <p className="text-slate-400 text-sm mb-2 truncate">{activity.description}</p>
                    <p className="text-slate-500 text-xs">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              {t('dashboard.quickActions')}
            </h2>

            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 hover:from-blue-600 hover:to-cyan-600 text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  {action.icon}
                  <span className="font-medium">{action.title}</span>
                </motion.button>
              ))}
            </div>

            {/* Chart placeholder */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-slate-400 mb-4">
                Évolution ce mois
              </h3>
              <div className="h-32 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 p-4 flex items-end justify-between gap-2">
                {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                    className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t"
                  />
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
