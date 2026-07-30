import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/shared/ui/accordion'
import { GridLines } from '@/features/landing/shared/bgpatterns/GridLines'

const QUESTIONS = [
  {
    question: 'Is it free to file a complaint?',
    answer: 'Yes. Filing, tracking, and everything else on NivaranSetu is completely free.',
  },
  {
    question: 'Do I need an account to file a complaint?',
    answer:
      'Yes. Whether you file on the website, over WhatsApp, or by email, it\'s tied to your account — that\'s what lets you track it and get updates later.',
  },
  {
    question: 'How long does it take to get resolved?',
    answer:
      "It depends on the category, but every complaint has a target response time. If a department misses it, the case escalates automatically instead of sitting untouched.",
  },
  {
    question: 'How do I know it\'s actually fixed, not just marked closed?',
    answer:
      'The officer has to submit proof before a case can close, and you get to review it. If it\'s not actually done, you can reject it and it reopens.',
  },
  {
    question: 'Can I file the same complaint through WhatsApp or email instead of the website?',
    answer: 'Yes — web, WhatsApp, and email all work the same way. Use whichever is easiest for you.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="relative overflow-hidden bg-primary/10 py-24 dark:bg-secondary/8">
      <div className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-15">
        <GridLines />
      </div>

      <div className="relative mx-auto max-w-2xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium tracking-[0.25em] text-primary uppercase dark:text-primary/90">
            Questions
          </p>
          <h2 className="mt-3 text-2xl font-bold text-balance sm:text-3xl">
            The stuff{' '}
            <span className="font-heading text-3xl font-normal text-primary italic sm:text-4xl dark:text-primary/90">
              everyone asks
            </span>
          </h2>
        </div>

        <Accordion className="mt-10 rounded-xl bg-background">
          {QUESTIONS.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="cursor-pointer rounded-md p-4 text-sm font-medium no-underline hover:bg-muted hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
