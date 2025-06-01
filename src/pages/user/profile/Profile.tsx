import UserForm from '@/components/form/user/User';
import styles from './profile.module.scss';

export default function ProfilePage(): React.JSX.Element {
  return (
    <div className={styles.wrapper}>
      <UserForm />
    </div>
  );
}
