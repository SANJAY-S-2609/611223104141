import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);

  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const data = await fetchNotifications();

        setNotifications(data.notifications ?? []);
        setTotal(data.notifications?.length ?? 0);

        setError(null);
      } catch (err) {
        setError("Failed to load");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter(
          (notification) => notification.category === filter
        );

  const totalPages = Math.ceil(filteredNotifications.length / 5);

  return {
    notifications: filteredNotifications,
    total,
    totalPages,
    loading,
    error,
    filter,
    setFilter,
  };
}