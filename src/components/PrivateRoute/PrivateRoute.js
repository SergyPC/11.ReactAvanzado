import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isLogged } from '../../store/selectors';
import { getUserFromStorage } from '../../store/actions';
import Swal from 'sweetalert2';

const PrivateRoute = ({...props}) => {
  const dispatch = useDispatch();
  dispatch(getUserFromStorage());
  const user = useSelector(state => isLogged(state));
  if (user){
    return <Route {...props} />;
  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `You are not logged in, or your session has been expired. We redirect you to Log In to do it again.`,
      //footer: '<a href>Why do I have this issue?</a>'
      //showConfirmButton: false,
      timer: 5000
    });
    return <Redirect to="/login" />
  }
  //return user ? <Route {...props} /> : <Redirect to="/login" />;
};

export default PrivateRoute;