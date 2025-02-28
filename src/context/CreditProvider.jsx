import { useEffect, useState } from 'react';
import { getProfile } from '../api/profileApi';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';
import { CreditsContext } from './CreditContext';

// Ensure that credits gets updated everywhere
export const CreditsProvider = ({ children }) => {
  const { user } = useAuth();
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    if (user) {
      const fetchCredits = async () => {
        try {
          const profileData = await getProfile(user.name);
          setCredits(profileData.credits);
        } catch (error) {
          console.error('Failed to fetch credits:', error);
        }
      };
      fetchCredits();
    }
  }, [user]);

  return (
    <CreditsContext.Provider value={{ credits, setCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};

CreditsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
