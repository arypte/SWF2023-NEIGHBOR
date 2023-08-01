const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const client = new PrismaClient();

// nft 생성
router.post('/', async (req, res) => {
  try {
    const { owner , tokenID } = req.body;

    await client.nft.create({
      data: {
        owner,
        tokenID,
      },
    });

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
  }
});

// nft 조회
router.get('/', async (req, res) => {
  try {
    const nfts = await client.nft.findMany();
    return res.json(nfts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// id 조회
router.get('/id/:idx', async (req, res) => {
  try {
    const idx = parseInt(req.params.idx, 10);
    const nft = await client.nft.findMany({
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

// 특정 nft 조회 전부
router.get('/:account', async (req, res) => {
  try {
    const owner = req.params.account;
    // console.log( owner ) ;
    const nft = await client.nft.findMany({
      where: {
        owner,
      },
    });
    return res.json(nft);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;