import { createSlice } from "@reduxjs/toolkit";

export const questionReducer = createSlice({
    name: "questions",
    initialState: {
        queue: [],    
        answers: [],  
        trace: 0      
    },
    reducers: {
        setQuestions: (state, action) => {
            state.queue = action.payload.queue;
            state.answers = action.payload.answers;
        },
        moveNextAction: (state) => {
            state.trace += 1;
        },
        movePrevAction: (state) => {
            state.trace -= 1;
        },
        resetQuiz: (state) => {
            state.trace = 0;
            state.queue = [];
            state.answers = [];
        },
        // ✅ FIX: Add resetAllAction
        resetAllAction: (state) => {
            state.trace = 0;
            state.queue = [];
            state.answers = [];
        },
        // ✅ FIX: Add startExamAction
        startExamAction: (state, action) => {
            state.queue = action.payload.queue;
            state.answers = action.payload.answers;
            state.trace = 0;
        },
    }
});

export const { setQuestions, moveNextAction, movePrevAction, resetQuiz, resetAllAction, startExamAction } = questionReducer.actions;
export default questionReducer.reducer;
