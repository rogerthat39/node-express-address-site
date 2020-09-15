const express = require('express')
const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'realestate'
})

const router = express.Router()

//home page
router.get('/', (req, res)=>{
    let limit = 12
    let page = 1

    //get suburb data
    conn.query("SELECT DISTINCT suburb FROM properties ORDER BY suburb", (err, suburbs) => {
        //get house data
        conn.query("SELECT * FROM properties LIMIT 12", (err, houses) => {
            //get number of records for count
            conn.query("SELECT COUNT(*) AS 'count' from properties", (err, record_count) => {
                //pass result to page
                res.render("index", {
                    title: 'Home',
                    suburbs,
                    houses,
                    record_count,
                    currentPage: page,
                    totalPages: Math.ceil(record_count[0].count / limit)
                })
            })
        })
    })
})

//filter by page number
router.get("/page/:page", (req, res) => {
    //formula for working out the offset (where to start getting results from based on the page #)
    let page = req.params.page
    let limit = 12
    let offset
    if (page == 1) {
        offset = 1
    } else {
        offset = (page - 1) * limit + 1
    }

    conn.query("SELECT DISTINCT suburb FROM properties ORDER BY suburb", (err, suburbs) => {
        conn.query("SELECT * FROM properties LIMIT ? OFFSET ?", [limit, offset], (err, houses) => {
            conn.query("SELECT COUNT(*) AS 'count' FROM properties", (err, record_count) => {
                res.render("index", {
                    title: "Home",
                    suburbs,
                    houses,
                    record_count,
                    currentPage: page,
                    totalPages: Math.ceil(record_count[0].count / limit)
                })
            })
        })
    })
})

//filter by suburb
router.get("/suburb/:suburb", (req, res) => {
    let suburb = req.params.suburb
    let page = req.params.page || 1
    let limit = 12
    let offset
    if (page == 1) {
        offset = 1
    } else {
        offset = (page - 1) * limit + 1
    }

    conn.query("SELECT DISTINCT suburb FROM properties ORDER BY suburb", (err, suburbs) => {
        conn.query("SELECT * FROM properties WHERE suburb = ? LIMIT ? OFFSET ?", [suburb, limit, offset], (err, houses) => {
            conn.query("SELECT COUNT(*) AS 'count' FROM properties WHERE suburb = ?", suburb, (err, record_count) => {
                res.render("index", {
                    title: suburb,
                    suburb,
                    suburbs,
                    houses,
                    record_count,
                    currentPage: page,
                    totalPages: Math.ceil(record_count[0].count / limit)
                })
            })
        })
    })
})

//filter by suburb and page number
router.get("/suburb/:suburb/page/:page", (req, res) => {
    let page = req.params.page
    let suburb = req.params.suburb
    let limit = 12
    let offset
    if (page == 1) {
        offset = 1
    } else {
        offset = (page - 1) * limit + 1
    }

    conn.query("SELECT DISTINCT suburb FROM properties ORDER BY suburb", (err, suburbs) => {
        conn.query("SELECT * FROM properties WHERE suburb = ? LIMIT ? OFFSET ?", [suburb, limit, offset], (err, houses) => {
            conn.query("SELECT COUNT(*) AS 'count' FROM properties WHERE suburb = ?", suburb, (err, record_count) => {
                res.render("index", {
                    title: suburb,
                    suburb,
                    suburbs,
                    houses,
                    record_count,
                    currentPage: page,
                    totalPages: Math.ceil(record_count[0].count / limit)
                })
            })
        })
    })
})

//make routes exportable
module.exports = router