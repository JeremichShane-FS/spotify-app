import "./ContextMenu.scss";

const ContextMenu = ({ items }) => {
  return (
    <div className="context-menu">
      <ul className="context-menu__list">
        {items.map((item, index) => (
          <li key={index} className="context-menu__item">
            <button onClick={item.onClick} className="context-menu__button">
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
