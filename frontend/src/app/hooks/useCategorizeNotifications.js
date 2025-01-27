const useCategorizeNotifications = (notifications) => {
   const categorizeNotifications = () => {
      const categorized = {
         Today: [],
         Yesterday: [],
         "Last Week": [],
         Earlier: []
      };

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      notifications.forEach((notification) => {
         const notificationDate = new Date(notification.date);
         const differenceInDays = Math.floor((today - notificationDate) / (1000 * 60 * 60 * 24));

         if (differenceInDays === 0) {
            categorized.Today.push(notification);
         } else if (differenceInDays === 1) {
            categorized.Yesterday.push(notification);
         } else if (differenceInDays <= 7) {
            categorized["Last Week"].push(notification);
         } else {
            categorized.Earlier.push(notification);
         }
      });

      return categorized;
   };

   return categorizeNotifications(notifications);
};

export default useCategorizeNotifications;
