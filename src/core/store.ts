interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

let items: MenuItem[] = [];

let subscribers: ((items: MenuItem[]) => void)[] = [];

function notifySubscribers(): void {
  subscribers.forEach((subscriber) => {
    subscriber(items);
  });
}

function subscribe(listener: (items: MenuItem[]) => void): () => void {
  if (!subscribers.includes(listener)) {
    subscribers.push(listener);
  }
  return () => {
    subscribers = subscribers.filter((sub) => sub !== listener);
  };
}

function addItem(newItem: Omit<MenuItem, "id">): void {
  // CHANGED: id is now a UUID string, was Date.now() number
  const item: MenuItem = { ...newItem, id: crypto.randomUUID() };
  items = [...items, item];
  notifySubscribers();
}

function deleteItem(id: string): void {
  items = items.filter((item) => item.id !== id);
  notifySubscribers();
}

function updateItem(newItem: Omit<MenuItem, "id">, editingId: string): void {
  items = items.map((item) => {
    if (item.id === editingId) {
      return { ...item, ...newItem };
    } else {
      return item;
    }
  });
  notifySubscribers();
}

export { addItem, deleteItem, updateItem, subscribe };
export type { MenuItem };
