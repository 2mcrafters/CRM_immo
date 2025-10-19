import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { t } from '../../lib/i18n';
import { api } from '../../lib/api';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { showToast } from '../ui/Toast';
import { Can } from '../permissions/Can';
import {
  UserPlusIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';

const roleColors = {
  administrateur: 'red',
  juridique: 'blue',
  comptable: 'green',
  technique: 'orange',
  commercial: 'purple',
  manager: 'gray',
};

export const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      showToast('Erreur lors du chargement des utilisateurs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await api.get('/roles');
      setRoles(response.data.roles || []);
    } catch (error) {
      console.error('Erreur lors du chargement des rôles:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await api.post('/users', formData);
      showToast('Utilisateur créé avec succès', 'success');
      setIsCreateModalOpen(false);
      resetForm();
      fetchUsers();
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la création';
      showToast(message, 'error');
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/users/${selectedUser.id}`, formData);
      showToast('Utilisateur modifié avec succès', 'success');
      setIsEditModalOpen(false);
      resetForm();
      fetchUsers();
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la modification';
      showToast(message, 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/users/${selectedUser.id}`);
      showToast('Utilisateur supprimé avec succès', 'success');
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la suppression';
      showToast(message, 'error');
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.roles[0] || '',
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: '',
    });
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('users.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('users.description')}
          </p>
        </div>
        <Can permission="users.create">
          <Button
            variant="primary"
            icon={UserPlusIcon}
            onClick={() => setIsCreateModalOpen(true)}
          >
            {t('users.create')}
          </Button>
        </Can>
      </div>

      {/* Search */}
      <Card className="p-4">
        <Input
          type="text"
          placeholder={t('users.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={MagnifyingGlassIcon}
        />
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('users.name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('users.email')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('users.role')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('users.created')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('common.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence mode="popLayout">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.roles && user.roles.length > 0 && (
                        <Badge
                          variant={roleColors[user.roles[0]] || 'gray'}
                          size="sm"
                        >
                          {user.roles[0]}
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {new Date(user.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Can permission="users.edit">
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={PencilSquareIcon}
                            onClick={() => openEditModal(user)}
                          >
                            {t('common.edit')}
                          </Button>
                        </Can>
                        <Can permission="users.delete">
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={TrashIcon}
                            onClick={() => openDeleteModal(user)}
                          >
                            {t('common.delete')}
                          </Button>
                        </Can>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && !loading && (
          <div className="text-center py-12">
            <ShieldCheckIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('users.noUsers')}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {t('users.noUsersDescription')}
            </p>
          </div>
        )}
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetForm();
        }}
        title={t('users.createUser')}
        icon={UserPlusIcon}
      >
        <div className="space-y-4">
          <Input
            label={t('users.name')}
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label={t('users.email')}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label={t('users.password')}
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('users.role')}
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">{t('users.selectRole')}</option>
              {roles.map((role) => (
                <option key={role.name} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => {
                setIsCreateModalOpen(false);
                resetForm();
              }}
              className="flex-1"
            >
              {t('common.cancel')}
            </Button>
            <Button
              variant="primary"
              onClick={handleCreate}
              className="flex-1"
            >
              {t('common.create')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetForm();
        }}
        title={t('users.editUser')}
        icon={PencilSquareIcon}
      >
        <div className="space-y-4">
          <Input
            label={t('users.name')}
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label={t('users.email')}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label={t('users.newPassword')}
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder={t('users.leaveEmptyPassword')}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('users.role')}
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">{t('users.selectRole')}</option>
              {roles.map((role) => (
                <option key={role.name} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => {
                setIsEditModalOpen(false);
                resetForm();
              }}
              className="flex-1"
            >
              {t('common.cancel')}
            </Button>
            <Button
              variant="primary"
              onClick={handleUpdate}
              className="flex-1"
            >
              {t('common.save')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        title={t('users.deleteUser')}
        icon={TrashIcon}
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            {t('users.deleteConfirmation', { name: selectedUser?.name })}
          </p>
          <div className="flex gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedUser(null);
              }}
              className="flex-1"
            >
              {t('common.cancel')}
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              className="flex-1"
            >
              {t('common.delete')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
