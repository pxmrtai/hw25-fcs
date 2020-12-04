import React, { Component } from "react";

import "./App.css";
import TodoItem from "./components/TodoItem";
import checkAll from "./img/check-all.svg";

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: "",
      todoItem: [
        { title: "Go to market", isComplete: true },
        { title: "Buy food",isComplete: true },
        { title: "Make dinner",isComplete: false},
      ],
    };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);

  }
  onItemClicked(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItem } = this.state;
      const index = todoItem.indexOf(item);
      this.setState({
        todoItem: [
          ...todoItem.slice(0, index),
          {
            ...item,
            isComplete: !isComplete,
          },
          ...todoItem.slice(index + 1),
        ],
      });
    };
  }
  onKeyUp(event) {
    let text = event.target.value;
    if (event.keyCode === 13) {
      if (!text) {
        return;
      }
      text = text.trim();
      if (!text) {
        return;
      }
      this.setState({
        newItem: '',
        todoItem: [{ title: text, isComplete: false }, ...this.state.todoItem],
      });
    }
  }

  onChange(event){
    this.setState({
      newItem: event.target.value
    })
  }

  render() {
    const { todoItem, newItem } = this.state;
    return (
      <div className="App">
        <div className="header">
          <img src={checkAll} width={32} height={32} alt='img' />
          <input
            type="text"
            placeholder="Add things to do"
            value={newItem}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
          />
        </div>
        {todoItem.length > 0 &&
          todoItem.map((item, index) => (
            <TodoItem
              key={index}
              item={item}
              onClick={this.onItemClicked(item)}
            />
          ))}
        {todoItem.length === 0 && "nothing here..."}
      </div>
    );
  }
}

export default App;
