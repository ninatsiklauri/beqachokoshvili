import OverView from '_components/page'
import { getImages } from 'actions/getImages'

export default async function HomePage() {
  const images = await getImages()

  return <OverView data={images} />
}
