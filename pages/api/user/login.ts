import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, name } = req.body; 

    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });

      res.status(200).json({ message: 'User data stored successfully', user });
    } catch (error) {
      console.error('Error storing user data:', error);
      res.status(500).json({ error: 'Error storing user data. Check server logs for more details.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
