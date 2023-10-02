const { Pool } = require("pg");
const process = require("process");
// const cohortArg = process.argv[2];
// const limitArg = process.argv[3];

const pool = new Pool({
  host: "localhost",
  database: "bootcampx",
});

pool
  .query(
    `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};
`
  )
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));

// pool
//   .query(
//     `
// SELECT students.id AS student_id, students.name AS student_name, cohorts.name AS cohort_name
// FROM students
// JOIN cohorts ON cohorts.id = cohort_id
// WHERE cohorts.name LIKE '${cohortArg}%'
// LIMIT ${limitArg};
// `
//   )
//   .then((res) => {
//     res.rows.forEach((user) => {
//       console.log(
//         `${user.student_name} has an id of ${user.student_id} and was in the ${user.cohort_name} cohort`
//       );
//     });
//   })
//   .catch((err) => console.error("query error", err.stack));