SELECT AVG(started_at - created_at) as average_wait_time
FROM cohorts
JOIN students ON cohort_id = cohorts.id
JOIN assistance_requests ON students.id = student_id
ORDER BY average_wait_time

-- Solution:

SELECT avg(started_at-created_at) as average_wait_time
FROM assistance_requests;