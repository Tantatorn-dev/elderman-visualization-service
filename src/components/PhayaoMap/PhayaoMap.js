import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default function PhayaoMap() {

    const [posState, setPosState] = useState([])

    const position = [19.1667, 99.8667]

    const zoom = 10

    const checkGroup = (deviceID) => {
        if (deviceID == 47) {
            return 'team32'
        }
        else if (deviceID == 46) {
            return 'team11'
        }
        else if (deviceID == 45) {
            return 'team14'
        }
        else if (deviceID == 44) {
            return 'team29'
        }
    }

    const extractData = async (data) => {
        posState.push([data['lat'], data['lon'], data['value'], checkGroup(data['device_id'])])

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
            <div style={{ paddingTop: 40 }}>
                <Map center={position} zoom={zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        posState.map((item, index) => {
                            if (!(item[0] === undefined && item[1] === undefined)) {
                                return (
                                    <Marker key={index} position={[item[0], item[1]]} >
                                        <Popup>
                                            <span key={index}><span style={{fontWeight:"bold"}}>team:</span> {item[3]}</span><br/>
                                            <span key={index}><span style={{fontWeight:"bold"}}>PM2.5 value</span> {item[2]} µg/cubic meter</span><br/>
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
