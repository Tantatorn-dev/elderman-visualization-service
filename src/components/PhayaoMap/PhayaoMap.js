import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import Typography from '@material-ui/core/Typography';

const CurrentLocationCircle = ({ s }) => {
    if (s == 1)
        return (
            <CircleMarker
                center={[19.021294, 99.897926]}
                fillColor="green"
                radius={20} />)
    if (s == 2)
        return (
            <CircleMarker
                center={[19.176477, 99.88926]}
                fillColor="green"
                radius={20} />)
    if (s == 3)
        return (
            <CircleMarker
                center={[19.177149, 99.812571]}
                fillColor="green"
                radius={20} />)
    if (s == 4)
        return (
            <CircleMarker
                center={[19.166391, 99.901908]}
                fillColor="green"
                radius={20} />)
}

export default function PhayaoMap() {

    const [posState, setPosState] = useState([])

    const [currentPos, setCurrentPos] = useState(1)

    const [currentEvent,setCurrentEvent] = useState('normal')

    const position = [19.1667, 99.8667]

    const zoom = 10

    const checkCurrentPlace = (currentPos)=>{
        if (currentPos == 1) {
            return 'พระนาคปรก สธ'
        }
        else if (currentPos == 2) {
            return 'วัดศรีโคมคำ'
        }
        else if (currentPos == 3) {
            return 'วัดอนาลโยทิพยาราม'
        }
        else if (currentPos == 4) {
            return 'ศาลหลักเมือง'
        }
    }

    const checkPlaceName = (deviceID)=>{
        if (deviceID == 47) {
            return 'พระนาคปรก สธ'
        }
        else if (deviceID == 46) {
            return 'วัดศรีโคมคำ'
        }
        else if (deviceID == 45) {
            return 'วัดอนาลโยทิพยาราม'
        }
        else if (deviceID == 44) {
            return 'ศาลหลักเมือง'
        }
    }

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
        posState.push([data['lat'], data['lon'], data['value'], checkGroup(data['device_id']),checkPlaceName(data['device_id'])])

        setPosState([...posState])
    }

    const handleEvent = async (data) => {
        if (data['event_code'] == 8) {
            setCurrentEvent('ตายแล้วจ้า')
        }
        else if (data['event_code'] == 128) {
            setCurrentEvent('ล้มนะ')
        }
        else if (data['event_code'] == 255) {
            setCurrentEvent('ล้มแบบสไลด์')
        }
        else 
        {
            setCurrentEvent('ปกติ')
        }
    }

    useEffect(() => {

        setInterval(() => {
            fetch('http://202.139.192.221/api/predict')
                .then(res => res.json())
                .then(data => {
                    setCurrentPos(data)
                })
        }, 1000)

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

        }, 1000)
        
                setInterval(() => {
                    fetch('http://202.139.192.221/api/track_data/test')
                        .then(res => res.json())
                        .then(data => handleEvent(data))
                }, 1000)

    }, []
    )

    return (
        <div>
        <div style={{ paddingTop: 10 }}>
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
                                    <Popup key={index}>
                                        <span key={index}><span style={{ fontWeight: "bold" }}>Place name :</span> {item[4]}</span><br />
                                        <span key={index}><span style={{ fontWeight: "bold" }}>Team :</span> {item[3]}</span><br />
                                        <span key={index}><span style={{ fontWeight: "bold" }}>PM2.5 value :</span> {item[2]} µg/cubic meter</span><br />
                                    </Popup>
                                </Marker>
                            )
                        }
                    })
                }
                <CurrentLocationCircle s={currentPos} />
            </Map>
        </div>
        <Typography style={{paddingTop:10}} component="h2" variant="display3" gutterBottom>
            Sensor Event : {currentEvent}
        </Typography>
        <Typography style={{paddingTop:5}} component="h2" variant="display3" gutterBottom>
            Current Location : {checkCurrentPlace(currentPos)}
        </Typography>
        
        </div>
    )
}
