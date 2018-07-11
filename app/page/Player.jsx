import React from 'react';
import Progress from '../components/Progress';
import PubSub from 'pubsub-js';

import './player.less';
import Link from '../../node_modules/.4.3.1@react-router-dom/Link';
import { MUSIC_LIST } from '../config/config.js';

let duration = null;
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            volume: 0,
            isPlay: true,
            leftTime: 0
        };
      }

    formatTime(time){
        // time = Math.floor(time);
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return `${minutes}:${seconds}`;
    }
    //   音量的值是0~1的值
    componentDidMount(){
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            // console.log(duration, '--->');
            
            this.setState({
                volume: e.jPlayer.options.volume * 100,
                progress: e.jPlayer.status.currentPercentAbsolute,
                leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
            });
            // console.log(this.state, '---> e');
            
        });
    }
    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    }
    changeProgressHandler(progress){
        // console.log(progress);
        
        $('#player').jPlayer('play', duration * progress);
    
    }
    changeVolumeHandler(progress){
        $('#player').jPlayer('volume', progress);
    }
    changeRepeat(){
        PubSub.publish('CHANAGE_REPEAT');
    }
    prev(){
        PubSub.publish('PLAY_PREV');
    }
    play(){
        if(this.state.isPlay){
            $('#player').jPlayer('pause');
        }else {
            $('#player').jPlayer('play');
        }
        this.setState({
            isPlay: !this.state.isPlay
        })
    }
    next(){
        PubSub.publish('PLAY_NEXT');
    }
    render(){
        let currentItem = this.props.currentItem;
        let repeatType = this.props.repeatType;
        // console.log(this.props.repeatType, '---> ');
        
        return (
            <div className="player-page">
                <h1 className="caption"><Link to='/musicList'>我的音乐 &gt;</Link></h1>
                <div className="mt2 row">
                    <div className="conroller-wrapper">
                        <h2 className="music-title">{currentItem && currentItem.title}</h2>
                        <h3 className="music-artist mt10">{currentItem && currentItem.artist}</h3>
                        <div className="row mt20">
                            {/* <div className="left-time -col-auto">{this.props.leftTime}</div> */}
                            <div className="left-time -col-auto">{this.state.leftTime}</div>
                            <div className="volume-container">
                                    <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                                    <div className="volume-wrapper">
                                            <Progress
                                                progress = {this.state.volume}
                                                onProgressChange = {this.changeVolumeHandler.bind(this)}
                                                barColor = '#aaa'
                                            />
                                        </div>
                                </div>
                        </div>
                        <div style={{height: 10, lineHeight: '10px'}}>
                            <Progress 
                                barColor = "#ff0000"
                                progress = {this.state.progress}
                                onProgressChange={this.changeProgressHandler.bind(this)}
                            />
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev" 
                                    onClick={this.prev.bind(this)}
                                />
                                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} 
                                    onClick={this.play.bind(this)}
                                />
                                <i className="icon next ml20" 
                                    onClick={this.next.bind(this)}
                                />
                            </div>
                            <div className="-col-auto">
                                <i className={`icon repeat-${repeatType}`} onClick={this.changeRepeat.bind(this)}></i>
                            </div>
                        </div>
                    </div>
                    <div className="-col-auto cover">
                        <img src={currentItem && currentItem.cover} alt={currentItem && currentItem.cover}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;