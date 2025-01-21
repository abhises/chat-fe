export const unreadNotificationsFunc = (notifications) => {
  return notifications.filter((u) => u.isRead === false);
};
