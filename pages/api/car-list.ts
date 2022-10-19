// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const carModelList = [
  { id: 1, title: 'Hyundai', description: 'South Korean car manufacturer' },
  { id: 2, title: 'Kia', description: 'Sister company Hyunda' },
  { id: 3, title: 'BYD', description: 'Build Your Dreams (BYD) Auto is an electric vehicle' },
  { id: 4, title: 'Nissan', description: 'Japanese car maker' },
  { id: 5, title: 'BMW', description: 'BMW has been a key pioneer of electric cars' },
  { id: 6, title: 'Mercedes-Benz', description: 'Rapidly expanding its pure-electric ‘EQ’ line-up' },
  { id: 7, title: 'Rivian', description: 'American startup Rivian is vying with Tesla' },
  { id: 8, title: 'Volkswagen', description: 'Stuttgart automaker Volkswagen Group' },
  { id: 9, title: 'Geely', description: 'Chinese conglomerate Geely Auto' },
]

export type CarListData = typeof carModelList[0]

export default function handleResCarList(req: NextApiRequest, res: NextApiResponse<CarListData[]>) {
  res.status(200).json(carModelList)
}
