const Experience = require('../models/Experience');

const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ status: 'active' });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getExperiences };
