import { useNavigate } from "react-router-dom";
import { datasource } from "../../../../utility/datasource";
import CreateQuestionForm from "../form/CreateQuestionForm";
import "./CreatePostPage.css";

export default function CreateQuestionPage() {
    const navigate = useNavigate();
    const onSubmit = async value => {
        const {id} = await datasource.addArticle([], value); // TODO tags
        navigate(`/question/${id}`)
    }
    return (<div className="page">
        <CreateQuestionForm onSubmit={onSubmit}/>
    </div>)
}