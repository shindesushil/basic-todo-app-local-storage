import React, { useEffect, useState } from "react"
import {v4} from "uuid"

import {
  Input,
  InputGroup,
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap"

import {
  FaCheckDouble
} from "react-icons/fa"


import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

const App = () => {

  const [todos, setTodos] = useState([])
  const [todoString, setTodoString] = useState("")
  const [currentView, setCurrentView] = useState(1)

  useEffect(async () => {
    const locatTodos = await localStorage.getItem("todos")
    if(locatTodos)
    {
      setTodos(JSON.parse(locatTodos))
    }
  }, [])

  const addTodo = async () => {
    

    const todoToAdd = {
      todoString,
      id:v4(),
      isDone : false
    }

    

    let allTodos = todos
    allTodos.push(todoToAdd)
    setTodos(allTodos)

    await localStorage.setItem("todos",JSON.stringify(todos))

    console.log(todos[todos.length -1]);

    setTodoString("")

  }

  const markComplete = async todoID => {
    todos.map(todo => {
      todo.id === todoID && todo.isDone !== true ? todo.isDone = true : 
      console.log(todo);
    })

    await localStorage.setItem("todos",JSON.stringify(todos))
  }

  const clearTodos = () => {
    setTodos([])
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const RemainingTodos = () => {
    const remainingTodos = todos.filter(todo => todo.isDone === false)
    return(
        <>
            <ListGroup>
              {
                remainingTodos.map(todo => {
                  return(
                    <ListGroupItem key={todo.id}>
                      {todo.todoString}
                      <span style={{float:"right"}} className={todo.isDone ? "completed" : ""} onClick={() => markComplete(todo.id)}>
                        <FaCheckDouble />
                      </span>
                    </ListGroupItem>
                  )
                })
              }
            </ListGroup>
        </>
    )
  }
  

  const AllTodos = () => {
    
    return(
        
            <ListGroup>
              {
                todos.map(todo => {
                  return(
                    <ListGroupItem key={todo.id}>
                      {todo.todoString}
                      <span style={{float:"right"}} className={todo.isDone ? "completed" : ""} onClick={() => markComplete(todo.id)}>
                        <FaCheckDouble />
                      </span>
                    </ListGroupItem>
                  )
                })
              }
            </ListGroup>
        
    )
  }

  const CompletedTodos = () => {
    const completedTodos = todos.filter(todo => todo.isDone !== false)
    return(
        <>
            <ListGroup>
              {
                completedTodos.map(todo => {
                  return(
                    <ListGroupItem key={todo.id}>
                      {todo.todoString}
                      <span style={{float:"right"}} className={todo.isDone ? "completed" : ""} onClick={() => markComplete(todo.id)}>
                        <FaCheckDouble />
                      </span>
                    </ListGroupItem>
                  )
                })
              }
            </ListGroup>
        </>
    )
  }

  return(
    <>
      <div className="wrapper">
        <div className="todo-form">
          <h1>ToDo</h1><br/>
            <InputGroup>
              <Input
                type="text"
                placeholder="Enter Task Here"
                value={todoString}
                onChange={e => setTodoString(e.target.value)}
              />
              <Button className="btn-info" onClick={() => addTodo()}>ADD</Button>
            </InputGroup>

            <br/>

            <InputGroup className="options">
              <Button className={currentView === 1 ? "active-btn" : ""} onClick={() => setCurrentView(1)}>All</Button>
              <Button className={currentView === 2 ? "active-btn" : ""} onClick={() => setCurrentView(2)}>Completed</Button>
              <Button className={currentView === 3 ? "active-btn" : ""} onClick={() => setCurrentView(3)}>Remaining</Button>
            </InputGroup>


        </div>
        <div className="todo-list">
            {
              currentView === 1 ? <AllTodos/> : currentView === 2 ? <CompletedTodos/> : <RemainingTodos/>
            }
        </div>
        <Button className="btn-danger btn-clear" onClick={clearTodos} disabled={todos.length === 0 ? true : false}>
          Clear ToDos
        </Button>
      </div>
    </>
  )
}


export default App;