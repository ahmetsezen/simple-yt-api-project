import React, {Component} from 'react';
const APIkey = 'AIzaSyB-3WnLgP8tCLsIfBm0yEGlD27WEamCnAE'; // your youtube api key

class Youtube extends Component {
  constructor(props){
    super(props);
    this.state = {
      youtubeResults: [],
      channelLink: "UCvKJz6PqcK4-OhUXJWDAoBg",
      videoNumbers: 1,
      loader:false,
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit = (event) => {
  let channelId; 
  let finalVideoNumber;
  if ( this.state.videoNumbers > 50 ) finalVideoNumber = 50;
  else if ( this.state.videoNumbers <= 1 ) finalVideoNumber =1;
  else finalVideoNumber = this.state.videoNumbers;
  if(this.state.channelLink.length <= 25) channelId = this.state.channelLink;
  else channelId = this.state.channelLink.substr(this.state.channelLink.lastIndexOf('/')+1);
  this.setState({loader:true})
  let finalURL;
  finalURL = `https://www.googleapis.com/youtube/v3/search?key=${APIkey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${finalVideoNumber}`
  fetch(finalURL)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        const youtubeResults = responseJson.items.map(obj => obj);
        this.setState({ youtubeResults });
        this.setState({ loader:false })
      })
      .catch((error) => {
        console.error("asd: " + error.errors);
      });
  event.preventDefault();
}

  render(){
    return(
      <div className="container">
        <br/>
        
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input onChange={this.handleChange} name="channelLink" placeholder="Enter youtube channel link or ID - Example : https://www.youtube.com/channel/UCpdSUUHlxMjO0c5824FGcsA or just UCpdSUUHlxMjO0c5824FGcsA" className="form-control input-lg" type="text"/>
          </div>
          <div className="form-group">
            <input onChange={this.handleChange} name="videoNumbers" placeholder="How many video/s do you want to get? Min Value:1 and Max Value: 50" className="form-control input-lg" type="number"  />
          </div>
          <div className="form-group">
            <button className="btn btn-outline-danger" onClick={this.clicked}><b>Get from YouTube</b></button>
          </div>
        </form>
        <p>Videos will be listed by date</p>
         {
           this.state.loader === true ?
            <div className="row">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            :
            <div className="row">
            {
              this.state.youtubeResults.map((link, index) => {
                let ytlink = `https://www.youtube.com/embed/${link.id.videoId}`;
                var videos = 
                <div key={index} className="col-md-4">   
                      <div className="card-img-top">
                        <iframe key={index} title={link.id.videoId} style={{borderRadius:"10px 10px"}} width="100%" height="100%" src={ytlink} allowFullScreen />
                      </div>
                      <div className="card-body">
                          <h5 className="card-title">{link.snippet.title}</h5>
                      </div>
                </div>
                return videos;      
              })
            }
            </div>
         }
    </div>
    );
  }
}
export default Youtube;