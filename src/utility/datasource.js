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
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/articles`, requestOptions)
    const articles = await response.json();
    return articles;
  }
  async getArticle(articleId) {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/articles/${articleId}`, requestOptions)
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
      tags,
      posts: [question]
    }
    var raw = JSON.stringify(makeMe);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/articles`, requestOptions)
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
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/articles/${articleId}/answers`, requestOptions)
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
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/articles/${articleId}/posts/${postId}/comments`, requestOptions)
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
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/articles/${articleId}/posts/${postId}/votes`, requestOptions)
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
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/articles/${articleId}/posts/${postId}/selected`, requestOptions)
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
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/articles/${articleId}/posts/${postId}/selected`, requestOptions)
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

const datasource = new Datasource();

export { datasource };
