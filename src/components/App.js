import '../styles/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { checkUserExist } from "../helper/helper"; // ✅ Corrected import


// Import components
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';

// ✅ Use CheckUserExist inside the loader function instead of JSX
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/quiz',
    element: checkUserExist() ? <Quiz /> : <Main /> // ✅ Check user existence before rendering Quiz
  },
  {
    path: '/result',
    element: checkUserExist() ? <Result /> : <Main /> // ✅ Check user existence before rendering Result
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
