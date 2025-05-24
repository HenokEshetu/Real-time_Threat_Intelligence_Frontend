import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseOfActionDetail, useDeleteCourseOfAction } from "@/hooks/useCourseOfAction";

const CourseOfActionDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courseOfAction, loading: loadingDetail } = useCourseOfActionDetail(id);
  const { deleteCourseOfAction, loading } = useDeleteCourseOfAction();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleDelete = async () => {
    setErrorMsg(null);
    try {
      await deleteCourseOfAction({ variables: { id } });
      navigate("/courseofaction");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete Course of Action");
    }
  };

  if (loadingDetail) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!courseOfAction) {
    return <div className="text-center mt-10 text-red-600">Course of Action not found.</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-4 text-red-700">Delete Course of Action</h2>
      <p className="mb-6">
        Are you sure you want to delete <span className="font-semibold">{courseOfAction.name}</span>?
        This action cannot be undone.
      </p>
      {errorMsg && <div className="text-red-600 mb-4">{errorMsg}</div>}
      <div className="flex gap-4">
        <button
          className="bg-red-600 text-white px-6 py-2 rounded font-semibold"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded font-semibold"
          onClick={() => navigate(`/courseofaction/${id}`)}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CourseOfActionDeletePage;
