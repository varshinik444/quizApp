// Questions.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Custom Hooks
import { useFetchQuestion } from "../hooks/FetchQuestion";
import { updateResult } from "../hooks/setResult";

export default function Questions({ onChecked }) {
    const [checked, setChecked] = useState(null);  // ✅ Use null instead of undefined
    const dispatch = useDispatch();
    
    const { trace, queue } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{ isLoading, serverError }] = useFetchQuestion();
    
    // ✅ Prevent errors when queue is empty
    const currentQuestion = queue?.[trace] || null;

    useEffect(() => {
        if (checked !== null) {
            dispatch(updateResult({ trace, checked }));
        }
    }, [checked, dispatch, trace]);

    function onSelect(i) {
        setChecked(i);
        onChecked(i);
    }

    if (isLoading) return <h3 className="text-light">Loading...</h3>;
    if (serverError) return <h3 className="text-light">⚠️ {serverError}</h3>;
    if (!currentQuestion) return <h3 className="text-light">No questions available.</h3>;

    return (
        <div className="questions">
            <h2 className="text-light">{currentQuestion.question}</h2>

            <ul>
                {currentQuestion.options.map((option, i) => (
                    <li key={i}>
                        <input
                            type="radio"
                            value={i}
                            name="options"
                            id={`q${i}-option`}
                            onChange={() => onSelect(i)}
                            checked={result[trace] === i}
                        />
                        <label className="text-primary" htmlFor={`q${i}-option`}>
                            {option}
                        </label>
                        <div className={`check ${result[trace] === i ? "checked" : ""}`}></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
