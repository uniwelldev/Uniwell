'use client';
import dynamic from 'next/dynamic';

// The chat widget is not needed for first paint; load it after hydration.
const ChatWidget = dynamic(
  () => import('./chat-widget').then((m) => m.ChatWidget),
  { ssr: false },
);

export function ChatLoader() {
  return <ChatWidget />;
}
