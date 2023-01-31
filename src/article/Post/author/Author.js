import "./Author.css"

export default function Author({author, postType}) {
    return (
        <div className={`author-metadata ${postType === 'ANSWER' ? 'author-metadata--answer' : 'author-metadata--question'}`}>
        <div className="author__name">{postType === 'ANSWER' ? 'Answered by' : 'Asked by'} {author.username}</div>
        {/* <div className="author__history">
          <div className="author__points">
            {Array(author.rating).fill("⭐").join("")}
          </div>
        </div> */}
      </div>
    )
}