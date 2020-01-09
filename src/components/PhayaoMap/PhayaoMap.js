import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default function PhayaoMap() {

    const [posState, setPosState] = useState([])

    const position = [19.1667, 99.8667]

    const zoom = 10

    const extractData = async (data) => {
        posState.push([data['lat'], data['lon'], data['value']])

        setPosState([...posState])
    }

    useEffect(() => {

        setInterval(() => {

            fetch('http://202.139.192.221/api/pm25_data/47')
                .then(res => res.json())
                .then(data => extractData(data))

            fetch('http://202.139.192.221/api/pm25_data/44')
                .then(res => res.json())
                .then(data => extractData(data))

            fetch('http://202.139.192.221/api/pm25_data/45')
                .then(res => res.json())
                .then(data => extractData(data))

            fetch('http://202.139.192.221/api/pm25_data/46')
                .then(res => res.json())
                .then(data => extractData(data))
            
        }, 5000)

    }, []
    )

    return (
        <div>
            <Map center={position} zoom={zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    posState.map((item, index) => {
                        if (!(item[0] === undefined && item[1] === undefined)) {
                            return (
                                <Marker key={index} position={item}>
                                    <Popup>
                                        <span key={index}>{item[2]} µg/m3</span>
                                        </Popup>
                                </Marker>
                            )
                        }
                    })
                }
            </Map>
        </div>
    )
}
