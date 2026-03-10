import { AnimatePresence, motion } from 'framer-motion'
import { AppShell } from '@/components/layout/app-shell'
import { DashboardPage } from '@/components/dashboard/dashboard-page'
import { SoundMatchPage } from '@/components/sound-match/sound-match-page'
import { ChordsPage } from '@/components/chords/chords-page'
import { MelodyPage } from '@/components/melody/melody-page'
import { LyricsPage } from '@/components/lyrics/lyrics-page'
import { EngineeringPage } from '@/components/engineering/engineering-page'
import { ProjectsPage } from '@/components/projects/projects-page'
import { SettingsPage } from '@/components/settings/settings-page'
import { useAppStore } from '@/stores/use-app-store'

const PAGE_VARIANTS = {
  initial: { opacity: 0, x: 12, scale: 0.99 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -12, scale: 0.99 },
}

const PAGE_TRANSITION = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

function PageContent() {
  const { currentModule } = useAppStore()

  const pages: Record<string, React.ReactNode> = {
    dashboard: <DashboardPage />,
    'sound-match': <SoundMatchPage />,
    chords: <ChordsPage />,
    melody: <MelodyPage />,
    lyrics: <LyricsPage />,
    engineering: <EngineeringPage />,
    projects: <ProjectsPage />,
    settings: <SettingsPage />,
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentModule}
        variants={PAGE_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={PAGE_TRANSITION}
        className="h-full"
      >
        {pages[currentModule]}
      </motion.div>
    </AnimatePresence>
  )
}

export function App() {
  return (
    <AppShell>
      <PageContent />
    </AppShell>
  )
}
