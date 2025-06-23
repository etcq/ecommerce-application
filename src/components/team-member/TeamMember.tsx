import { JSX } from 'react';
import { FaGithub } from 'react-icons/fa6';
import style from './teamMember.module.scss';
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
        <p className={style['team-member__content-item']}>
          <b className={style['team-member__var']}>name</b>: {name}
        </p>
        <p className={style['team-member__content-item']}>
          <b className={style['team-member__var']}>github</b>:{' '}
          <a className={style['team-member__github']} href={github} target="_blank" rel="noopener noreferrer">
            <FaGithub />
            <span>{github.slice(github.lastIndexOf('/') + 1)}</span>
          </a>
        </p>
        <p className={style['team-member__content-item']}>
          <b className={style['team-member__var']}>contribution</b>: [{contribution}]
        </p>
        {bio.split('\n').map((line, i) => {
          if (i === 0) {
            return (
              <p className={style['team-member__content-item']} key={`line-${i + 1}`}>
                <b className={style['team-member__var']}>bio</b>: {line}
              </p>
            );
          }
          return (
            <p className={style['team-member__content-item']} key={`line-${i + 1}`}>
              {line}
            </p>
          );
        })}

        {children}
        <h3 className={style['team-member__role']}>{`}`}</h3>
      </div>
    </div>
  );
}
