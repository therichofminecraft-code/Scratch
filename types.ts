export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  recipient: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  category?: string;
  categoryColor?: string;
}

export interface User {
  name: string;
  phone: string;
  email: string;
}