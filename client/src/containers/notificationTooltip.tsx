import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Notification from '../components/notificationPopOver/notification';
import { initGetNotifications, markAsReadInit } from '../actions/userActions';
import { getNotifications } from '../selectors/selectors';

const mapDispatchToProps = (dispatch: any) => ({
  initGetNotifications: (id: number) => dispatch(initGetNotifications(id)),
  markAsReadInit: (id: number) => dispatch(markAsReadInit(id)),
});

const mapStateToProps = createStructuredSelector({
  getNotifications,
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
