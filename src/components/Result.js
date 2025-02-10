import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Result.css";
import ResultTable from "./ResultTable";

// Import helper functions
import { attemps_Number, earnPoints_Number, flagResult } from "../helper/helper";

// Import actions
import { resetAllAction } from "../redux/question_reducer";

// Import the custom hook
import { usePublishResult } from "../hooks/setResult";

export default function Result() {
    const dispatch = useDispatch();
    const { questions: { queue = [], answers = [] } = {}, result: { result = [], userId = "Guest" } = {} } = useSelector(state => state);

    const [error, setError] = useState(null);

    const totalPoints = queue.length * 10;
    const attempts = attemps_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10);
    const flag = flagResult(totalPoints, earnPoints);

    // ✅ Use the custom hook properly
    const publishResult = usePublishResult();

    useEffect(() => {
        async function publish() {
            try {
                await publishResult({
                    result,
                    username: userId,
                    attempts,
                    points: earnPoints,
                    achieved: flag ? "Passed" : "Failed",
                });
            } catch (err) {
                console.error("Error publishing result:", err);
                setError(err.message);
            }
        }

        publish();
    }, [publishResult, result, userId, attempts, earnPoints, flag]);

    if (error) {
        return (
            <div className="container">
                <h1 className="title text-light">Quiz App</h1>
                <p className="error-text">⚠️ An error occurred: {error}</p>
                <div className="start">
                    <Link className="btn" to="/" onClick={() => dispatch(resetAllAction())}>
                        Retry
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="title text-light">Quiz App</h1>

            {/* Result Summary */}
            <div className="result flex-center">
                <div className="flex">
                    <span>Username</span>
                    <span className="bold">{userId}</span>
                </div>
                <div className="flex">
                    <span>Total Quiz Points:</span>
                    <span className="bold">{totalPoints || 0}</span>
                </div>
                <div className="flex">
                    <span>Total Questions:</span>
                    <span className="bold">{queue.length || 0}</span>
                </div>
                <div className="flex">
                    <span>Total Attempts</span>
                    <span className="bold">{attempts || 0}</span>
                </div>
                <div className="flex">
                    <span>Total Earned Points:</span>
                    <span className="bold">{earnPoints || 0}</span>
                </div>
                <div className="flex">
                    <span>Quiz Result</span>
                    <span className="bold" style={{ color: flag ? "#2aff95" : "#ff2a66" }}>
                        {flag ? "Passed" : "Failed"}
                    </span>
                </div>
            </div>

            {/* Restart Button */}
            <div className="start">
                <Link className="btn" to="/" onClick={() => dispatch(resetAllAction())}>
                    Restart
                </Link>
            </div>

            {/* Result Table */}
            <div className="container">
                <ResultTable />
            </div>
        </div>
    );
}
