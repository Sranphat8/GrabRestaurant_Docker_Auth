import React from 'react';
import { useAuthContext } from '../context/AuthContext';

const Card = ({ restaurant, onDelete, onEdit }) => {
  const { hasAuthority } = useAuth();
  
  // Check user authorities to conditionally show buttons
  const canDelete = hasAuthority('ROLE_ADMIN');
  const canEdit = hasAuthority('ROLE_MODERATOR');
  
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={restaurant.imageUrl} alt={restaurant.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {restaurant.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{restaurant.type}</p>
        <div className="card-actions justify-end">
          {/* Admin can delete */}
          {canDelete && (
            <button
              onClick={() => onDelete(restaurant.id)}
              className="btn btn-error"
            >
              Delete
            </button>
          )}
          {/* Moderator can edit */}
          {canEdit && (
            <button onClick={() => onEdit(restaurant)} className="btn btn-warning">
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;