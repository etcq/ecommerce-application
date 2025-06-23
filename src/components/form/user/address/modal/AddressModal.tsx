import React from 'react';
import styles from './addressModal.module.scss';
import Button from '@/components/button/Button';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
  hasErrors?: boolean;
  title?: string;
  buttonText?: string;
}

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  onSave,
  children,
  hasErrors,
  title = 'Edit Address',
  buttonText = 'Save',
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>
          <Button onClick={onSave} disabled={hasErrors} size="medium">
            {buttonText}
          </Button>
          <Button onClick={onClose} size="medium">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
