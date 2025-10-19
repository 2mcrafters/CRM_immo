import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../lib/api';

/**
 * Hook pour gérer les permissions de l'utilisateur
 */
export const usePermissions = () => {
  const { user } = useSelector((state) => state.auth);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!user) {
        setPermissions([]);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/my-permissions');
        setPermissions(response.data.permissions || []);
      } catch (error) {
        console.error('Erreur lors du chargement des permissions:', error);
        setPermissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [user]);

  /**
   * Vérifie si l'utilisateur a une permission spécifique
   */
  const can = (permission) => {
    return permissions.includes(permission);
  };

  /**
   * Vérifie si l'utilisateur a toutes les permissions données
   */
  const canAll = (requiredPermissions) => {
    return requiredPermissions.every((permission) => permissions.includes(permission));
  };

  /**
   * Vérifie si l'utilisateur a au moins une des permissions données
   */
  const canAny = (requiredPermissions) => {
    return requiredPermissions.some((permission) => permissions.includes(permission));
  };

  return {
    permissions,
    loading,
    can,
    canAll,
    canAny,
  };
};

/**
 * Hook pour obtenir le rôle de l'utilisateur
 */
export const useRole = () => {
  const { user } = useSelector((state) => state.auth);
  
  const role = user?.role || null;
  
  const is = (roleName) => {
    return role === roleName;
  };

  return {
    role,
    is,
  };
};
