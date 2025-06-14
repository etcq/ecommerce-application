import style from './about-us.module.scss';
import { JSX } from 'react';
import TeamMember from '@components/team-member/TeamMember.tsx';
import { ITeamMemberProps } from '@/interfaces/interfaces.ts';

const data: ITeamMemberProps = {
  name: 'Anton Sushnikov',
  role: 'lead',
  github: 'https://github.com/etcq',
  contribution: 'header, main page, footer, detailed product page, product card',
  bio:
    'I live in Yekaterinburg (Ural, Russia) and currently work in the electric power industry. I was\n' +
    'introduced to programming during my student years but only recently decided to return to it seriously. What I\n' +
    'love about programming is its endless learning curve—there’s always room to grow. In 2024, I joined RSSchool\n' +
    '(Stage 0) to build a structured path in web development. Next goals: advanced React (e.g., Redux/RTK) and\n' +
    'FullStack development with Node.js.',
};

export default function AboutPage(): JSX.Element {
  return (
    <div className={style.about}>
      <h2 className={style.about__header}>const team = new Team();</h2>
      <div className={style.about__members}>
        <TeamMember {...data}>
          <pre className={style['team-member__content']}>
            {`massiveCall( GoogleMeet ) {
    const call = new GoogleMeet();
    call.join(Artur, Sergei, Aleksey);
    return mindStorm;
  }
  scrumAttack() {
    let kanbanItem = ...;
    return Kanban.push(kanbanItem);
  }`}
          </pre>
        </TeamMember>
        <TeamMember {...data}>
          <pre className={style['team-member__content']}>
            {`massiveCall( GoogleMeet ) {
    const call = new GoogleMeet();
    call.join(Artur, Sergei, Aleksey);
    return mindStorm;
  }
  scrumAttack() {
    let kanbanItem = ...;
    return Kanban.push(kanbanItem);
  }`}
          </pre>
        </TeamMember>
      </div>
    </div>
  );
}
