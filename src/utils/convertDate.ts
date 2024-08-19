export const toLastMessageDate = (date: string) => {
  const dateTime = new Date(date);
  const currTime = new Date();
  const diff = (Number(currTime) - Number(dateTime)) / 60000; //minutes

  if (diff < 60) return `${Math.round(diff)} min`;
  if (diff < 60 * 24) return `${Math.round(diff / 60)} hours`;
  if (diff < 60 * 24 * 30) return `${Math.round(diff / 60 / 24)} days`;
  return dateTime.toLocaleDateString();
};

export const toChatMessageDate = (date: string) => {
  const dateTime = new Date(date);
  return dateTime.toLocaleTimeString();
};
