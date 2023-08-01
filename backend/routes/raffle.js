const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();

const client = new PrismaClient();

// 래플 생성
router.post('/', async (req, res) => {
  try {
    const { start_block } = req.body;

    const newRaffle = await client.raffle.create({
      data: {
        start_block,
        isEnd: false,
      },
    });

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
  }
});

// 래플 조회 ( 종료 여부 )
router.get('/', async (req, res) => {
  try {
    const isEndStr = req.query.isEnd;
    const isEnd = JSON.parse(isEndStr);
    const raffles = await client.raffle.findMany({
      where: {
        isEnd,
      },
    });
    return res.json(raffles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// 특정 id 래플 조회
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const raffle = await client.raffle.findUnique({
      where: { id },
    });
    return res.json(raffle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// 래플 완료
router.put('/:id/done', async (req, res) => {
  try {
    const { id } = req.params;
    const { end_block, winner } = req.body;

    const Raffle = await client.raffle.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!Raffle) {
      return res.status(400).json({ ok: false, error: 'Not exist Raffle' });
    }

    await client.raffle.update({
      where: {
        id: parseInt(id),
      },
      data: {
        end_block,
        isEnd: true,
        winner,
      },
    });

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;