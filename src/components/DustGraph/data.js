const getAverage = data => {
    return data.reduce((sume, el) => sume + el, 0) / data.length;
};

const getAvgPerDay = allDayData => {
    const allKeys = Object.keys(allDayData);
    const avgPerDay = { x: [], y: [] };
    for (let i = 0; i < allKeys.length; i++) {
        const avg = getAverage(allDayData[allKeys[i]]);
        avgPerDay.x.push(allKeys[i]);
        avgPerDay.y.push(avg);
    }
    return avgPerDay;
};

export default function extractData(data, callback) {
    let sensorData = [];
    let timeData = [];
    let allDayData = {};
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
                    if (allDayData.hasOwnProperty(dateStr)) {
                        allDayData[dateStr].push(sensorVal);
                    } else {
                        allDayData[dateStr] = [sensorVal];
                    }
                }
            }
        }
    });
    const avgPerDay = getAvgPerDay(allDayData);
    callback(timeData, sensorData, avgPerDay);
}
