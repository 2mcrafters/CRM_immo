import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'
import Modal from '../ui/Modal'
import EmptyState from '../ui/EmptyState'
import { TableSkeleton } from '../ui/Skeleton'
import { t } from '../../lib/i18n'
import { fetchClients, createClient, updateClient, deleteClient } from '../../features/clients/clientsSlice'

export default function ClientsPage() {
  const dispatch = useDispatch()
  const { clients, status, error } = useSelector((state) => state.clients)

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingClient, setEditingClient] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    statut: 'actif',
    adresse_ligne1: '',
    adresse_ligne2: '',
    ville: '',
    code_postal: '',
    pays: 'France',
    role: '',
  })

  useEffect(() => {
    dispatch(fetchClients())
  }, [dispatch])

  const filteredClients = (clients || []).filter(client => {
    const matchesSearch = 
      client.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || client.statut === filterStatus

    return matchesSearch && matchesStatus
  })

  const handleAdd = () => {
    setEditingClient(null)
    setFormData({
      name: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      statut: 'actif',
      adresse_ligne1: '',
      adresse_ligne2: '',
      ville: '',
      code_postal: '',
      pays: 'France',
      role: '',
    })
    setShowModal(true)
  }

  const handleEdit = (client) => {
    setEditingClient(client)
    setFormData({
      name: client.name || '',
      nom: client.nom || '',
      prenom: client.prenom || '',
      email: client.email || '',
      telephone: client.telephone || '',
      statut: client.statut || 'actif',
      adresse_ligne1: client.adresse_ligne1 || '',
      adresse_ligne2: client.adresse_ligne2 || '',
      ville: client.ville || '',
      code_postal: client.code_postal || '',
      pays: client.pays || 'France',
      role: client.role || '',
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    try {
      if (editingClient) {
        await dispatch(updateClient({ id: editingClient.id, data: formData })).unwrap()
      } else {
        await dispatch(createClient(formData)).unwrap()
      }
      setShowModal(false)
      dispatch(fetchClients())
    } catch (err) {
      console.error('Erreur lors de la sauvegarde du client:', err)
    }
  }

  const handleDelete = async (id) => {
    if (confirm(t('messages.deleteConfirm'))) {
      try {
        await dispatch(deleteClient(id)).unwrap()
        dispatch(fetchClients())
      } catch (err) {
        console.error('Erreur lors de la suppression du client:', err)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('clients.title')}
          </h1>
          <p className="text-slate-400">
            {filteredClients.length} {t('common.results')}
          </p>
        </div>
        <Button onClick={handleAdd} size="lg" leftIcon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        }>
          {t('clients.add')}
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder={t('clients.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
            </div>
            <div className="flex gap-2">
              {['all', 'actif', 'inactif'].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'primary' : 'outline'}
                  onClick={() => setFilterStatus(status)}
                  size="md"
                >
                  {status === 'all' ? 'Tous' : status === 'actif' ? 'Actifs' : 'Inactifs'}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="overflow-hidden">
          {status === 'loading' ? (
            <div className="p-6">
              <TableSkeleton rows={5} />
            </div>
          ) : filteredClients.length === 0 ? (
            <EmptyState
              title="Aucun client trouvé"
              description={searchTerm ? "Essayez de modifier votre recherche" : "Commencez par ajouter votre premier client"}
              action={searchTerm ? null : handleAdd}
              actionLabel={searchTerm ? null : t('clients.add')}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50 border-b border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Ville
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Date création
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  <AnimatePresence>
                    {filteredClients.map((client, index) => (
                      <motion.tr
                        key={client.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <Avatar name={`${client.prenom} ${client.nom}`} size="md" />
                            <div>
                              <p className="text-white font-medium">
                                {client.prenom} {client.nom}
                              </p>
                              <p className="text-slate-400 text-sm">{client.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-slate-300">{client.telephone}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-slate-300">{client.ville}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={client.statut === 'actif' ? 'success' : 'default'}>
                            {client.statut === 'actif' ? 'Actif' : 'Inactif'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-sm">
                          {new Date(client.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(client)}
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(client.id)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingClient ? t('clients.edit') : t('clients.add')}
        size="lg"
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Nom complet / Identifiant */}
          <Input
            label="Nom complet / Identifiant"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Sophie Martin"
          />

          {/* Prénom et Nom */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('clients.firstName')}
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              placeholder="Sophie"
              required
            />
            <Input
              label={t('clients.lastName')}
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              placeholder="Martin"
              required
            />
          </div>

          {/* Email et Téléphone */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('auth.email')}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="sophie.martin@email.fr"
            />
            <Input
              label={t('clients.phone')}
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              placeholder="06 12 34 56 78"
              required
            />
          </div>

          {/* Statut et Rôle */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Statut
              </label>
              <select
                value={formData.statut}
                onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="actif">Actif</option>
                <option value="prospect">Prospect</option>
                <option value="inactif">Inactif</option>
              </select>
            </div>
            <Input
              label="Rôle"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Particulier, Investisseur..."
            />
          </div>

          {/* Adresses */}
          <Input
            label="Adresse ligne 1"
            value={formData.adresse_ligne1}
            onChange={(e) => setFormData({ ...formData, adresse_ligne1: e.target.value })}
            placeholder="123 Rue de la République"
          />
          <Input
            label="Adresse ligne 2"
            value={formData.adresse_ligne2}
            onChange={(e) => setFormData({ ...formData, adresse_ligne2: e.target.value })}
            placeholder="Appartement 4B, Bâtiment C"
          />

          {/* Ville, Code postal, Pays */}
          <div className="grid grid-cols-3 gap-4">
            <Input
              label={t('clients.city')}
              value={formData.ville}
              onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
              placeholder="Paris"
            />
            <Input
              label="Code postal"
              value={formData.code_postal}
              onChange={(e) => setFormData({ ...formData, code_postal: e.target.value })}
              placeholder="75001"
            />
            <Input
              label="Pays"
              value={formData.pays}
              onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
              placeholder="France"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSave} loading={status === 'loading'}>
              {t('common.save')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
