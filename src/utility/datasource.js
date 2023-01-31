import { authentication } from "./authentication";

class Datasource {
  #articleCache;
  
  get article() {
    return structuredClone(this.#articleCache)
  }
  async getAll() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const response = await fetch("http://127.0.0.1:5000/articles", requestOptions)
    const articles = await response.json();
    return articles;
  }
  async getArticle(articleId) {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const response = await fetch(`http://127.0.0.1:5000/articles/${articleId}`, requestOptions)
    const article = await response.json();
    this.#articleCache = article;
    return article;
  }
  async addArticle(tags, question) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authentication.token}`);
    myHeaders.append("Content-Type", "application/json");
    
    const makeMe =  {
      title: question.title,
      tags, // TODO tags
      posts: [question]
    }
    var raw = JSON.stringify(makeMe);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    const response = await fetch("http://127.0.0.1:5000/articles", requestOptions)
    const article = await response.json()
    return article;
  }
  async addAnswer(articleId, answer) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authentication.token}`);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify(answer);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    const response = await fetch(`http://127.0.0.1:5000/articles/${articleId}/answers`, requestOptions)
    const post = await response.json()
    this.#articleCache.posts.push(post);
    return post;
  }
  async addComment(articleId, postId, comment) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authentication.token}`);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify(comment);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    const response = await fetch(`http://127.0.0.1:5000/articles/${articleId}/posts/${postId}/comments`, requestOptions)
    comment = await response.json()
    this.#articleCache.posts.find(post => post.id === postId).comments.push(comment);
    return comment;
  }
  async vote(articleId, postId, up) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authentication.token}`);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({up});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    const response = await fetch(`http://127.0.0.1:5000/articles/${articleId}/posts/${postId}/votes`, requestOptions)
    const voteResponse = await response.json()
    this.#articleCache.posts.find(post => post.id === postId).votes = this.#articleCache.posts.find(post => post.id === postId).votes.filter(vote => vote.author.username !== authentication.user.username);
    this.#articleCache.posts.find(post => post.id === postId).votes.push(voteResponse);
    return voteResponse;
  }
  
  async selectAnswer(articleId, postId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authentication.token}`);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/articles/${articleId}/posts/${postId}/selected`, requestOptions)
      await response.text()
      this.#articleCache?.posts?.forEach(post => post.selected = post.id === postId)
      return true;
    } catch(e) {
      return false;
    }
  }
  async deselectAnswer(articleId, postId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authentication.token}`);
    myHeaders.append("Content-Type", "application/json");
        
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/articles/${articleId}/posts/${postId}/selected`, requestOptions)
      await response.text()
      this.#articleCache?.posts?.forEach(post => post.selected = false)
      return true;
    } catch(e) {
      return false;
    }
  }
  isSelectable(articleId) {
    if(this.#articleCache?.id === articleId && this.#articleCache?.posts?.find(post => post.type === 'QUESTION')?.author?.username === authentication.user.username) {
      return this.#articleCache.posts.every(post => !post.selected)
    }
    return true;
  }
  isDeselectable(articleId, postId) {
    if(this.#articleCache?.id === articleId && this.#articleCache?.posts?.find(post => post.type === 'QUESTION')?.author?.username === authentication.user.username) {
      return this.#articleCache.posts.some(post => post.id === postId && post.selected)
    }
    return true;
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
