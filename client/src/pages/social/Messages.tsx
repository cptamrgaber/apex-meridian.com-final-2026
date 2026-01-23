import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/_core/hooks/useAuth';
import { Link } from "wouter";
import { Send, Search, ArrowLeft, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Messages() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: profile } = trpc.social.getMyProfile.useQuery();
  const { data: conversations, refetch: refetchConversations } = trpc.messaging.getConversations.useQuery();
  const { data: unreadCount } = trpc.messaging.getUnreadCount.useQuery();
  
  const { data: messages, refetch: refetchMessages } = trpc.messaging.getMessages.useQuery(
    {
      conversationId: selectedConversationId!,
      limit: 50,
      offset: 0,
    },
    {
      enabled: !!selectedConversationId,
    }
  );

  const sendMessageMutation = trpc.messaging.sendMessage.useMutation({
    onSuccess: () => {
      setMessageContent("");
      refetchMessages();
      refetchConversations();
    },
    onError: (error) => {
      toast.error(`Failed to send message: ${error.message}`);
    },
  });

  const markAsReadMutation = trpc.messaging.markAsRead.useMutation({
    onSuccess: () => {
      refetchConversations();
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark messages as read when conversation is opened
  useEffect(() => {
    if (selectedConversationId) {
      markAsReadMutation.mutate({ conversationId: selectedConversationId });
    }
  }, [selectedConversationId]);

  const handleSendMessage = () => {
    if (!messageContent.trim() || !selectedConversationId) {
      return;
    }

    sendMessageMutation.mutate({
      conversationId: selectedConversationId,
      content: messageContent,
      messageType: "text",
    });
  };

  const selectedConversation = conversations?.find((c) => c.id === selectedConversationId);
  const otherParticipant = selectedConversation?.participants?.[0];

  const filteredConversations = conversations?.filter((conv) =>
    conv.participants?.some((p: any) =>
      p.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.username?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white flex items-center justify-center">
        <Card className="max-w-md p-8 bg-slate-900/50 border-slate-800">
          <h2 className="text-2xl font-bold mb-4">{t('social.auth.welcome')}</h2>
          <p className="text-slate-400 mb-6">{t('social.auth.createProfile')}</p>
          <Link href="/social/setup">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
              {t('social.profile.createProfile')}
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/social">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t('social.brand')}
              </h1>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/social">
                <Button variant="ghost" size="sm">{t('social.nav.home')}</Button>
              </Link>
              <Link href="/social/explore">
                <Button variant="ghost" size="sm">{t('social.nav.explore')}</Button>
              </Link>
              <Link href="/social/messages">
                <Button variant="default" size="sm">
                  {t('social.nav.messages')}
                  {unreadCount && unreadCount.unreadCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {unreadCount.unreadCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href={`/social/profile/${profile.username}`}>
                <Button variant="ghost" size="sm">{t('social.nav.profile')}</Button>
              </Link>
              <LanguageSwitcher />
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1 bg-slate-900/50 border-slate-800 flex flex-col">
            <div className="p-4 border-b border-slate-800">
              <h2 className="text-xl font-bold mb-4">{t('social.messages.title')}</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('social.search.searchPlaceholder', { type: t('social.search.users') })}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations && filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => {
                  const participant = conv.participants?.[0];
                  return (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversationId(conv.id)}
                      className={`p-4 border-b border-slate-800 cursor-pointer transition-colors ${
                        selectedConversationId === conv.id
                          ? "bg-blue-900/30"
                          : "hover:bg-slate-800/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                          {participant?.displayName?.charAt(0) || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">
                            {participant?.displayName || "Unknown User"}
                          </h3>
                          <p className="text-sm text-slate-400 truncate">
                            @{participant?.username}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <p>{t('social.messages.noConversations')}</p>
                  <Link href="/social/explore">
                    <Button className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-600">
                      {t('social.messages.startConversation')}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>

          {/* Chat Interface */}
          <Card className="lg:col-span-2 bg-slate-900/50 border-slate-800 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedConversationId(null)}
                      className="lg:hidden"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {otherParticipant?.displayName?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h3 className="font-semibold">{otherParticipant?.displayName || "Unknown User"}</h3>
                      <p className="text-sm text-slate-400">@{otherParticipant?.username}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages && messages.length > 0 ? (
                    messages.reverse().map((msg) => {
                      const isOwnMessage = msg.senderId === user?.id;
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                              isOwnMessage
                                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                                : "bg-slate-800 text-slate-200"
                            }`}
                          >
                            <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                      <p>{t('social.messages.noConversations')}</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <Input
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder={t('social.messages.typeMessage')}
                      className="flex-1 bg-slate-800/50 border-slate-700 text-white"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageContent.trim() || sendMessageMutation.isPending}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <p className="text-lg mb-2">{t('social.messages.noConversations')}</p>
                  <p className="text-sm">{t('social.messages.startConversation')}</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
