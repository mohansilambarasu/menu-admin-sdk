import { useState, useEffect } from "react";
import { subscribe } from "../../core/store";
import type { MenuItem } from "../../core/store";

export function useMenuItems(): MenuItem[] {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const unsubscribe = subscribe(setMenuItems);
    return unsubscribe;
  }, []);

  return menuItems;
}
