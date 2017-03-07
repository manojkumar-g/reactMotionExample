import React from 'react';
import range from 'lodash/range';
import { Motion, StaggeredMotion, spring } from 'react-motion';



export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
			todos : [
        {key: 1,data:{text:'wake up',isDone:false}},
        {key: 2,data:{text:'Run',isDone:false}},
        {key: 2,data:{text:'Prepare Breakfast',isDone:false}},
      ],
      value :'',
      filter : 'all'
		};
  }
  handlechange = (e)=>{
    this.setState({value:this.state.value})
  }
  addTodo = ()=>{
    this.setState({
      todos:[
        ...this.state.todos,
        {
          key: Date.now(),data:{text:this.state.todos,isDone:false}
        }
      ]
    })
  }
  toggleDone = selectedKey =>{
    this.setState({
      todos:this.state.map(
        todo =>{
          const{key,data:{text,isDone}} = todo;
          return selectedKey==key ? {key,data:{text,isDone:!isDone}}:todo
        }
      )
    })
  }
  changeFilter =(filter)=>   this.setState({filter})
  removeTodo = (todoKey)=>{
    this.setState({
      todos:this.state.todos.filter(
        ({key}) => key !== todoKey
      )
    })
  }
  render(){
    return(
      <div className = 'container' onClick = {this.handlechange}>


      </div>
    );
  }
}
