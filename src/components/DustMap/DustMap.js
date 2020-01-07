import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default function DustMap() {

    const position = [51.505, -0.09]
    const zoom = 13

    return (
        <Map center={position} zoom={zoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
            </Marker>
        </Map>
    )
}