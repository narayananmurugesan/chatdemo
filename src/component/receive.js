import React, { Component } from 'react'

export default class Receive extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    render() {
        return (
            <div className={`receive clearfix`}>
                <div className={`receiveChatBox`}>
                    <div className="profile_pict">
                        <span className={`rounded-circle bg-success p-2`}>
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
