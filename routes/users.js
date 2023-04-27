var express = require('express');
var router = express.Router();


const {User} = require('../models');

module.exports = router;

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Get all users, including associated items
router.get('/', async (req, res) => {
  try {
    const user = await User.findAll(); // how can we include the ITEMS associated with the user in this response?
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

// Get a specific user by ID, including associated items
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // how can we include the User associated with the baskets in this response?

    if (!user) {
      res.status(404).json({ message: 'user not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      res.status(204).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting User', error });
  }
});

// adding authentication....Route implementation

const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, async (req, res) => {
});