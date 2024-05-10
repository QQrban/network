export interface Event {
  id: number;
  date: string;
  title: string;
  location: string;
  interested: boolean;
}

export const yourEvents: Event[] = [
  {
    id: 0,
    date: "May 25th, 2024, 14:00",
    title: "JS Mortal Kombat",
    location: "Kultuuri Katel",
    interested: true,
  },
  {
    id: 1,
    date: "June 15th, 2024, 16:00",
    title: "React Summit",
    location: "Online",
    interested: true,
  },
  {
    id: 2,
    date: "July 20th, 2024, 12:00",
    title: "Node.js Conference",
    location: "Berlin",
    interested: true,
  },
  {
    id: 3,
    date: "August 5th, 2024, 20:00",
    title: "CSS Design Awards",
    location: "New York",
    interested: true,
  },
  {
    id: 4,
    date: "August 5th, 2024, 20:00",
    title: "CSS Design Awards",
    location: "New York",
    interested: true,
  },
  {
    id: 5,
    date: "August 5th, 2024, 20:00",
    title: "CSS Design Awards",
    location: "New York",
    interested: true,
  },
];
