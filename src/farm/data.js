export default function extractData(data, callback) {
    let sensorData = [];
    let timeData = [];
    let averagePerDay = {};
    Object.keys(data).map((key, index) => {
        if (Object.keys(data[key])[0] === "DevEUI_uplink") {
            let temp = data[key]["DevEUI_uplink"];
            if (temp["DevAddr"] === "14EF1432") {
                let sensorVal = Number.parseInt(temp["payload_hex"].substring(2, 4), 16);
                if (sensorVal != 191) {
                    sensorData.push(sensorVal);
                    const date = new Date(temp["Time"]);
                    timeData.push(date);
                    const dateStr = date.toDateString();
                    if (averagePerDay.hasOwnProperty(dateStr)) {
                        averagePerDay[dateStr].push(sensorVal);
                    } else {
                        averagePerDay[dateStr] = [sensorVal];
                    }
                }
            }
        }
    });
    callback(timeData, sensorData, averagePerDay);
}
