import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";
import { startExamAction } from "../redux/question_reducer"; // ✅ Correct action

export function useFetchQuestion() {
    const [isLoading, setIsLoading] = useState(true);
    const [serverError, setServerError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchQuestions() {
            try {
                setIsLoading(true);
                const { questions, answers } = await getServerData("questions"); // ✅ Ensure API response matches reducer
                dispatch(startExamAction({ questions, answers })); // ✅ Dispatch with correct payload
            } catch (error) {
                setServerError(error.response?.data?.message || "Failed to fetch questions.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchQuestions();
    }, [dispatch]);

    return [{ isLoading, serverError }];
}
