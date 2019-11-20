import React, { Component } from 'react';
import axios from 'axios';
import './JokeList.css';
import uuid from 'uuid/v4';
import Joke from './Joke';

class JokeList extends Component {
    static defaultProps = {
        jokesNumb: 10,
    }
    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem('jokes') || "[]"),
            isLoading: false
        }
        this._jokes = new Set(this.state.jokes.text);
        this.getJokes = this.getJokes.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes();

    }
    async getJokes() {
        try {

            let jokes = [];
            while (jokes.length < this.props.jokesNumb) {
                let respond = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
                let jokeText = respond.data.joke;
                if (!this._jokes.has(jokeText)) {
                    jokes.push({
                        _id: await uuid(),
                        text: jokeText,
                        vote: 0
                    });
                    console.log(respond);
                }
            }
            this.setState(st => ({
                jokes: [...st.jokes, ...jokes],
                isLoading: false
            }), () => (window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)))
            );

        } catch (e) {
            alert(e);
            this.setState({
                isLoading: false
            })
        }
    }

    handleVote(id, delta) {

        const oldJokes = this.state.jokes;
        let newJokes = oldJokes.map(cur => {
            return (cur._id === id ? { ...cur, vote: cur.vote + delta } : cur)
        })
        this.setState({
            jokes: newJokes
        }, () => { window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)) });

    }
    handleClick() {
        this.setState({
            isLoading: true
        }, this.getJokes);
    }

    render() {

        let sortedJokes = this.state.jokes.sort((a,b)=> b.vote - a.vote);
        if (this.state.isLoading) {
            return (
                <div className='spinner'>
                    <i className='far fa-8x fa-laugh fa-spin'></i>
                    <h1 className='JokeList-title'> Loading ... </h1>
                </div>
            )
        }
        return (
            <div className='JokeList'>
                <div className='JokeList-sidebar'>
                    <h1 className='JokeList-title'>
                        <span>Dad</span> Jokes
                    </h1>
                    <img alt='New Joke' src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                    <button className='JokeList-getmore' onClick={this.handleClick}> Gimmi Jokes </button>

                </div>

                <div className='JokeList-jokes'>
                    {
                        sortedJokes.map(currJoke => (
                            <Joke
                                key={currJoke._id}
                                text={currJoke.text}
                                vote={currJoke.vote}
                                upVote={() => this.handleVote(currJoke._id, 1)}
                                downVote={() => this.handleVote(currJoke._id, -1)}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default JokeList;
