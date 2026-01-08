"use client";

export interface DateDisplayProps {
  date: Date | string;
  showTime?: boolean;
  dateStyle?: Intl.DateTimeFormatOptions["dateStyle"];
  timeStyle?: Intl.DateTimeFormatOptions["timeStyle"];
}

const DateDisplay = ({
  date,
  showTime = false,
  dateStyle = "medium",
  timeStyle = "short",
}: DateDisplayProps) => {
  const formatDate = () => {
    const dateObj = date instanceof Date ? date : new Date(date);

    const options: Intl.DateTimeFormatOptions = {
      dateStyle,
      ...(showTime && { timeStyle }),
    };

    return dateObj.toLocaleDateString(undefined, options);
  };

  return <span suppressHydrationWarning>{formatDate()}</span>;
};

export default DateDisplay;
