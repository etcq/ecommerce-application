import style from './about-us.module.scss';
import { JSX } from 'react';
import TeamMember from '@components/team-member/TeamMember.tsx';
import { ITeamMemberProps } from '@/interfaces/interfaces.ts';

const Anton: ITeamMemberProps = {
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

const Siarhei: ITeamMemberProps = {
  name: 'Siarhei Buiko',
  role: 'CommerceToolsGod',
  github: 'https://github.com/aqafresca',
  contribution: 'setup commerce tools api, login page, product list page, login page, testing',
  bio: 'Live in Belarus',
};

const Artur: ITeamMemberProps = {
  name: 'Artur Bazaluk',
  role: 'DesignNinja',
  github: 'https://github.com/turik777',
  contribution: 'App design, testing, registration page, cart page, profile page, basic UI components',
  bio: 'Live in Moscow',
};

export default function AboutPage(): JSX.Element {
  return (
    <div className={style.about}>
      <h2 className={style.about__header}>const team = new Team();</h2>
      <div className={style.about__members}>
        <TeamMember {...Anton}>
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
        <TeamMember {...Siarhei}>
          <pre className={style['team-member__content']}>
            {`neeeedMoreeeeSneakers() {
    const superParse = parse all sneakers commerce apps in WWW;
    
    return mindStorm;
  }
scrumAttack() {
    let kanbanItem = ...;
    return Kanban.push(kanbanItem);
  }`}
          </pre>
        </TeamMember>
        <TeamMember {...Artur}>
          <pre className={style['team-member__content']}>
            {`silentCheck( crossCheckApps ) {
    crossCheckApps.forEach(app => {
      Check the work sent for cross-checking when the whole team is asleep.
    }
    return Evaluations;
  }
youngQA() {
  
{
  }`}
          </pre>
        </TeamMember>
      </div>
    </div>
  );
}
