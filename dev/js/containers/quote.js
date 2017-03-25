import React, {Component} from 'react';

//get api data
function loadAPI(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
        var json = JSON.parse(xobj.responseText);
        callback(json);
    }
  };
  xobj.send(null);
}

//escape html
function e(html){
  var unwanted = /(<([^>]+)>)/ig;
  return (html.replace(unwanted, ""));
}

class Quote extends Component {
    constructor(props) {
      super(props);
      this.state = {
          quote: "Get random quotes",
          author: 'made by https://github.com/rishoej',
      };
      this.newQuote = this.newQuote.bind(this);
    }
    newQuote() {
      var that = this;
      loadAPI(function(response) {
        let quote = response[0].content;
        let author = response[0].title;
        that.setState(prevState => ({
          quote: quote,
          author: author,
        }));
      });
    }
    render() {
        return (
            <div className="main-container">
                <h2 className="title">{e(this.state.quote)}</h2>
                <p className="text">- {e(this.state.author)}</p>
                <a className="twitter-share-button"
                  href={"https://twitter.com/intent/tweet?text=" + e(this.state.quote)}
                  target="_blank"
                  >
                  <div className="btn" onClick={this.share}>Share on Twitter</div>
                </a>
                <div className="btn right" onClick={this.newQuote}>New quote</div>
            </div>
        );
    }
}
export default Quote;
