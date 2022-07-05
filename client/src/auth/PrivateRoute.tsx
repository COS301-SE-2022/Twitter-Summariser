import { Navigate, Route} from "react-router-dom";

function PrivateRoute(props: any){
  const webToken = localStorage.getItem("jwt");
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <div> {webToken ? <Route {...props} /> : <Navigate to="/login"/>}</div>
};

export default PrivateRoute;
