export interface User {
  _id: string;
  name: string;
  email: string;
  clerkId: string;
  telegramChatId: string;
  status: "pending" | "approved" | "rejected";
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}
