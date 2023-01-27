const { Router } = require('express');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  
  res.json([
    {
      username: 'folsdfn',
      age: 26
    },
    {
      username: 'mike',
      age: 54
    }
  ])
});

module.exports = router;