import { JSX } from 'react';
import { FaGithub } from 'react-icons/fa6';
import style from './team-member.module.scss';
import { ITeamMemberProps } from '@/interfaces/interfaces.ts';

export default function TeamMember({ name, role, github, contribution, bio, children }: ITeamMemberProps): JSX.Element {
  return (
    <div className={style['team-member']}>
      <h3 className={style['team-member__header']}>{`team.${role} = {`}</h3>
      <p className={style['team-member__content']}>name: {name}</p>
      <p className={style['team-member__content']}>
        github:{' '}
        <a className={style['team-member__github']} href={github} target="_blank" rel="noopener noreferrer">
          <FaGithub />
          <span>{github.slice(github.lastIndexOf('/'))}</span>
        </a>
      </p>
      <p className={style['team-member__content']}>contribution: [{contribution}]</p>
      <p className={style['team-member__content']}>bio: {bio}</p>
      {children}
      <h3 className={style['team-member__header']}>{`}`}</h3>
    </div>
  );
}
