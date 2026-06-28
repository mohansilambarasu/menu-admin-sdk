import InputForm from "./ui/components/InputForm";
import List from "./ui/components/List";
import { addItem, deleteItem, updateItem } from "./core/store";
import { useMenuItems } from "./ui/hooks/useMenuItems";

type Props = {
  theme?: "light" | "dark";
};

function App({ theme = "light" }: Props) {
  const menuItems = useMenuItems();

  return (
    <div className="app" data-theme={theme}>
      <header className="app__navbar">
        <div className="app__navbar-inner">
          <span className="app__subtitle">Restaurant Management</span>
        </div>
      </header>
      <main className="app__main">
        <div className="app-section__header">
          <h2 className="app-section__title">Current Menu Items</h2>
          <span className="app-section__count">{menuItems.length} items</span>
        </div>
        <InputForm addItem={addItem} />
        <List
          menuItems={menuItems}
          deleteItem={deleteItem}
          updateItem={updateItem}
        />
      </main>
    </div>
  );
}

export default App;
