module.exports = {
    "browsers": ["chrome"],
    "concurrency": 2,
    "src": ["tests/**/*"],
    "baseUrl": "http://localhost:3001",
    "reporter": [
        {
            "name": "list"
        },
        {
            "name": "json",
            "output": `reports/testReport_${(new Date()).toISOString().replace(/[TZ\.\:\-]/g,"")}.json`
        }
    ],
    "screenshots": {
        "path": "reports/screenshots/",
        "takeOnFails": true
    },
    "videoPath": "reports/videos/",
    "videoOptions": {
        "failedOnly": true,
        "pathPattern": "${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.mp4"
    }
}