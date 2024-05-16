interface Ticket {
  heading: string;
  content: string;
  tag: string;
  ticketId: string;
}
export function groupByTag(data: Ticket[]) {
  interface Item {
    heading: string;
    content: string;
    tag: string;
    ticketId: string;
  }
  const groupedByTag: Record<string, Item[]> = data.reduce(
    (acc: Record<string, Item[]>, item: Item) => {
      const tag = item.tag;
      acc[tag] = acc[tag] || [];
      acc[tag].push(item);
      return acc;
    },
    {}
  );

  return groupedByTag
}
export function findById(data: Ticket[], ticketId: string | null) {
  return data.filter((tick) => tick.ticketId === ticketId);
}
export function filterWithoutId(ticketId: string | null, data: Ticket[]) {
  return data.filter((tick) => tick.ticketId !== ticketId);
}
