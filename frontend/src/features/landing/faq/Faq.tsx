import { useTranslation } from 'react-i18next'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/shared/ui/accordion'
import { GridLines } from '@/features/landing/shared/bgpatterns/GridLines'

const QUESTION_KEYS = ['free', 'account', 'resolutionTime', 'verified', 'channels']

export function Faq() {
  const { t: translate } = useTranslation('landing')

  return (
    <section id="faq" className="relative overflow-hidden bg-primary/10 py-24 dark:bg-secondary/8">
      <div className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-15">
        <GridLines />
      </div>

      <div className="relative mx-auto max-w-2xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium tracking-[0.25em] text-primary uppercase dark:text-primary/90">
            {translate('faq.eyebrow')}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-balance sm:text-3xl">
            {translate('faq.titleBefore')}{' '}
            <span className="font-heading text-3xl font-normal text-primary italic sm:text-4xl dark:text-primary/90">
              {translate('faq.titleHighlight')}
            </span>
          </h2>
        </div>

        <Accordion className="mt-10 rounded-xl bg-background">
          {QUESTION_KEYS.map((key) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger className="cursor-pointer rounded-md p-4 text-sm font-medium no-underline hover:bg-muted hover:no-underline">
                {translate(`faq.questions.${key}.question`)}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                {translate(`faq.questions.${key}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
