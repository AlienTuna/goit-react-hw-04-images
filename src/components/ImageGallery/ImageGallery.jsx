import { Component } from "react";
import { toast } from 'react-toastify';

import PixabayServices from "services/pixabay-services";

import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";

import css from './ImageGallery.module.css';

import PropTypes from 'prop-types';
/* state-machine:
    ** idle
    ** loading
    ** resolved
    ** error
*/
export default class ImageGallery extends Component {
    state = {
        images: null,
        page: 1,
        status: 'idle',
        modalImg: null,
        showModal: false,
        loadMoreAvailable: false,
    }
    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.searchQuery;
        const currentQuery = this.props.searchQuery;
        const prevPage = prevState.page;
        const { images, page } = this.state;

        if (prevQuery !== currentQuery) {
            this.setState({ status: 'loading'})

            PixabayServices.getImages(currentQuery, page)
                .then(result => {
                    const totalHits = Number(result.data.totalHits);
                    const loadMoreNumber = (totalHits / 12 / page) >= 1;

                    if (totalHits < 1) {
                        toast.warn('Nothing was found. Try another query!')
                        this.setState({ status: 'error' })
                    }
                    else {
                        toast.success(`We found ${totalHits} images`)
                        this.setState({
                            images: result.data.hits,
                            status: 'resolved',
                            loadMoreAvailable: loadMoreNumber,
                        })
                    }

                })
                .catch(error => {
                    this.setState({ status: 'error' })
                    toast.error(error)
                    console.log('ERROR', error)
                })
        }
        else if (page > prevPage) {
            PixabayServices.getImages(currentQuery, page)
                .then(result => {
                    const totalHits = Number(result.data.totalHits);
                    const loadMoreNumber = (totalHits / 12 / page) >= 1;

                    this.setState({ 
                        images: [...images, ...result.data.hits], 
                        status: 'resolved',
                        loadMoreAvailable: loadMoreNumber,
                    })})
                .catch(error => { toast.error(error) })
        }
    }


    loadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }))
    }

    openModal = (src, alt) => {
        this.setState({ modalImg: { src, alt }, showModal: true })
    }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    render() {
        const items = this.state.images;
        const { status, modalImg, showModal, loadMoreAvailable } = this.state;

        if (status === "loading") { return <Loader /> }

        if (status === "resolved") {
            return (
                <>
                    <div>
                        <ul className={css.gallery}>
                            {items.map(
                                item => {
                                    const { id, webformatURL, largeImageURL, tags } = item
                                    return (
                                        <ImageGalleryItem
                                            key={id}
                                            previewURL={webformatURL}
                                            largeImageURL={largeImageURL}
                                            tags={tags}
                                            onClick={this.openModal}
                                        />
                                    )
                                }
                            )}
                        </ul>
                    </div>
                    {loadMoreAvailable && <Button onClick={this.loadMore} />}
                    {showModal && <Modal
                        // enable={showModal}
                        src={modalImg.src}
                        alt={modalImg.alt}
                        onCloseModal={this.closeModal}
                    />
                    }
                </>
            )
        }
    }
}

ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired,
}