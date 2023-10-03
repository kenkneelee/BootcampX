const { Pool } = require("pg");
const process = require("process");
const cohortName = process.argv[2] || "JUL02";
const values = [cohortName];

const queryText = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teacher;
`;

const pool = new Pool({
  host: "localhost",
  database: "bootcampx",
});

pool.query(queryText, values).then((res) => {
  res.rows.forEach((row) => {
    console.log(`${row.cohort}: ${row.teacher}`);
  });
});
