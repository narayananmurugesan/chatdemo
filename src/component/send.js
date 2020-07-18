import React, { Component } from 'react'

export default class Send extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    render() {
        return (
            <div className={`send clearfix`}>
                <div className={`sendChatBox`}>
                    <div className="profile_pict">
                        <span className={`rounded-circle bg-primary p-2`}>
        <span className={`text-white text-uppercase pl-1 pr-1`}>{(this.props.title)? this.props.title[0]: ''}</span>
                        </span>
                    </div>
                    <div>
                        {this.props.message}
                    </div>
                </div>
            </div>
        )
    }
}
