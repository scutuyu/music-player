import React from 'react';
import './musicListItem.less';
// import PubSub from 'pubsub-js';
let PubSub = require('pubsub-js');

class MusicListItem extends React.Component {
    playMusic(musicItem){
        PubSub.publish('PLAY_MUSIC', musicItem);
    }
    deleteMuic(musicItem, e){
        e.stopPropagation();
        // console.log('item ', musicItem);
        PubSub.publish('DELETE_MUSIC', musicItem);
    }
    render(){
        // console.log(this.props);
        let musicItem = this.props.musicItem;
        return (
            <li 
                onClick = {this.playMusic.bind(this, musicItem)}
                className={`row components-musiclistitem ${this.props.focus ? 'focus': ''}`}>
                <p>
                    <strong>{musicItem && musicItem.title}</strong> - {musicItem && musicItem.artist}
                </p>
                <p 
                    onClick = { this.deleteMuic.bind(this, musicItem) }
                    className="-col-auto delete"
                ></p>
            </li>
        );
    }
}

export default MusicListItem;