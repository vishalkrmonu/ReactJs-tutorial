import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spin from "./Spin";
import PropTypes from 'prop-types';
import InfinteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"

  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }

 capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("hello  i am constructor from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category) } - NewsMonkey`;
  }




  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=74872a9b8e6944feb7b8f84c3f37a3bf&page=1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);

    let parsedData = await data.json();
    this.props.setProgress(70);

    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);

  }

  async componentDidMount() {
    this.updateNews();

  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 })
    this.updateNews();
  };


  fetchMoreData= async ()=>{
      this.setState ({page:this.state.page + 1})
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=74872a9b8e6944feb7b8f84c3f37a3bf&page=1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  }

  render() {
    return (
      <div className="conatiner my-3">
        <h1 className="text-center" style={{ margin: '35px opx' }}>NewsMonkey - Top  {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>
        {this.state.loading && <Spin />}

        <InfinteScroll  
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spin />}

>
  <div className="container">

        <div className="row">
          {
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4 " key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageurl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
  </div>

        </InfinteScroll>

        <div className="conatiner d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
