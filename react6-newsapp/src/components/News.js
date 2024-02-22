import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  

  constructor() {
    super();
    console.log("hello  i am constructor from news component");
    this.state = {
      articles: [],
      loading: false ,
      page:1
    };
  }

async componentDidMount(){

  console.log("cdm");
  let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=74872a9b8e6944feb7b8f84c3f37a3bf&page=1&pagesize=20";
  let data=await fetch(url);
  let parsedData=await data.json()
  console.log(parsedData);
  this.setState({articles:parsedData.articles,totalResults: parsedData.totalResults})
}


handlePrevClick = async()=>{
console.log("previous");
let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=74872a9b8e6944feb7b8f84c3f37a3bf&page=${this.state.page-1}&pagesize=20`;
  let data=await fetch(url);
  let parsedData=await data.json()
  console.log(parsedData);
  this.setState({
    page:this.state.page-1,
    articles:parsedData.articles

  })
}


handleNextClick = async()=>{
  console.log("Next");
  if(this.state.page + 1> Math.ceil(this.state.totalResults/20)){

  }

else{
  let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=74872a9b8e6944feb7b8f84c3f37a3bf&page=${this.state.page+1}&pagesize=20`;
  let data=await fetch(url);
  let parsedData=await data.json()
  console.log(parsedData);
  this.setState({
    page:this.state.page+1,
    articles:parsedData.articles

  })
}
}


  render() {
    console.log("render");
    return (
      <div className="conatiner my-3">
        <h2>NewsMonkey - Top HeadLines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
             return <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title:""}
                  description={element.description?element.description:""}
                  imageurl={element.urlToImage}
                  newsUrl={element.url}/>
              </div>
          })}
        </div>
        <div className="conatiner d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    );
  }
}

export default News;
