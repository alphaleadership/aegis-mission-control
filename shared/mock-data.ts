import type { User, Chat, ChatMessage, Launch } from './types';
import { subDays, addDays, addHours } from 'date-fns';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'User A' },
  { id: 'u2', name: 'User B' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'General' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Hello', ts: Date.now() },
];
export const MOCK_LAUNCHES: Launch[] = [
  {
    id: 'aegis-001',
    missionName: 'Starlink Group 8-1',
    launchDate: addHours(new Date(), 2).toISOString(),
    status: 'Upcoming',
    rocket: {
      name: 'Falcon 9',
      height: '70 m',
      diameter: '3.7 m',
      mass: '549,054 kg',
      payloadToLEO: '22,800 kg',
    },
    launchSite: {
      name: 'SLC-40',
      location: 'Cape Canaveral, FL',
    },
    payload: '52 Starlink satellites',
    liveStreamUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    telemetry: {
      altitude: 0,
      speed: 0,
      downrange: 0,
      signalStrength: 100,
      temperature: 22,
      fuel: 100,
      pressure: 101.3,
    },
  },
  {
    id: 'aegis-002',
    missionName: 'Orion-3 Mission',
    launchDate: addDays(new Date(), 5).toISOString(),
    status: 'Upcoming',
    rocket: {
      name: 'Ares V',
      height: '116 m',
      diameter: '10 m',
      mass: '3,700,000 kg',
      payloadToLEO: '188,000 kg',
    },
    launchSite: {
      name: 'LC-39B',
      location: 'Kennedy Space Center, FL',
    },
    payload: 'Orion Crew Module & Lunar Lander',
    telemetry: {
      altitude: 0,
      speed: 0,
      downrange: 0,
      signalStrength: 100,
      temperature: 24,
      fuel: 100,
      pressure: 101.3,
    },
  },
  {
    id: 'aegis-003',
    missionName: 'ISS Resupply CRS-29',
    launchDate: subDays(new Date(), 10).toISOString(),
    status: 'Success',
    rocket: {
      name: 'Falcon 9',
      height: '70 m',
      diameter: '3.7 m',
      mass: '549,054 kg',
      payloadToLEO: '22,800 kg',
    },
    launchSite: {
      name: 'LC-39A',
      location: 'Kennedy Space Center, FL',
    },
    payload: 'Dragon 2 spacecraft with supplies',
    telemetry: {
      altitude: 420,
      speed: 27600,
      downrange: 19800,
      signalStrength: 98,
      temperature: -60,
      fuel: 0,
      pressure: 0,
    },
  },
  {
    id: 'aegis-004',
    missionName: 'Europa Clipper',
    launchDate: addDays(new Date(), 25).toISOString(),
    status: 'Upcoming',
    rocket: {
      name: 'Falcon Heavy',
      height: '70 m',
      diameter: '12.2 m',
      mass: '1,420,788 kg',
      payloadToLEO: '63,800 kg',
    },
    launchSite: {
      name: 'LC-39A',
      location: 'Kennedy Space Center, FL',
    },
    payload: 'Europa Clipper spacecraft',
    telemetry: {
      altitude: 0,
      speed: 0,
      downrange: 0,
      signalStrength: 100,
      temperature: 25,
      fuel: 100,
      pressure: 101.3,
    },
  },
  {
    id: 'aegis-005',
    missionName: 'Test Flight 2',
    launchDate: subDays(new Date(), 45).toISOString(),
    status: 'Failed',
    rocket: {
      name: 'New Glenn',
      height: '98 m',
      diameter: '7 m',
      mass: 'N/A',
      payloadToLEO: '45,000 kg',
    },
    launchSite: {
      name: 'LC-36',
      location: 'Cape Canaveral, FL',
    },
    payload: 'Boilerplate Mass Simulator',
    telemetry: {
      altitude: 50,
      speed: 1200,
      downrange: 20,
      signalStrength: 0,
      temperature: 800,
      fuel: 25,
      pressure: 500,
    },
  },
];