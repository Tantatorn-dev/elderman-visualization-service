import React, { Fragment, useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default function DustMap() {

    const [posState, setPosState] = useState([[15.8700, 100.9925]])

    const position = [15.8700, 100.9925]

    const zoom = 6

    const extractData = async (data) => {
        let locations = []
        Object.keys(data).map(item => {
            if (Object.keys(data[item])[0] == 'DevEUI_uplink') {
                let sensorVal = Number.parseInt(data[item]['DevEUI_uplink']['payload_hex'].substring(2, 4), 16)
                let temp = []
                if (data[item]['DevEUI_uplink']['DevAddr'] === "14EF1432" && sensorVal != 191) {
                    if (!isNaN(data[item]['DevEUI_uplink']['LrrLAT'])) {
                        temp.push(Number.parseFloat(data[item]['DevEUI_uplink']['LrrLAT']))
                    }
                    if (!isNaN(data[item]['DevEUI_uplink']['LrrLON'])) {
                        temp.push(Number.parseFloat(data[item]['DevEUI_uplink']['LrrLON']))
                    }
                }
                locations.push(temp)
            }
        })
        setPosState(locations)
    }

    const getAverage = data => {
        return data.reduce((sume, el) => sume + el, 0) / data.length
    }

    const getAvgPerDay = allDayData => {
        const allKeys = Object.keys(allDayData)
        const avgPerDay = { x: [], y: [] }
        for (let i = 0; i < allKeys.length; i++) {
            const avg = getAverage(allDayData[allKeys[i]])
            avgPerDay.x.push(allKeys[i])
            avgPerDay.y.push(avg)
        }
        return avgPerDay
    }

    useEffect(() => {
        fetch('https://tgr2020-quiz2.firebaseio.com/quiz/sensor/team32.json')
            .then(res => res.json())
            .then(data => extractData(data))
    }
    )

    return (
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
                                <Popup>test</Popup>
                            </Marker>
                        )
                    }
                })
            }
        </Map>
    )
}
