import React from 'react';
import './progress.less';
/**
 * state and props
 * 
 * react 生命周期
 * constructor
 * getInitialState
 * componentWillMount
 * render
 * componentDidMount
 * componentWillUnmount
 * 
 * ref属性， 只要定义了ref属性react就会把这些真实dom节点收集到一个叫ref的属性里面，我们可以通过refs属性去取
 * 
 * 16.x版本的react在调用react组件方法时需要调用bind(this)方法将this传递过去，低版本可以直接调
 * 
 * 组件间通信方式
 * 1. 父组件 -> 子组件
 * 2. 子组件 -> 父组件 回调函数
 * 3. 兄弟组件通信需要通过他们公共的父组件进行传递
 * 
 * 为解决兄弟组件以及深层次子组件向父组件通信的问题
 * 可以使用事件订阅的方式，https://github.com/mroderick/PubSubJS
 */
class Progress extends React.Component {
    changeProgress(e){
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        // console.log('---> progress ', progress)
        this.props.onProgressChange && this.props.onProgressChange(progress);
    }
    render(){
        return (
            <div className="components-progress"
            onClick={this.changeProgress.bind(this)}
            ref="progressBar"
            >
                <div className="progress" 
                style={{width: `${this.props.progress}%`, background: this.props.barColor}}
                
                ></div>
            </div>
        );
    }
}

Progress.defaultProps = {
    barColor: '#2f9842'
}

export default Progress;