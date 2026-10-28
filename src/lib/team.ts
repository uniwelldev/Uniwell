export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  photo?: string; // path under /public, e.g. /team/name.jpg
};

// Roles are placeholders until confirmed.
export const team: TeamMember[] = [
  { name: 'Sawan Singh', role: 'Founder', photo: '/team/sawan-singh.png' },
  { name: 'Asit Upadhyay', role: 'Creative Director', photo: '/team/asit-upadhyay.png' },
  { name: 'Yugal Singh', role: 'Head of Engineering', photo: '/team/yugal-singh.png' },
  { name: 'Mayank Raghuvanshi', role: 'Growth Lead', photo: '/team/mayank-raghuvanshi.png' },
  { name: 'Ayushman Dwivedi', role: 'Team Member', photo: '/team/ayushman-dwivedi.png' },
  { name: 'Vivek Singh', role: 'Team Member', photo: '/team/vivek-singh.png' },
  { name: 'Aman Pratap Singh', role: 'Team Member', photo: '/team/aman-pratap-singh.png' },
];
