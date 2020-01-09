import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchWord: "upGrad",
      videoList: [],
      loading: null,
      currentVideoUrl: "",
      comment: "",
      listOfComments: [],
      like: "Like",
      isLoadingError: false,
      };
  }
  setSearchValue = event => {
    this.setState({
      searchWord: event.target.value
    });
    console.log(this.state.searchWord);
  };
  searchVideo = async () => {
    this.setState({
      loading: "LOADING",
      isLoadingError: false
    });
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&q=${
        this.state.searchWord
      }&type=video&videoDefinition=high&key=AIzaSyBmbhytIWxED85KVYuOgtuCHRSfreA5mU4`
    );
    const myJson = await response.json();
    console.log("myJson ", myJson);
    if (myJson.items.length == 0) {
      this.setState({
        isLoadingError: true
      });
    }
    this.setState({
      videoList: myJson.items
    });
    console.log(this.state.videoList);
    this.setState({
      loading: "LOADED"
    });
  };
  showMostPopularVideos = async () => {
    this.setState({
      loading: "LOADING"
    });
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&chart=upGrad=15&regionCode=IN&key=AIzaSyBmbhytIWxED85KVYuOgtuCHRSfreA5mU4`
    );
    const myJson = await response.json();
    console.log("myJson ", myJson);
    this.setState({
      videoList: myJson.items,
      loading: "LOADED"
    });
    console.log(this.state.videoList);
    this.setState({
      currentVideoUrl: this.state.videoList[0].id.videoId ,
     /* title: this.state.videoList[0].snippet.title */
      
    });
    console.log("currentVideoUrl", this.state.currentVideoUrl);
  };
  componentDidMount() {
    this.showMostPopularVideos();
    console.log("videoList", this.state.videoList);
  }
  setCurrentUrl = id => {
    this.setState({
      currentVideoUrl: id
    });
  };
  setComment = event => {
    this.setState({
      comment: event.target.value
    });
  };
  addComment = () => {
    this.setState({
      listOfComments: [...this.state.listOfComments, this.state.comment],
      comment: ""
    });
  };
  likeButton = () => {
    if (this.state.like == "Like") {
      this.setState({
        like: "Liked"
      });
    } else {
      this.setState({
        like: "Like"
      });
    }
  };
  render() {
    let videos = this.state.videoList.map(eachVideo => (
      <div>
      <img
        src={eachVideo.snippet.thumbnails.high.url}
        style={{ height: "200px", cursor: "pointer" }}
        onClick={() => this.setCurrentUrl(eachVideo.id.videoId)}
      />
      
      </div>
    ));
    return (
      <div>
        <input
          style={{ marginLeft: "457px", width: "400px" }}
          placeholder="upGrad"
          onChange={this.setSearchValue}
        />
        <button onClick={this.searchVideo}>Search</button>
        <br />
        <div>
          <hr />

          {this.state.isLoadingError ? (
            <h1>No search found</h1>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${
                this.state.currentVideoUrl
              }`}
              style={{ height: "400px", width: "840px", float: "left" }}
            />
            
          )}
          
        </div>
        <br />
        

        <br />
        <br />
        <br />
        
        <div style={{ width: "400px", float: "right" }}>
          {this.state.loading == "LOADING" ? <h1>Loading...</h1> : videos}
        </div>
        <div style={{ display: "block", float: "left" }}>
        <br />
          <h1>{this.state.title}</h1>
          <br />
          <h1>{this.state.channel}</h1>
          <button
            style={{
              marginLeft: "790px",
              backgroundColor: " red",
              padding: "12px"
            }}
            
            onClick={this.likeButton}
          >
            {this.state.like}
          </button>
          {this.state.listOfComments.map(eachComment => (
            <li>{eachComment}</li>
          ))}
          
          <h3> comments</h3>
          <input
            style={{
              outline: 0,
              border: "0",
              borderBottom: "2px solid #484a56",
              width: "300px"
            }}
            onChange={this.setComment}
            placeholder="Upgrad"
            value={this.state.comment}
          />

          <input
            style={{
              outline: 0,
              border: "0",
              borderBottom: "2px solid #484a56",
              marginLeft: "45px",
              width: "300px"
            }}
            onChange={this.setComment}
            placeholder="Your Comment"
            value={this.state.comment}
          />
          
          <br />
          <br />
          
          <button
            style={{ marginLeft: "580px", width: "120px" }}
            onClick={this.addComment}
          >
            {" "}
            Comment
          </button>
          <button
            onClick={this.addComment}
            style={{ marginLeft: "20px", width: "120px" }}
          >
            {" "}
            cancel
          </button>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
