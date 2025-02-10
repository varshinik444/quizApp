import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";
import { startExamAction } from "../redux/question_reducer"; // ✅ FIXED: Now this exists!

export function useFetchQuestion() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const questions = await getServerData("questions");
                if (questions && questions.length > 0) {
                    dispatch(startExamAction({ queue: questions, answers: questions.map(q => q.answer) }));
                } else {
                    throw new Error("No questions available.");
                }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }

        fetchData();
    }, [dispatch]);

    return { loading, error };
}
