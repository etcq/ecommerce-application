import style from './about-us.module.scss';
import memberStyle from '@components/team-member/team-member.module.scss';
import { JSX } from 'react';
import TeamMember from '@components/team-member/TeamMember.tsx';
import { ITeamMemberProps } from '@/interfaces/interfaces.ts';
import logoImg from '@assets/images/about-us/Rsschool.png';

const Anton: ITeamMemberProps = {
  name: 'Anton Sushnikov',
  role: 'lead',
  github: 'https://github.com/etcq',
  contribution: 'header, main page, footer, detailed product page, product card, scrum-master, about us page',
  bio: `I live in Yekaterinburg, Russia, and currently work in the electric power industry. While I was a student, I became interested in programming, but it was only recently that I decided to take it seriously. What I love about programming is the endless learning process - there is always something new to learn, interesting challenges, and the feeling of accomplishment when you finally solve a problem after putting in a lot of effort.\n
    In 2024, I enrolled in RS School (Stage 0) to create a structured path for my web development skills. My goals are to master React (with all its supporting libraries) and to become proficient in Full Stack development using Node.js and databases.`,
};

const Siarhei: ITeamMemberProps = {
  name: 'Sergei Buiko',
  role: 'CommerceToolsGod',
  github: 'https://github.com/aqafresca',
  contribution: 'setup commerce tools api, product list page, login page, testing',
  bio: `I’m Sergey, a Junior Frontend Developer. My journey started in a very different place—a world of physical education and logistics, but led me to something I’ve always been passionate about: technology.
  My background gave me important skills: discipline, organization, problem-solving. But there was always this spark inside me, this passion for technology. I knew that one day I would take that leap and it happened around one year ago when I joined RS School.
  Let's fast forward to today — I'm about to complete my frontend development course. I've learned how to write code in HTML, CSS, JavaScript, and TypeScript. After joining a team of like-minded enthusiasts, we weren't afraid to take on the challenge and built this final project using React. I'm incredibly proud of my team and of the knowledge and skills I've gained through the RS School program.
  For me now, coding is like solving puzzles—it’s challenging, but every solved problem brings satisfaction. As I’m focusing on frontend development, it lets me blend creativity with technology, transforming designs into interactive, real-world experiences. I also love the instant feedback of seeing how code directly affects what users see and interact with.`,
};

const Artur: ITeamMemberProps = {
  name: 'Artur Bazaluk',
  role: 'DesignNinja',
  github: 'https://github.com/turik777',
  contribution: 'App design, testing, registration page, cart page, profile page, basic UI components',
  bio: "Hi there! I'm Artur and about two years ago, I started learning frontend development on my own. What began as a personal challenge quickly turned into a passion. I found joy in making things work in the browser, piece by piece, and solving problems through code. At some point, I joined RS School, and it was a game changer. The structured learning, the supportive community, and the hands-on experience pushed me to grow much faster than I expected. Now, I feel more confident in my skills and excited about what's next. I'm aiming to become a strong developer who can build beautiful, useful things and enjoy the process along the way.",
};

export default function AboutPage(): JSX.Element {
  return (
    <div className={style.about}>
      <h2 className={style.about__header}>const team = new Team();</h2>
      <div className={style.about__members}>
        <TeamMember {...Anton}>
          <pre>
            <b className={memberStyle['team-member__var']}>massiveCall( GoogleMeet )</b>
            {` {
    const call = new GoogleMeet();
    call.join(Artur, Sergei, Aleksey);
    return mindStorm;
  }\n`}
            <b className={memberStyle['team-member__var']}>scrumAttack()</b>{' '}
            {`{
    let kanbanItem = ...;
    return Kanban.push(kanbanItem);
  }`}
          </pre>
        </TeamMember>
        <TeamMember {...Siarhei}>
          <pre>
            <b className={memberStyle['team-member__var']}>Watch,ImBackendDev()</b>
            {` {
   const commerceToolsApi = new CommerceToolsApi();
   const sneakers = superParse(); //parse all sneakers commerce apps in WWW;
   commerceToolsApi.sneakers.push(sneakers);
   return WellStructuredAPI;
  }\n`}
            <b className={memberStyle['team-member__var']}>ThereIsBugThereIsNoBug( code )</b>
            {` {
    if ( bug in code) {
      code.fix();
      return code;
    }
    return codeWithoutBugs;
  }`}
          </pre>
        </TeamMember>
        <TeamMember {...Artur}>
          <pre>
            <b className={memberStyle['team-member__var']}>silentCheck( crossCheckApps )</b>
            {` {
    crossCheckApps.forEach(app => {
      Check the work sent for cross-checking when the whole team is asleep.
    }
    return Evaluations;
 }\n`}
            <b className={memberStyle['team-member__var']}>YoungQA</b>{' '}
            {`{
  ImplementedComponents.forEach(component => {
    component.writeTests();
  });
  return QualityCode;
 }`}
          </pre>
        </TeamMember>
        <a href={'https://rs.school/'}>
          <img src={logoImg} alt="Rsschool log" />
        </a>
      </div>
    </div>
  );
}
