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
            "output": `reports/testReport_${Date.now()}.json`
        }
    ],
    "screenshots": {
        "path": "reports/screenshots/",
        "takeOnFails": true
    },
    "video": {
        "path": "reports/videos/",
        "failedOnly": true,
        "quality": "low"
    }
}