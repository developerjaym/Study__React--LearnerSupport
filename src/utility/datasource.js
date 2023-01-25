class Datasource {
  static #id_counter = 999;
  constructor(articles = []) {
    this.articles = articles;
  }
  getAll() {
    return structuredClone(this.articles)
  }
  getArticle(articleId) {
    return this.articles.find(article => article.id === Number(articleId))
  }
  addArticle(tags, question) {
    question.id = ++Datasource.#id_counter;
    question.author = {
      name: "ASKER",
      rating: 5,
    };
    question.comments = [];
    question.upvotes = 0;
    question.type = "QUESTION";
    const newArticle = {
      question,
      id: ++Datasource.#id_counter,
      timestamp: new Date().toUTCString(),
      tags,
      title: question.title,
      answers: [],
    };
    this.articles.push(newArticle);
  }
  addAnswer(articleId, answer) {
    answer.author = {
      author: "ANSWERER",
      rating: 5,
    };
    answer.type = "ANSWER";
    answer.comments = [];
    answer.upvotes = 0;
    answer.id = ++Datasource.#id_counter;
    const article = this.articles.find(
      (article) => article.id === Number(articleId)
    );
    article.answers.push(answer);
  }
  addComment(articleId, postId, comment) {
    comment.id = ++Datasource.#id_counter;
    const article = this.articles.find(
      (article) => article.id === Number(articleId)
    );
    const post =
      article.question.id === Number(postId)
        ? article.question
        : article.answers.find((answer) => answer.id === Number(postId));
    post.comments.push(post);
  }
  selectAnswer(articleId, answerId) {
    const article = this.articles.find(
      (article) => article.id === Number(articleId)
    );
    const answer = article.answers.find(
      (answer) => answer.id === Number(answerId)
    );
    answer.selected = true;
  }
}

const datasource = new Datasource([{
    id: 1, 
    title: "What is a String?",
    tags: ["Python", "Datatypes"],
    question: {
      id: 2,
      type:"QUESTION",
      content: "I'm confused by ```String```. Should I use Strings in my program?",
      upvotes: 10,
      comments: [
        {
          id: 3,
          content: "This.",
          author: {
            name: "monica4president",
            rating: 5
          }
        },
        {
          id: 4,
          content: "Why do you want a String? Strings are bad practice. This sounds like an XY problem.",
          author: {
            name: "user908235",
            rating: 2
          }
        }
      ],
      timestamp: "2015-01-01T00:00:00.000Z",
      author: {
        name: "Jay",
        rating: 5,
      },
    },
    answers: [
      {
        id: 5,
        type:"ANSWER",
        content: `Strings are for *quotations* and **other things**.
        
  # DO NOT USE 
  They don't do anything
  
  > Answers are ~sometimes~ **always** easy to find here: https://google.com.
  
  `,
        upvotes: 100,
        comments: [],
        timestamp: "2015-02-02T00:00:00.000Z",
        selected: true,
        author: {
          name: "Tom",
          rating: 2
        }
      },
      {
        id: 6,
        type:"ANSWER",
        content: "Check out this link. https://google.com",
        upvotes: -3,
        comments: [],
        timestamp: "2015-02-03T00:00:00.000Z",
        author: {
          name: "Thomas",
          rating: 5
        }
      },
    ],
  }]);


export {datasource}