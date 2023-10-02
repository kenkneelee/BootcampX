const { Pool } = require("pg");
const process = require("process");

const pool = new Pool({
  host: "localhost",
  database: "bootcampx",
});

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
});


// pool
//   .query(
//     `SELECT teachers.name AS teacher, cohorts.name AS cohort
//     FROM assistance_requests 
//     JOIN teachers ON teacher_id = teachers.id
//     JOIN students ON student_id = students.id
//     JOIN cohorts ON cohort_id = cohorts.id
//     WHERE cohorts.name LIKE '${process.argv[2]}'
//     GROUP BY teacher, cohort;
//     `
//   )
//   .then((res) => {
//     res.rows.forEach((AR) => {
//       console.log(
//         `${AR.cohort}: ${AR.teacher}`
//       );
//     });
//   })
//   .catch((err) => console.error("query error", err.stack));