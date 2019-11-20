import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {

    getColor() {
        if (this.props.vote >= 15) {
            return "#4CAF50";
        } else if (this.props.vote >= 12) {
            return "#8BC34A";
        } else if (this.props.vote >= 9) {
            return "#CDDC39";
        } else if (this.props.vote >= 6) {
            return "#FFEB3B";
        } else if (this.props.vote >= 3) {
            return "#FFC107";
        } else if (this.props.vote >= 0) {
            return "#FF9800";
        } else {
            return "#f44336";
        }
    }
    getEmoji() {
        if (this.props.vote >= 15) {
            return "em em-rolling_on_the_floor_laughing";
        } else if (this.props.vote >= 12) {
            return "em em-laughing";
        } else if (this.props.vote >= 9) {
            return "em em-smiley";
        } else if (this.props.vote >= 6) {
            return "em em-slightly_smiling_face";
        } else if (this.props.vote >= 3) {
            return "em em-neutral_face";
        } else if (this.props.vote >= 0) {
            return "em em-confused";
        } else {
            return "em em-angry";
        }
    }

    render() {
        return (
            <div className='Joke'>
                <div className='Joke-buttons'>

                    <i className='fas fa-arrow-up' onClick={this.props.upVote} />

                    <span className='Joke-votes' style={{ borderColor: this.getColor() }} >{this.props.vote}</span>

                    <i className='fas fa-arrow-down' onClick={this.props.downVote} />

                </div>
                <div className='Joke-text'>
                    {this.props.text}
                </div>
                <div className='Joke-smiley'>
                    <i className={this.getEmoji()} />
                </div>
            </div>
        );
    }
}

export default Joke;
