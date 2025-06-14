import { JSX } from 'react';
import { FaGithub } from 'react-icons/fa6';
import style from './team-member.module.scss';
import { ITeamMemberProps } from '@/interfaces/interfaces.ts';

export default function TeamMember({ name, role, github, contribution, bio, children }: ITeamMemberProps): JSX.Element {
  return (
    <div className={style['team-member']}>
      <div className={style['team-member__header']}>
        <img src={`${github}.png?size=50`} alt={`${name} github avatar`} />
        {name}
      </div>

      <div className={style['team-member__content']}>
        <h3 className={style['team-member__role']}>{`team.${role} = {`}</h3>
        <p className={style['team-member__content-item']}>name: {name}</p>
        <p className={style['team-member__content-item']}>
          github:{' '}
          <a className={style['team-member__github']} href={github} target="_blank" rel="noopener noreferrer">
            <FaGithub />
            <span>{github.slice(github.lastIndexOf('/') + 1)}</span>
          </a>
        </p>
        <p className={style['team-member__content-item']}>contribution: [{contribution}]</p>
        <p className={style['team-member__content-item']}>bio: {bio}</p>
        {children}
        <h3 className={style['team-member__role']}>{`}`}</h3>
      </div>
    </div>
  );
}
