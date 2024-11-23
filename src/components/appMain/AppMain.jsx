import s from './AppMain.module.css'
import Board from '../board/Board';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CardDetail from '../cardDetail/CardDetail';



const AppMain = props => {

    const router = createBrowserRouter([
        {path: '/', element: <Board {...props} />},
        {path: '/cardDetail/:taskId', element: <CardDetail {...props} />}
    ],
    { basename: '/my-canban-board/' } 
)
      
    
    return (
        <div className={s.appMain}>
            <RouterProvider router={router} />
        </div>
    );
}

export default AppMain