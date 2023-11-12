module.exports = [
    {
        "script": './dist/src/Application/app.js',
        "name": "API airbag",
        "instances": 1,
        "exec_mode": "cluster"
    },
    {
        "script": './dist/src/Application/jobs/CurrencyRates/insertCurrentCurrenciesRate.job.js',
        "name": "Job.latest.currencies-rates",
        "instances": 1,
        "exec_mode": "cluster"
    },
]