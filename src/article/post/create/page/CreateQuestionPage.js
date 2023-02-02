import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSymbol from "../../../../dialog/loading/LoadingSymbol";
import { datasource } from "../../../../utility/datasource";
import CreateQuestionForm from "../form/CreateQuestionForm";
import "./CreatePostPage.css";

export default function CreateQuestionPage() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (value) => {
    setLoading(true);
    const { id } = await datasource.addArticle(value.tags, value);
    navigate(`/question/${id}`);
    setLoading(false);
  };
  return (
    <>
      <div className="page">
        <CreateQuestionForm onSubmit={onSubmit} />
      </div>
      <LoadingSymbol open={isLoading} />
    </>
  );
}
