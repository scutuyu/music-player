import React from 'react';
import MusicListItem from '../components/MusicListItem';
import './musicList.less';
import {MUSIC_LIST} from '../config/config.js';

class MusicList extends React.Component {
    
    render(){
        const musicList = this.props.musicList;
        const currentItem = this.props.currentItem;
        
        let listEle = null;
            listEle = musicList && musicList.map(((item) => {
                return (
                    <MusicListItem 
                        focus = {item === currentItem}
                        key = {item.id}
                        musicItem = {item}
                    >
                        {item.title}
                    </MusicListItem>
                );
            }))
        return (
            <ul>
                { listEle }
            </ul>
        );
    }
}

export default MusicList;