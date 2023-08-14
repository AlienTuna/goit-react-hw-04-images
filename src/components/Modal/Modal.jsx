import { useEffect } from 'react'

import css from './Modal.module.css'

import PropTypes from 'prop-types';

export function Modal({ onCloseModal, src, alt }) {
    useEffect(() => {
        window.addEventListener('keydown', closeModal)

        return () => window.removeEventListener('keydown', closeModal);
    })

    function closeModal(e) {
        // console.log('close Modal')
        if (e.code === 'Escape' || e.target === e.currentTarget) {
            onCloseModal();
        }
    }

    return (
        <div
            title="Go back"
            className={css.ModalOverlay}
            onClick={closeModal}
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

Modal.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
}