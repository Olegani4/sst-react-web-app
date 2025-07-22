import { useEffect } from 'react';
import lightbox from 'lightbox2';
import 'lightbox2/dist/css/lightbox.min.css';
import { galleryImages } from '../../../utils/gallery';

function Gallery() {
    useEffect(() => {
        // Initialize Lightbox
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': 'Image %1 of %2',
            'fadeDuration': 300,
            'imageFadeDuration': 300,
            'disableScrolling': true,
            'fitImagesInViewport': true,
            'positionFromTop': 100,
        });
    }, []);

    return (
        <section className="gallery" id="gallery-section">
            <div className="gallery__container">
                <div className="gallery__header">
                    <h2 className="gallery__title heading-1">Space Gallery</h2>
                </div>
                
                <div className="gallery__content">
                    <p className="gallery__subtitle body-large">Explore our amazing space adventures</p>
                    
                    <div className="gallery__grid">
                        {galleryImages.map((image) => (
                            <div key={image.id} className="gallery__item">
                                <a 
                                    href={image.src} 
                                    data-lightbox="gallery"
                                    data-title={image.title}
                                    className="gallery__link"
                                >
                                    <img 
                                        src={image.src} 
                                        alt={image.alt}
                                        className="gallery__image"
                                        loading="lazy"
                                    />
                                    <div className="gallery__overlay">
                                        <span className="gallery__view-icon">👁️</span>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                    
                    <div className="gallery__view-more">
                        <a href="#" className="gallery__view-more-link body-large">View more</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Gallery;