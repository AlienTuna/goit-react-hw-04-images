import css from './ImageGalleryItem.module.css'

import PropTypes from 'prop-types';

export default function ImageGalleryItem({ previewURL, largeImageURL, tags, onClick }) {
    return (
        <li className={css.item}>
            <img
                src={previewURL}
                alt={tags}
                large={largeImageURL}
                className={css.img}
                onClick={() => onClick(largeImageURL, tags)}
            />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    previewURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}