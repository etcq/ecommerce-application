import PasswordForm from '@/components/form/user/password/Password';
import styles from './password.module.scss';

export default function PasswordPage(): React.JSX.Element {
  return (
    <div className={styles.wrapper}>
      <PasswordForm />
    </div>
  );
}
