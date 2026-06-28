import { useState } from "react";
import EditForm from "./EditForm";
import type { MenuItem } from "../../core/store";

// id is now string, was number
type Props = {
  menuItems: MenuItem[];
  deleteItem: (id: string) => void;
  updateItem: (newItem: Omit<MenuItem, "id">, editingId: string) => void;
};

const List = ({ menuItems, deleteItem, updateItem }: Props) => {
  // editingId is now string | null, was number | null
  const [editingId, setEditingId] = useState<string | null>(null);

  const closeEditForm = () => {
    setEditingId(null);
  };

  return (
    <section className="menu-section">
      <ul className="menu-list">
        {menuItems.map((menu) =>
          menu.id === editingId ? (
            <li key={menu.id} className="menu-list__item">
              <EditForm
                editingId={editingId}
                currentMenu={menu}
                updateItem={updateItem}
                closeEditForm={closeEditForm}
              />
            </li>
          ) : (
            <li key={menu.id} className="menu-list__item">
              <article className="menu-card">
                <div className="menu-card__top">
                  <div className="menu-card__info">
                    <h3 className="menu-card__title">{menu.name}</h3>
                    <p className="menu-card__description">{menu.description}</p>
                  </div>
                  <div className="menu-card__right">
                    {/* price is now cents integer, convert to display string here */}
                    {/* 1250 → "$12.50" — $ sign lives only in the display layer */}
                    <span className="menu-card__price">
                      ${(menu.price / 100).toFixed(2)}
                    </span>
                    <div className="menu-card__actions">
                      <button
                        className="menu-card__btn menu-card__btn--edit"
                        onClick={() => setEditingId(menu.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="menu-card__btn menu-card__btn--delete"
                        onClick={() => deleteItem(menu.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ),
        )}
      </ul>
    </section>
  );
};

export default List;
