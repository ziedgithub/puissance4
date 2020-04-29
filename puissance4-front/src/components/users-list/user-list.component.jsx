import React from "react";
import {connect} from "react-redux";

import './user-list.styles.scss';
import UserItem from "../user-item/user-item.component";

const UserList = (props) => {
    const { currentUser, connectedUsers } = props;

    return (
      <div>
        {
          connectedUsers.length ===1 ?
            (
              <div>
                No User Connected !
              </div>
            ): null
        }
        <ul>
          {
            connectedUsers.map((u, idx) => (
              u!==currentUser ? <UserItem name={u} key={idx} />: null
            ))
          }
        </ul>
      </div>
    )
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  connectedUsers: state.user.connectedUsers
});

export default connect(mapStateToProps)(UserList);