import "./Card.css";

export default function Card({title, subtitle, children}) {
    return (<div className="card">
    <div className="card__header">
        <div className="card__title">{title}</div>
        <div className="card__subtitle">subtitle</div>
    </div>
    <div className="card__body">
       {children}
    </div>
</div>)
}