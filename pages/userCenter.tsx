import React from 'react'
import { NextPage } from 'next';
import { connect } from 'react-redux';

interface UserCenterProps {
    
}

function UserCenter(props): NextPage<UserCenterProps> {
    return (
        <div>
            userCenter
        </div>
    )
}

export default connect(state => state)(UserCenter)