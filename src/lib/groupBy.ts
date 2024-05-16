interface Ticket {
  heading: string;
  content: string;
  tag: string;
  ticketId: string;
}
export function groupByTag(data: Ticket[]) {
  const groupedByTag2 = Object.groupBy(
    data,
    (item: Ticket) => item.tag
  ) as Record<string, Ticket[]>;
  return groupedByTag2;
}
export function findById(data: Ticket[], ticketId: string | null) {
  return data.filter((tick) => tick.ticketId === ticketId);
}
export function filterWithoutId(ticketId: string | null, data: Ticket[]) {
  return data.filter((tick) => tick.ticketId !== ticketId);
}
