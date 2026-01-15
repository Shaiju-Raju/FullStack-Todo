export default function Todos(props) {
  return (
    <ul className="todo-items-list" id="todo-items-list">
      <li>
        <span className="item-text">{props.toDo}</span>
        <span className="item-actions">
          <i
            onClick={() => props.onEdit(props.id)}
            className="fas fa-edit"
          >
          </i>
          <i
            onClick={() => props.onDelete(props.id)}
            className="fas fa-trash"
          ></i>
        </span>
      </li>
    </ul>
  );
}