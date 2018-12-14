import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const APIkey = ''; // your youtube api key
var channellink;
var videonumbers;
var finalURL;

class Youtube extends Component {

  constructor(props){
    super(props);
    this.state = {
      resultyt: [],
    };
    
   this.clicked = this.clicked.bind(this);
  }
clicked(){
  channellink = this.takenfromuser.value;
  channellink = channellink.substr(channellink.lastIndexOf('/')+1); 
  videonumbers = this.number.value; 
  if(channellink =='' || videonumbers=='')
  {
    alert("Fill in the blanks");
  }
  else if(videonumbers>50)
  {
    alert("Number which you entered cannot greater than 50");
    videonumbers = 50;
    document.getElementById("checknumber").value = 50;
  }
  else if(videonumbers<=0)
  {
    alert("Number which you entered cannot equal 0 or less then 0");
    videonumbers = 2;
    document.getElementById("checknumber").value = 2;
  }
  
  finalURL = `https://www.googleapis.com/youtube/v3/search?key=${APIkey}&channelId=${channellink}&part=snippet,id&order=date&maxResults=${videonumbers}`
  //
  fetch(finalURL)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        const resultyt = responseJson.items.map(obj => obj);
        this.setState({resultyt});
      })
      .catch((error) => {
        console.error(error);
      });
}

  render(){
    return(
      <div className="body">
        <br/>
        <form>
          <div className="form-group">
            <input placeholder="Enter youtube channel link or ID - Example : https://www.youtube.com/channel/UCpdSUUHlxMjO0c5824FGcsA or just UCpdSUUHlxMjO0c5824FGcsA" className="form-control input-lg font-weight-bold" type="text" ref={takenlink => this.takenfromuser=takenlink} /><br/>
            <input id="checknumber" placeholder="How many video/s do you want to get? Min Value:1 and Max Value: 50" className="form-control input-lg font-weight-bold" type="number" ref={videonumber => this.number=videonumber} />
          </div>
        </form>
        <button className="btn btn-outline-danger" onClick={this.clicked}><b>Get from YouTube</b></button><br/><br/>
          {
            this.state.resultyt.map((link) => {
              const ytlink = `https://www.youtube.com/embed/${link.id.videoId}`;
              var videos = 
              <div className="youtube">
                <ul><b>{link.snippet.title}</b></ul>
                <iframe width="50%" height="50%" src={ytlink} allowFullScreen />     
              </div>
              return videos;      
            })
          }
    </div>
    );
  }
}

export default Youtube;
