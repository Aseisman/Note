import React from 'react';
import {is} from 'immutable';

const Loading = ()=><div>Loading</div>
/**
 * 实现路由的分割
 * @param {*} loadComponent  ()=>import('./components/Home')
 */
export function dynamic(loadComponent){
    const LazyComponent = lazy(loadComponent);
    return ()=>(
        <React.Suspense fallback={<Loading/>}>
            <LazyComponent/>
        </React.Suspense>
    )
}
function lazy(loadComponent){
    return class extends React.Component{
        state = {Component:null}
        componentDidMount(){
            loadComponent().then(result=>{
                this.setState({Component:result.default});
            });
        }
        render(){
            const {Component} = this.state;
            return Component&&<Component/>;
        }
    }
}
export class PureComponent extends React.Component{
    shouldComponentUpdate(nextProps,nextState){
        //只要属性和状态都一样，就不更新，有一个不一样，就更新
        return !shallowEqual(this.props,nextProps) || !shallowEqual(this.state,nextState);
    }
}
/**
 * 对象深层对比
 * 比较两个对象相等，应该深比较，这样只比较一层，性能比较高
 * 不完美，性能较高，可以用Map进行优化
 * @param {*} obj1 
 * @param {*} obj2 
 */
function shallowEqual(obj1,obj2){
    if(obj1 === obj2){
        return true;
    }
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if(keys1.length != keys2.length){
        return false;
    }
    for(let key of keys1){
        //is(obj1[key], obj2[key])就是一个深比较，但是性能非常非常高
        //普通的比较obj1[key]!==obj2[key]
        if(!obj2.hasOwnProperty(key) || !is(obj1[key], obj2[key])){
            return false;
        }
    }
    return true;
}