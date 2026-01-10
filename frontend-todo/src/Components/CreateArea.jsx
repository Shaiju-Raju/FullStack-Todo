import { useState } from "react"
export default function CreateArea (props) {

    const [item, setItem] = useState("")

    function handleChange (event) {
        const newValue = event.target.value
        setItem(newValue)
  }

  function submitItem (event) {
    props.onAdd(item)
    setItem("")
  }


  return (
    <div className="todo-header">
        <input 
        onChange={handleChange}
        value={item}
        type="text"
        placeholder="Enter To Do Item Here"
        id="todo-input" />
        <button onClick={submitItem} id="add-btn">Add Now</button>
    </div>
  )

}