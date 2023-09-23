SELECT cohorts.name AS cohort_name, COUNT(*) AS student_count
FROM cohorts
JOIN students ON cohorts.id = cohort_id
GROUP BY cohort_name
HAVING COUNT(*) >= 18
ORDER BY COUNT(*);