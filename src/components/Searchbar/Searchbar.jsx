import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

import css from './Searchbar.module.css';

import PropTypes from 'prop-types';

export default class Searchbar extends Component {
    state = {
        txt: ''
    }

    handleInputChange = e => {
        this.setState({ txt: e.currentTarget.value })
    }
    handleSubmit = e => {
        e.preventDefault();
        const txt = this.state.txt.trim();
        if(!txt || txt === '') {
            toast.warn('Insert some text please')
            return
        }

        this.props.onSubmit(txt)
        // this.setState({ txt: '' })
    }
    render() {
        const { txt } = this.state;
        return (
            <header className={css["SearchForm-container"]}>
                <form
                    onSubmit={this.handleSubmit}
                    className={css.SearchForm}>
                    <button type="submit" className={css["SearchForm-button"]}>
                        {/* <span class="button-label">Search</span> */}
                        <ImSearch className={css["SearchForm-button-label"]}/>
                    </button>

                    <input
                        className={css["SearchForm-input"]}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={txt}
                        onChange={this.handleInputChange}
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}