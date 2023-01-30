import { authentication } from "./authentication";

class Datasource {
  static #id_counter = 999;
  constructor(articles = []) {
    this.articles = articles;
  }
  getAll() {
    return structuredClone(this.articles);
  }
  getArticle(articleId) {
    return this.articles.find((article) => article.id === Number(articleId));
  }
  addArticle(tags, question) {
    question.id = ++Datasource.#id_counter;
    question.author = authentication.user;
    question.comments = [];
    question.upvotes = 0;
    question.type = "QUESTION";
    const newArticle = {
      posts: [question],
      id: ++Datasource.#id_counter,
      timestamp: this.#timestamp(),
      tags,
      title: question.title,
      answers: [],
    };
    this.articles.push(newArticle);
    return newArticle;
  }
  addAnswer(articleId, answer) {
    answer.author = authentication.user;
    answer.type = "ANSWER";
    answer.comments = [];
    answer.upvotes = 0;
    answer.id = ++Datasource.#id_counter;
    const article = this.articles.find(
      (article) => article.id === Number(articleId)
    );
    article.posts.push(answer);
    return answer;
  }
  addComment(articleId, postId, comment) {
    comment.id = ++Datasource.#id_counter;
    comment.author = authentication.user;
    const post = this.#findPost(postId);
    post.comments.push(comment);
    console.log('comment', comment);
  }
  vote(articleId, postId, up) {
    const post = this.#findPost(postId);
    post.upvotes = post.upvotes + (up ? 1 : -1);
  }
  #findPost(postId) {
    return this.articles
      .map((article) => article.posts)
      .flat()
      .find((post) => post.id === Number(postId));
  }
  #findArticle(postId) {
    return this.articles.find(
      (article) =>
        article.posts.find((post) => post.id === Number(postId))
    );
  }
  #timestamp() {
    return new Date().toISOString();
  }
  isSelectable(answerId) {
    return this.articles
      .find((article) =>
        article.posts.filter(post => post.type === 'ANSWER').find((answer) => answer.id === Number(answerId))
      )
      .posts.filter(post => post.type === 'ANSWER').every((answer) => !answer.selected);
  }
  selectAnswer(articleId, answerId) {
    if (this.isSelectable(answerId)) {
      const article = this.articles.find((article) =>
        article.posts.find((answer) => answer.id === Number(answerId))
      );
      article.posts.filter(post => post.type === 'ANSWER').forEach(
        (answer) => (answer.selected = answer.id === Number(answerId))
      );
    }
  }
  deselectAnswer(articleId, answerId) {
    const article = this.articles.find((article) =>
      article.posts.find((answer) => answer.id === Number(answerId))
    );
    article.posts.filter(post => post.type === 'ANSWER').forEach((answer) => (answer.selected = false));
  }
}

const datasource = new Datasource([
  {
    "id": 7,
    "posts": [
        {
            "author": {
                "img": null,
                "username": "teacher"
            },
            "comments": [],
            "content": "Did ```this``` get duplicated?",
            "id": 3,
            "selected": false,
            "timestamp": "2023-01-30T02:18:02",
            "type": "QUESTION",
            "votes": []
        },
        {
            "author": {
                "img": null,
                "username": "teacher"
            },
            "comments": [
                {
                    "author": {
                        "img": null,
                        "username": "teacher"
                    },
                    "content": "This.",
                    "id": 1,
                    "timestamp": "2023-01-30T19:19:50"
                }
            ],
            "content": "This ```is``` the answer?",
            "id": 4,
            "selected": false,
            "timestamp": "2023-01-30T19:15:05",
            "type": "ANSWER",
            "votes": [
                {
                    "author": {
                        "img": null,
                        "username": "teacher"
                    },
                    "up": true
                }
            ]
        }
    ],
    "tags": [
        "QA",
        "Testing",
        "Postman"
    ],
    "timestamp": "2023-01-30T02:18:02",
    "title": "Does anything get duplicated?"
}
  // {
  //   id: 1,
  //   title: "What is a String?",
  //   tags: ["Python", "Datatypes"],
  //   timestamp: "2015-01-01T00:00:00.000Z",
  //   posts: [
  //     {
  //       id: 2,
  //       type: "QUESTION",
  //       content:
  //         "I'm confused by ```String```. Should I use Strings in my program?",
  //       upvotes: 10,
  //       comments: [
  //         {
  //           id: 3,
  //           content: "This.",
  //           author: {
  //             username: "monica4president",
  //             rating: 5,
  //           },
  //         },
  //         {
  //           id: 4,
  //           content:
  //             "Why do you want a String? Strings are bad practice. This sounds like an XY problem.",
  //           author: {
  //             username: "user908235",
  //             rating: 2,
  //           },
  //         },
  //       ],

  //       author: {
  //         username: "Jay",
  //         rating: 5,
  //       },
  //     },
  //     {
  //       id: 5,
  //       type: "ANSWER",
  //       content: `Strings are for *quotations* and **other things**.
        
  // # DO NOT USE 
  // They don't do anything
  
  // > Answers are ~sometimes~ **always** easy to find here: https://google.com.
  
  // `,
  //       upvotes: 100,
  //       comments: [],
  //       timestamp: "2015-02-02T00:00:00.000Z",
  //       selected: true,
  //       author: {
  //         username: "Tom",
  //         rating: 2,
  //       },
  //     },
  //     {
  //       id: 6,
  //       type: "ANSWER",
  //       content: "Check out this link. https://google.com",
  //       upvotes: -3,
  //       comments: [],
  //       timestamp: "2015-02-03T00:00:00.000Z",
  //       author: {
  //         username: "Thomas",
  //         rating: 5,
  //       },
  //     },
  //   ],
  // },
]);

export { datasource };
