import { formatDistanceToNow, parseISO, isValid } from "date-fns";

export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export function formatDistanceFromNow(dateString) {
  const date = parseISO(dateString);
  if (!isValid(date)) return "Invalid date";
  return formatDistanceToNow(date, { addSuffix: true });
}

export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );
