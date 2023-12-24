import prisma from 'libs/prismadb'

export const getImages = async () => {
  const albums = await prisma.images.findMany()

  return albums
}
