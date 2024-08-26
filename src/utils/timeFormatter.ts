export const historyDateFormat = (date: string) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("en-US", { month: "long" });
    const day = newDate.getDate().toString().padStart(2, "0");
    return `${month} ${day}`;
  };
  export const historyHourFormatter = (date: string) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() - newDate.getTimezoneOffset() / 60);

    let hours = newDate.getHours();
    const minutes = newDate.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours.toString().padStart(2, "0");

    const formattedTime = `${formattedHours}:${minutes}${ampm}`;
    return formattedTime;
  };