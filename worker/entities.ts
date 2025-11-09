/**
 * Minimal real-world demo: One Durable Object instance per entity (User, ChatBoard), with Indexes for listing.
 */
import { IndexedEntity } from "./core-utils";
import type { User, Chat, ChatMessage, Launch } from "@shared/types";
import { MOCK_CHAT_MESSAGES, MOCK_CHATS, MOCK_USERS, MOCK_LAUNCHES } from "@shared/mock-data";
// USER ENTITY: one DO instance per user
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
// CHAT BOARD ENTITY: one DO instance per chat board, stores its own messages
export type ChatBoardState = Chat & { messages: ChatMessage[] };
const SEED_CHAT_BOARDS: ChatBoardState[] = MOCK_CHATS.map(c => ({
  ...c,
  messages: MOCK_CHAT_MESSAGES.filter(m => m.chatId === c.id),
}));
export class ChatBoardEntity extends IndexedEntity<ChatBoardState> {
  static readonly entityName = "chat";
  static readonly indexName = "chats";
  static readonly initialState: ChatBoardState = { id: "", title: "", messages: [] };
  static seedData = SEED_CHAT_BOARDS;
  async listMessages(): Promise<ChatMessage[]> {
    const { messages } = await this.getState();
    return messages;
  }
  async sendMessage(userId: string, text: string): Promise<ChatMessage> {
    const msg: ChatMessage = { id: crypto.randomUUID(), chatId: this.id, userId, text, ts: Date.now() };
    await this.mutate(s => ({ ...s, messages: [...s.messages, msg] }));
    return msg;
  }
}
// LAUNCH ENTITY: one DO instance per launch
export class LaunchEntity extends IndexedEntity<Launch> {
  static readonly entityName = "launch";
  static readonly indexName = "launches";
  static readonly initialState: Launch = {
    id: "",
    missionName: "",
    launchDate: new Date().toISOString(),
    status: 'Upcoming',
    rocket: { name: "", height: "", diameter: "", mass: "", payloadToLEO: "" },
    launchSite: { name: "", location: "" },
    payload: "",
    destinationOrbit: "",
    telemetry: { altitude: 0, speed: 0, downrange: 0, signalStrength: 0, temperature: 0, fuel: 0, pressure: 0 },
  };
  static seedData = MOCK_LAUNCHES;
}