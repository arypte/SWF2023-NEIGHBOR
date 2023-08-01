const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();

const client = new PrismaClient();

// 유저 생성
router.post('/', async (req, res) => {
  try {
    let { email , address, name } = req.body;
    const response = await client.user.findUnique({
      where: {
        address,
      },
    });

    if (response) {
      res.json({ ok: false });
    }

    await client.user.create({
      data: {
        email ,
        address ,
        name ,
      },
    });

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
  }
});

// 유저 조회
router.get('/:account', async (req, res) => {
  try {
    const { account } = req.params;

    console.log( 'test1') ;

    const user = await client.user.findUnique({
      where: {
        address: account,
      },
      select: {
        name: true,
        address: true,
      },
    });

    if (!user) {
      console.log(false) ;
      return res.json({ ok: false }) ;
    }

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;