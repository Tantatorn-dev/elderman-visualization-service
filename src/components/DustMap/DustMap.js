import React, { Fragment } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const MyPopupMarker = ({ content, position }) => (
    <Marker position={position}>
        <Popup>{content}</Popup>
    </Marker>
)

const MyMarkersList = ({ markers }) => {
    const items = markers.map(({ key, ...props }) => (
        <MyPopupMarker key={key} {...props} />
    ))
    return <Fragment>{items}</Fragment>
}

export default function DustMap() {

    const markers = [
        { key: 'marker1', position: [51.5, -0.1], content: 'My first popup' },
        { key: 'marker2', position: [51.51, -0.1], content: 'My second popup' },
        { key: 'marker3', position: [51.49, -0.05], content: 'My third popup' },
    ]
    const position = [15.8700, 100.9925]
    const zoom = 6

    return (
            <Map center={position} zoom={zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MyMarkersList markers={markers} />
            </Map>
    )
}