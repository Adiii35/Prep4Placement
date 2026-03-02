const axios = require('axios');
require('dotenv').config();

async function scrapeJobs(role, location = "india") {
  try {
    const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
      params: {
        query: `${role} jobs in ${location}`,
        page: '1',
        num_pages: '1',
        country: 'in',
        date_posted: 'all'
      },
      headers: {
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
        'x-rapidapi-key': process.env.JSEARCH_API_KEY
      }
    });

    const jobs = response.data.data.map(job => ({
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city || job.job_country,
      type: job.job_employment_type,
      salary: job.job_salary || "Not disclosed",
      description: job.job_description?.substring(0, 200) + "...",
      applyLink: job.job_apply_link,
      logo: job.employer_logo,
      postedAt: job.job_posted_at_datetime_utc
    }));

    return jobs;

  } catch (error) {
    console.error("JSearch Error:", error.message);
    return [];
  }
}

module.exports = scrapeJobs;