import Login from './login';
import { connect } from 'react-redux';
import { userLogin } from '../../store/actions';
import { isLogged } from "../../store/selectors";

function mapStateToProps(state, ownProps) {
  return {
    isLogged: isLogged(state),
  };
}

const mapDispatchToProps = {
  userLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);