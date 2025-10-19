import { useSelector } from 'react-redux';
import { usePermissions } from '../../hooks/usePermissions';

/**
 * Composant pour le rendu conditionnel basé sur les permissions
 * 
 * @example
 * <Can permission="users.create">
 *   <Button>Créer un utilisateur</Button>
 * </Can>
 * 
 * @example
 * <Can permissions={['users.view', 'users.edit']} requireAll>
 *   <Button>Modifier</Button>
 * </Can>
 */
export const Can = ({ 
  permission, 
  permissions, 
  requireAll = false, 
  children, 
  fallback = null 
}) => {
  const { can, canAll, canAny, loading } = usePermissions();

  if (loading) {
    return fallback;
  }

  let hasPermission = false;

  if (permission) {
    hasPermission = can(permission);
  } else if (permissions) {
    hasPermission = requireAll ? canAll(permissions) : canAny(permissions);
  }

  return hasPermission ? children : fallback;
};

/**
 * Composant pour le rendu conditionnel basé sur les rôles
 * 
 * @example
 * <HasRole role="administrateur">
 *   <AdminPanel />
 * </HasRole>
 */
export const HasRole = ({ role, children, fallback = null }) => {
  const { user } = useSelector((state) => state.auth);
  
  const hasRole = user?.role === role;

  return hasRole ? children : fallback;
};
