import styles from './registration.module.scss';
import React from 'react';
import RegistrationForm from '@/components/form/registration/Registration';

function RegistrationPage(): React.JSX.Element {
  return (
    <div className={styles.container}>
      <RegistrationForm />
    </div>
  );
}

export default RegistrationPage;
