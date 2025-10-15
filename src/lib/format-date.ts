export function formatDate(createdAt: string | Date): string {
  // Get current time
  const now = new Date();

  // Ensure that createdAt is always a Date object.
  // Sometimes data from the database comes as a string (e.g. "2025-10-07T12:00:00Z").
  // So this line checks:
  // If createdAt (param) is already a Date, keep it.
  // Otherwise, convert it from a string -> Date object.
  createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);

  // Calculate the difference (in seconds) between now and the given date
  const diffInSeconds = Math.floor(
    (now.getTime() - new Date(createdAt).getTime()) / 1000
  );

  // Define time constants in seconds easy comparison
  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;
  const secondsInYear = 365 * secondsInDay;

  if (diffInSeconds < secondsInMinute) {
    // CASE 1: Less than 1 minute ago - show in seconds
    // Example: 45s

    return `${diffInSeconds}s`;
  } else if (diffInSeconds < secondsInHour) {
    // CASE 2: Less than 1 hour ago - show in minutes
    // Example: 5m

    const minutes = Math.floor(diffInSeconds / secondsInMinute);

    return `${minutes}m`;
  } else if (diffInSeconds < secondsInDay) {
    // CASE 3: Less than 1 day ago - show in hours
    // Example: 2h

    const hours = Math.floor(diffInSeconds / secondsInHour);

    return `${hours}h`;
  } else if (diffInSeconds < secondsInYear) {
    // CASE 4: Less than 1 year ago - show Month + Day
    // Example: "Jun 21"
    const createdAtDate = new Date(createdAt);
    const options: Intl.DateTimeFormatOptions = {
      month: "short", // "Jan", "Feb"...
      day: "numeric", // "1", "2", "3",...,"21"
    };

    return createdAtDate.toLocaleDateString("en-US", options);
  } else {
    // CASE 5: Older than a year - show Month + Day + Year
    // Example: "Jun 21, 2024"
    const createdAtDate = new Date(createdAt);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    return createdAtDate.toLocaleDateString("en-US", options);
  }
}
