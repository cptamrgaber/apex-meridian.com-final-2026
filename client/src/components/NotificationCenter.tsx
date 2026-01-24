import { useState } from "react";
import { useTranslation } from "react-i18next";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bell, Heart, MessageCircle, UserPlus, Share2, X, Check } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function NotificationCenter() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const { data: unreadData } = trpc.notifications.getUnreadCount.useQuery();
  const { data: notifications, refetch } = trpc.notifications.getNotifications.useQuery({
    limit: 20,
    offset: 0,
  }, {
    enabled: isOpen, // Only fetch when dropdown is open
  });

  const markAsReadMutation = trpc.notifications.markAsRead.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const markAllAsReadMutation = trpc.notifications.markAllAsRead.useMutation({
    onSuccess: () => {
      toast.success(t('social.notifications.allMarkedRead'));
      refetch();
    },
  });

  const deleteNotificationMutation = trpc.notifications.deleteNotification.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleNotificationClick = (notificationId: number, isRead: number) => {
    if (isRead === 0) {
      markAsReadMutation.mutate({ notificationId });
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const handleDeleteNotification = (notificationId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNotificationMutation.mutate({ notificationId });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-4 h-4 text-red-500" />;
      case "comment":
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case "follow":
        return <UserPlus className="w-4 h-4 text-green-500" />;
      case "share":
        return <Share2 className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getNotificationLink = (notification: any) => {
    switch (notification.entityType) {
      case "post":
        return `/social/post/${notification.entityId}`;
      case "comment":
        return `/social/post/${notification.entityId}`;
      case "story":
        return `/social/stories`;
      default:
        return "/social";
    }
  };

  const getNotificationText = (notification: any) => {
    const actorName = notification.actor?.displayName || "Someone";
    
    switch (notification.type) {
      case "like":
        return t('social.notifications.likedPost', { name: actorName });
      case "comment":
        return t('social.notifications.commentedPost', { name: actorName });
      case "follow":
        return t('social.notifications.followedYou', { name: actorName });
      case "mention":
        return t('social.notifications.mentionedYou', { name: actorName });
      case "share":
        return t('social.notifications.sharedPost', { name: actorName });
      default:
        return notification.content || t('social.notifications.newNotification');
    }
  };

  const unreadCount = unreadData?.unreadCount || 0;

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Notification Panel */}
          <Card className="absolute right-0 mt-2 w-96 max-h-[600px] overflow-hidden z-50 bg-slate-900 border-slate-800 shadow-xl">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {t('social.notifications.title')}
              </h3>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Check className="w-4 h-4 mr-1" />
                  {t('social.notifications.markAllRead')}
                </Button>
              )}
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-[500px]">
              {notifications && notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Link
                    key={notification.id}
                    href={getNotificationLink(notification)}
                    onClick={() => {
                      handleNotificationClick(notification.id, notification.isRead);
                      setIsOpen(false);
                    }}
                  >
                    <div
                      className={`p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer ${
                        notification.isRead === 0 ? 'bg-slate-800/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Actor Avatar */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {notification.actor?.displayName?.charAt(0) || "?"}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2">
                            {getNotificationIcon(notification.type)}
                            <p className="text-sm text-gray-300 flex-1">
                              {getNotificationText(notification)}
                            </p>
                            {notification.isRead === 0 && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                            )}
                          </div>
                          
                          {notification.content && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {notification.content}
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {new Date(notification.createdAt).toLocaleDateString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => handleDeleteNotification(notification.id, e)}
                              className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>{t('social.notifications.noNotifications')}</p>
                </div>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
