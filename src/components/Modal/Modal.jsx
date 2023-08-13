import { Component } from 'react'

import css from './Modal.module.css'

import PropTypes from 'prop-types';

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleEscapeKeyDown);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleEscapeKeyDown);
    }

    handleEscapeKeyDown = (e) => {
        if (e.code === 'Escape') {
            this.props.onCloseModal();
        }
    }

    handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            this.props.onCloseModal();
        }
    }

    render() {
        const { src, alt } = this.props;

        return (
            <div
                title="Go back"
                className={css.ModalOverlay}
                onClick={this.handleOverlayClick}
            >
                <div className={css.ModalImgContainer}>
                    <img
                    className={css.ModalImg}
                        src={src}
                        alt={alt}
                        title={alt}
                    />
                </div>
            </div>)
    }
}

Modal.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
}