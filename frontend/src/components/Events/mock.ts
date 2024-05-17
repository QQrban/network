export interface Event {
  id: number;
  date: string;
  title: string;
  location: string;
  interested: boolean;
  description: string;
}

export const yourEvents: Event[] = [
  {
    id: 0,
    date: "May 25th, 2024, 14:00",
    title: "JS Mortal Kombat",
    location: "Kultuuri Katel",
    interested: false,
    description:
      "Prepare for an electrifying day at the JS Mortal Kombat event, where JavaScript warriors from various skill levels compete in a coding showdown like no other. Engage with innovative developers, tackle challenging problems, and watch as code and creativity collide in a battle-themed environment designed to thrill and educate.",
  },
  {
    id: 1,
    date: "June 15th, 2024, 16:00",
    title: "React Summit",
    location: "Online",
    interested: false,
    description:
      "Connect with the global React community at the React Summit, an online conference dedicated to React developers and enthusiasts. Explore the latest developments, cutting-edge technologies, and best practices in React through interactive sessions, workshops, and live Q&As with leading experts in the field.",
  },
  {
    id: 2,
    date: "July 20th, 2024, 12:00",
    title: "Node.js Conference",
    location: "Berlin",
    interested: false,
    description:
      "Join us in Berlin for the Node.js Conference, an essential gathering for all Node.js professionals and admirers. This event brings together the brightest minds in the Node.js community to discuss new features, security practices, and performance enhancements, complemented by networking sessions and hands-on workshops.",
  },
  {
    id: 3,
    date: "August 5th, 2024, 20:00",
    title: "CSS Design Awards",
    location: "New York",
    interested: true,
    description:
      "Celebrate the art of web design at the CSS Design Awards in New York City, an event honoring outstanding creative and technical achievements in CSS. Witness the crowning of the best designers, participate in discussions about the future of web aesthetics, and explore new trends and techniques that are shaping the internet.",
  },
  {
    id: 4,
    date: "August 5th, 2024, 20:00",
    title: "CSS Design Awards",
    location: "New York",
    interested: false,
    description:
      "Experience the glamour and innovation at the CSS Design Awards, where the finest web designers converge to showcase their unique styles and visionary approaches. This prestigious night in New York City not only highlights the best in CSS design but also provides insights into the evolving landscape of digital design.",
  },
  {
    id: 5,
    date: "August 5th, 2024, 20:00",
    title: "CSS Design Awards",
    location: "New York",
    interested: true,
    description:
      "Don't miss the CSS Design Awards in New York, an inspiring evening dedicated to celebrating the best in web design. Enjoy a showcase of groundbreaking CSS techniques and designs, learn from the industry leaders, and network with peers at one of the most eagerly awaited design events of the year.",
  },
];
