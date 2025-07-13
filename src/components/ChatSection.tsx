import React from 'react';
import { ChatHistory } from './ChatHistory';
import { ChatForm } from './ChatForm';
import { ChatTier, ChatMessage } from '../types';

interface ChatSectionProps {
  tier: ChatTier;
  messages: ChatMessage[];
  count: number;
  onSendMessage: (message: string) => void;
  isActive: boolean;
}

export function ChatSection({ tier, messages, count, onSendMessage, isActive }: ChatSectionProps) {
  const isLimitReached = count >= tier.limit;

  if (!isActive) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {tier.key === "10" && "📊"} 
          {tier.key === "30" && "🚀"} 
          {tier.key === "50" && "💎"} 
          {tier.label}
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-200">
          Used: {count} / {tier.limit} messages
        </div>
      </div>
      
      <ChatHistory messages={messages} />
      
      <ChatForm 
        onSendMessage={onSendMessage}
        disabled={isLimitReached}
      />
      
      {isLimitReached && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium text-center">
          🚫 Credit limit reached - Please purchase more credits to continue
        </div>
      )}
    </div>
  );
}