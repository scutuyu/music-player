import React from 'react';
import Header from './components/Header';
import Player from './page/Player';
import MusicList from './page/MusicList';
import { BrowserRouter as Router, Route, } from 'react-router-dom'
import { MUSIC_LIST } from './config/config.js';
import PubSub from 'pubsub-js';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state =  {
      currentItem: MUSIC_LIST && MUSIC_LIST[0] || [],
      musicList: MUSIC_LIST,
      repeatList: [
        'cycle',
        'once',
        'random'
      ],
      repeatType: 'cycle'
    }
  }
  playMusic(musicItem){
    $('#player').jPlayer('setMedia', {
      mp3: musicItem && musicItem.file
    }).jPlayer('play');

    this.setState({
      currentItem: musicItem
    })
  }
  playNext(type = 'next'){
    let index = this.findMusicIndex(this.state.currentItem);

    let newIndex = null;
    let musicList = this.state.musicList;
    let n = musicList && musicList.length;
    if(type == 'next'){
      newIndex = (index + 1) % n;
    }else{
      newIndex = (index - 1 + n) % n;
    }
    this.playMusic(musicList[newIndex]);
  }
  findMusicIndex(musicItem){
    return this.state.musicList.indexOf(musicItem);
  }
  playWhenEnd(){
    let repeatType = this.state.repeatType;
    if(repeatType === 'once'){
      this.playMusic(this.state.currentItem);
    }else if(repeatType == 'cycle'){
      this.playNext();
    }else{
      let list = this.state.repeatList;
      let n = list.length;
      let index = list.indexOf(repeatType);
      let randomIndex = null;
      do{
        randomIndex = this.randomIntBetween(0, n);
      }while(index == randomIndex);
      
      this.playMusic(this.state.musicList[randomIndex]);
    }
  }
  randomIntBetween(start, end){
    return Math.ceil(Math.random() * (end - start) + start);
  }
  componentDidMount(){
    // $('#player').jPlayer('setMedia', {
    //   mp3: this.props.currentItem && this.props.currentItem.file
    // }).jPlayer({
		// 	supplied: "mp3",
		// 	wmode: "window",
		// 	useStateClassSkin: true
    // }).jPlayer('play');
    
    $('#player').jPlayer({
      // ready: () => {
      //   $(this).jPlayer('setMedia', {
      //     mp3: this.props.currentItem && this.props.currentItem.file
      //   }).jPlayer('play')
      // },
      supplied: 'mp3',
      wmode: 'window'
    });
    this.playMusic(this.state.currentItem);
    PubSub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem);
      this.setState({
        currentItem: musicItem
      })
    });          
    PubSub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter(item => (item !== musicItem))
      })
    });
    PubSub.subscribe('PLAY_PREV', (msg) => {
      this.playNext({ type: 'prev'});
      // this.playNext('prev');
    });
    PubSub.subscribe('PLAY_NEXT', (msg) => {
      this.playNext();
    });
    PubSub.subscribe('CHANAGE_REPEAT', (msg) => {
      let list = this.state.repeatList;
      let index = (list.indexOf(this.state.repeatType) + 1) % list.length;
      this.setState({
        repeatType: list[index]
      });
    });

    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.playWhenEnd();
    });
  }
  componentWillUnmount(){
    PubSub.unsubscribe('PLAY_MUSIC');
    PubSub.unsubscribe('DELETE_MUSIC');
    PubSub.unsubscribe('PLAY_PREV');
    PubSub.unsubscribe('PLAY_NEXT');
    PubSub.unsubscribe('CHANAGE_REPEAT');

    $('#player').unbind($.jPlayer.event.ended);
  }
  render(){
    let currentItem = this.state.currentItem;
    let musicList = this.state.musicList;
    let repeatType = this.state.repeatType;

    
    let RoutePlayer = ({params}) => (<Player currentItem = { currentItem } repeatType={repeatType}/>)
  
    let RouteMusicList = () => (<MusicList currentItem = { currentItem } musicList = { musicList }/>)

    return (
      <Router>
        <div>
          <Header />
          <Route exact path='/' component={RoutePlayer} />
          <Route exact path='/musicList' component={RouteMusicList} />
        </div>
      </Router>
    );
  }
}
  
  export default App;