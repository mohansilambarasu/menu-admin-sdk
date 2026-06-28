import { useState } from "react";
import type { MenuItem } from "../../core/store";

//  FormData is now its own type, decoupled from MenuItem
// price is string here (what the user types), number in the store (cents)
type FormData = {
  name: string;
  description: string;
  price: string;
};

//  name field is typed as keyof FormData instead of plain string
const formFields: {
  name: keyof FormData;
  label: string;
  placeholder: string;
}[] = [
  { name: "name", label: "Name", placeholder: "Add menu name here." },
  {
    name: "description",
    label: "Description",
    placeholder: "Add menu description here.",
  },
  { name: "price", label: "Price", placeholder: "0.00" },
];

//  editingId is now string to match MenuItem id: string
type Props = {
  editingId: string;
  currentMenu: MenuItem;
  updateItem: (newItem: Omit<MenuItem, "id">, editingId: string) => void;
  closeEditForm: () => void;
};

const EditForm = ({
  editingId,
  currentMenu,
  updateItem,
  closeEditForm,
}: Props) => {
  const [menu, setMenu] = useState<FormData>({
    name: currentMenu.name,
    description: currentMenu.description,
    //  convert cents back to display string for editing
    // 1250 → "12.50" so the user sees what they originally typed
    price: (currentMenu.price / 100).toFixed(2),
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMenu((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (menu.name === "" || menu.description === "" || menu.price === "") {
      setError("All fields are required.");
      return;
    }

    //  price validation — must be a valid positive number
    const parsed = parseFloat(menu.price);
    if (
      isNaN(parsed) ||
      parsed <= 0 ||
      !/^\d+(\.\d{1,2})?$/.test(menu.price.trim())
    ) {
      setError("Price must be a valid number (e.g. 12 or 12.50).");
      return;
    }

    setError("");

    //  price converted to cents integer before hitting the store
    updateItem(
      {
        name: menu.name,
        description: menu.description,
        price: Math.round(parsed * 100),
      },
      editingId,
    );

    closeEditForm();
  };

  return (
    <form className="menu-form" onSubmit={handleSubmit}>
      {formFields.map(({ name, label, placeholder }) => (
        <div key={name} className="menu-form__field">
          <label
            className="menu-form__label"
            htmlFor={`edit-${editingId}-${name}`}
          >
            {label}
          </label>

          {/*  price field gets a $-prefix wrapper, others render normally */}
          {name === "price" ? (
            <div className="menu-form__input-wrapper menu-form__input-wrapper--price">
              <span className="menu-form__currency">$</span>
              <input
                id={`edit-${editingId}-${name}`}
                className="menu-form__input"
                name={name}
                value={menu[name]}
                onChange={handleChange}
                type="text"
                inputMode="decimal"
                placeholder={placeholder}
              />
            </div>
          ) : (
            <input
              id={`edit-${editingId}-${name}`}
              className="menu-form__input"
              name={name}
              value={menu[name]}
              onChange={handleChange}
              type="text"
              placeholder={placeholder}
            />
          )}
        </div>
      ))}

      {error && <p className="menu-form__error">{error}</p>}

      <div className="menu-form__actions">
        <button
          className="menu-form__btn menu-form__btn--cancel"
          type="button"
          onClick={closeEditForm}
        >
          Cancel
        </button>
        <button className="menu-form__btn menu-form__btn--save" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditForm;
