import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default function DustMap() {

    const [posState, setPosState] = useState([[]])

    const position = [15.8700, 100.9925]

    const zoom = 6

    const extractData = async (data) => {

        let allData = []

        let k = Object.keys(data)

        k.map(item => {

            if (Object.keys(data[item])[0] == 'DevEUI_uplink') {

                let sensorVal = Number.parseInt(data[item]['DevEUI_uplink']['payload_hex'].substring(2, 4), 16)
                let temp = []

                if (data[item]['DevEUI_uplink']['DevAddr'] === "14EF1432" && sensorVal != 191) {
                    let state = false

                    if (!isNaN(data[item]['DevEUI_uplink']['LrrLAT'])) {
                        temp.push(Number.parseFloat(data[item]['DevEUI_uplink']['LrrLAT']))
                        state = true
                    }
                    if (!isNaN(data[item]['DevEUI_uplink']['LrrLON'])) {
                        temp.push(Number.parseFloat(data[item]['DevEUI_uplink']['LrrLON']))
                    }

                    if (state) {
                        temp.push(sensorVal)
                    }
                }


                allData.push(temp)
            }


        })

        for (let i = allData.length - 1; i--;) {
            if (allData[i][0] === undefined && allData[i][1] === undefined) allData.splice(i, 1)
        }

        let locations = []
        allData.map(item => {
            let temp = []
            temp.push(item[0])
            temp.push(item[1])
            locations.push(temp)
        })

        let set = new Set(locations.map(JSON.stringify))
        let uniqueLocations = Array.from(set).map(JSON.parse)

        let result = []
        uniqueLocations.map(item => {
            let i = 0

            let temp = []
            temp.push(item[0])
            temp.push(item[1])

            let sum = 0
            let count = 0
            while (i < allData.length) {
                if (item[0] == allData[i][0] && item[1] == allData[i][1]) {
                    sum += allData[i][2]
                    count += 1
                }
                i++
            }

            temp.push(sum / count)
            result.push(temp)
        })

        result.splice(result.length - 1)

        setPosState(result)
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
                                <Popup>{item[2]} µg/m3</Popup>
                            </Marker>
                        )
                    }
                })
            }
        </Map>
    )
}
