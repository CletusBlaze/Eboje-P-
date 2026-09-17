import Hero from '@/components/hero/Hero'
import ImpactCounter from '@/components/hero/ImpactCounter'
import AboutPreview from '@/components/hero/AboutPreview'
import ProgramsPreview from '@/components/programs/ProgramsPreview'
import FeaturedProject from '@/components/projects/FeaturedProject'
import StoriesPreview from '@/components/stories/StoriesPreview'
import GalleryPreview from '@/components/gallery/GalleryPreview'
import GetInvolved from '@/components/ui/GetInvolved'
import FinalCTA from '@/components/ui/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactCounter />
      <AboutPreview />
      <ProgramsPreview />
      <FeaturedProject />
      <StoriesPreview />
      <GalleryPreview />
      <GetInvolved />
      <FinalCTA />
    </>
  )
}
