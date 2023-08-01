const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const client = new PrismaClient();

// name            String
// description     String
// location        String

// id 조회
router.get('/:idx', async (req, res) => {
  try {
    const idx = parseInt(req.params.idx, 10);
    const nft = await client.nftdata.findMany({
      where: {
        id: idx,
      },
    });
    return res.json(nft);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;