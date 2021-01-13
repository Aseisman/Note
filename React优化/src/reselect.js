/* import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(
  <App/>
    ,document.getElementById('root')); */
//reselect
import {createStore} from 'redux';    
//import {createSelector} from 'reselect';
let initialState = {
  count:{number:0},
  todos:[{text:'没完成',completed:false},{text:'完成了',completed:true}],
  filter:false
}
const reducer = (state=initialState,action)=>{
  switch(action.type){
    case 'ADD':
      return {...state,count:{...state.count,number:state.count.number+1}};
    default:
      return state;  
  }
}
let store = createStore(reducer);
const todosSelector = (state)=>state.todos;
const filterSelector = (state)=>state.filter;

function createSelector(selectors,map){
  let lastValue;
  return function(state){
    if(lastValue){
      return lastValue;
    }
    let values = selectors.map(selector=>selector(state));
    let result = map(...values);
    lastValue=result;
    return lastValue;
  }
}
const visibleTodosSelector = createSelector(
  [todosSelector,filterSelector],
  (todos,filter)=>{
    console.log('重新计算visibleTodos');
    return todos.filter(item=>item.completed==filter);
  }
);
const render = ()=>{
  let state = store.getState();//获取最新的状态
  console.log(state);
  const state1 = visibleTodosSelector(state);
  console.log(state1);
}
render();
store.subscribe(render);
store.dispatch({type:'ADD'});
store.dispatch({type:'ADD'});
store.dispatch({type:'ADD'});
//react-redux
//每个组件都要从总的状态对象获取 一部分属性 。只要这个组件需要的属性没更新，这个组件就不需要刷新

//最新版的react-router-dom useSelector
