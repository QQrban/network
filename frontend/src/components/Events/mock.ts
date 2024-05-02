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
];

export const suggestions: Event[] = [
  {
    id: 4,
    date: "May 25th, 2024, 14:00",
    title: "JS Mortal Kombat",
    location: "Kultuuri Katel",
    interested: false,
  },
  {
    id: 5,
    date: "June 15th, 2024, 16:00",
    title: "React Summit",
    location: "Online",
    interested: false,
  },
  {
    id: 6,
    date: "July 20th, 2024, 12:00",
    title: "Node.js Conference",
    location: "Berlin",
    interested: false,
  },
  {
    id: 33,
    date: "August 5th, 2024, 20:00",
    title: "CSS Design Awards",
    location: "New York",
    interested: false,
  },
  {
    id: 421,
    date: "September 10th, 2024, 10:00",
    title: "Python World",
    location: "San Francisco",
    interested: false,
  },
  {
    id: 544,
    date: "October 23rd, 2024, 15:00",
    title: "AI & Robotics Expo",
    location: "Tokyo",
    interested: false,
  },
  {
    id: 2156,
    date: "November 19th, 2024, 09:00",
    title: "Big Data Analysis Conference",
    location: "London",
    interested: false,
  },
  {
    id: 702,
    date: "December 5th, 2024, 18:00",
    title: "Tech Innovators Meetup",
    location: "Dubai",
    interested: false,
  },
  {
    id: 1238,
    date: "January 22nd, 2025, 11:00",
    title: "Virtual Reality Summit",
    location: "Seoul",
    interested: false,
  },
  {
    id: 9009,
    date: "February 14th, 2025, 16:00",
    title: "Mobile Developers Forum",
    location: "Chicago",
    interested: false,
  },
  {
    id: 1110,
    date: "March 30th, 2025, 13:00",
    title: "Cybersecurity Symposium",
    location: "Paris",
    interested: false,
  },
  {
    id: 11,
    date: "April 25th, 2025, 20:00",
    title: "Startups Pitch Night",
    location: "Austin",
    interested: false,
  },
];
