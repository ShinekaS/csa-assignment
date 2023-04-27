const express = require('express');
const router = express.Router();

// Add your resource-specific routes here

module.exports = router;

const { Order, OrderBasket, Basket } = require('../models');

// Create a new Order
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});

// Get all orders, including associated items
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll(); // how can we include the Order associated with the baskets in this response?
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order', error });
  }
});

// Get a specific order by ID, including associated items
router.get('/:id', async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id); // how can we include the ITEMS associated with the baskets in this response?
  
      if (!order) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        res.json(order);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving order', error });
    }
  });

  // Update a order by ID
router.put('/:id', async (req, res) => {
    try {
      const [updated] = await Order.update(req.body, {
        where: { id: req.params.id },
      });
  
      if (updated) {
        const updatedOrder = await Order.findByPk(req.params.id);
        res.json(updatedOrder);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating order', error });
    }
  });


  // Delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
      const deleted = await Order.destroy({
        where: { id: req.params.id },
      });
  
      if (deleted) {
        res.status(204).json({ message: 'Order deleted' });
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting order', error });
    }
  });

  // adding authentication....Route implementation

const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, async (req, res) => {
});