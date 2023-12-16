import Slider from "react-slick";
import PlayCard from "../PlayCard/PlayCard";
import * as playService from "../../services/playService";
import { useState, useEffect } from "react";
import styles from "./PlayCarousel.module.css"
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";

export default function PlayCarousel() {
    const [plays, setPlays] = useState([]);

    useEffect(() => {
        playService.getAll()
            .then(result => setPlays(result))
            .catch(err => toast.error(err))
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        draggable: false,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className={styles.carouselContainer}>
            {plays.length ? (
                <Slider {...sliderSettings}>
                    {plays.map(play => (
                        <PlayCard key={play._id} play={{ ...play }} />
                    ))}
                </Slider>
            ) : (
                <Spinner />
            )}
        </div>
    )


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} ${styles.customArrowNext}`}
                style={{ ...style }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} ${styles.customArrowPrev}`}
                style={{ ...style }}
                onClick={onClick}
            />
        );
    }
}
