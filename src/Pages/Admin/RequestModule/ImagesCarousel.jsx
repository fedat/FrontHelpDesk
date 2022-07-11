import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router';
import { useFetchData } from "../../../Hooks/UseFetch";
import AuthContext from "../../../contexto/Auth";
import Carousel from 'react-bootstrap/Carousel'

const ImagesCarousel = () => {
    const { id } = useParams();
    const context = useContext(AuthContext);
    const { data: evidencias } = useFetchData(`/evidencia/${id}`);
    return (
        <>
            <Carousel>
            {evidencias.map((evidencia) =>
                <Carousel.Item interval={1000}>
                    <img 
                        className="d-block w-100"
                        src={`data:image/jpeg;base64,${evidencia}`}
                        alt="First slide"
                        width="250" height="260"
                    />
                </Carousel.Item>
                )}
            </Carousel>
        </>
    );

}

export default ImagesCarousel;