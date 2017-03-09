import React from 'react';
import range from 'lodash/range';
import {presets,spring,TransitionMotion} from 'react-motion';



export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
			todos : [
        {key: '1',data:{text:'wake up',isDone:false}},
        {key: '2',data:{text:'Run',isDone:false}},
        {key: '3',data:{text:'Prepare Breakfast',isDone:false}},
      ],
      value :'',
      filter : 'all'
		};
  }
  handlechange = (e)=>{
      this.setState({value:e.target.value})
  }
  addTodo = (e) =>{
    e.preventDefault();
    this.setState({
      todos:[
        {
          key: ''+Date.now(),data:{text:this.state.value,isDone:false}
        },
        ...this.state.todos

      ],
      value :''
    });
  }
  toggleDone = selectedKey =>{
    this.setState({
      todos: this.state.todos.map(todo => {
        const {key, data: {text, isDone}} = todo;
        return key === selectedKey
          ? {key: key, data: {text: text, isDone: !isDone}}
          : todo;
      })
    });
  }
  changeFilter =(filter)=>   {
    this.setState({filter})
  }
  removeTodo = (todoKey)=>{
    this.setState({
      todos:this.state.todos.filter(
        ({key}) => key !== todoKey
      )
    })
  }
  toggleAllTodos = () =>{
    const areAllNotDone = this.state.todos.every(
      ({data}) => data.isDone
    );
    this.setState({
      todos:this.state.todos.map(
        ({key,data:{text,isDone}}) =>({key,data:{text,isDone:!areAllNotDone}})
      ),
    });
  }
  getDefaultStyles = () => {
    return this.state.todos.map(todo => ({...todo, style: {height: 0, opacity: 1}}));
  }
  getStyles(){
    const {todos,value,filter} = this.state;
    return todos.filter(
      ({data:{isDone,text}}) => text.toUpperCase().indexOf(value.toUpperCase()) >= 0 &&
                              (filter == 'compleated' && isDone ||
                               filter == 'active' && !isDone ||
                               filter == 'all'
                              )
    ).map(
      todo => ({
        ...todo,
        style: {
          height: spring(60, presets.gentle),
          opacity: spring(1, presets.gentle),
        }
      })
    )
  }
  willEnter() {
    return {
      height: 0,
      opacity: 1,
    };
  }

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
    };
  }
  getDefaultStyles() {
    return this.state.todos.map(todo => ({...todo, style: {height: 0, opacity: 1}}));
  }
  render(){
    const {todos, value, filter} = this.state;
    return(
      <div className = ''>
      <header>
        <h1>Todos</h1>
      </header>
      <div className = 'container main' >
          <form onSubmit ={this.addTodo}>

          <input autoFocus={true} onChange = {this.handlechange} value ={value} className ='add'/>
          </form>
          <section>
            <TransitionMotion
               defaultStyles={this.getDefaultStyles()}
               styles={this.getStyles()}
               willLeave={this.willLeave}
               willEnter={this.willEnter}
            >
            {
              styles =>
                <ul className = 'todos'>
                      {
                        styles.map(
                          ({key, style, data: {isDone, text}}) =>

                          <li key ={key} style = {style} className = {isDone ? 'isDone':''}
                           >
                           <div className = 'todo'>
                           <input
                            className="toggle"
                            type="checkbox"
                            id = 'togge'
                            onChange={() => this.toggleDone(key)}
                            checked={isDone}
                          />
                          <label htmlFor="toggle" >
                            <div className ='icon'>
                            {!isDone && <i className="fa fa-pencil fa-2x" aria-hidden="true" onClick={() => this.toggleDone(key)}></i>}
                            {isDone && <i className="fa fa-eraser fa-2x" aria-hidden="true" onClick={() => this.toggleDone(key)}></i>}

                            </div>
                          </label>
                          <span className = 'text'>
                              <span>
                               {text}
                              </span>
                          </span>
                           </div>
                           </li>
                        )
                      }
                </ul>
            }
            </TransitionMotion>
          </section>

          <div>
            <h5>
            <a
              className={filter === 'all' ? 'selected' : ''}
              onClick={(e) => {this.changeFilter('all')}}>
              All
            </a>
            <a
              className={filter === 'active' ? 'selected' : ''}
              onClick={(e) => {this.changeFilter('active')}}>
              Active
            </a>
            <a
              className={filter === 'compleated' ? 'selected' : ''}
              onClick={(e) => {this.changeFilter('compleated')}}>
              compleated
            </a>
            </h5>
          </div>

      </div>
      </div>
    );
  }
}
