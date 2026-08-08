import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons'
import { Shimmer } from '@shimmer-from-structure/react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import { getApiErrorMessage } from '@/shared/lib/axios'
import { useCreateTicket } from '@/features/tickets/hooks/useCreateTicket'
import { useCategories } from '@/features/tickets/hooks/useCategories'
import { AuthedNavbar } from '@/features/dashboard/AuthedNavbar'

// matches backend/src/modules/tickets/tickets.validation.ts's createTicketSchema
const createTicketSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.string().min(1, 'Select a category'),
})

type CreateTicketForm = z.infer<typeof createTicketSchema>

export function NewTicketPage() {
  const { data: categories, isLoading: categoriesLoading } = useCategories()
  const { mutate, isPending, error } = useCreateTicket()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTicketForm>({ resolver: zodResolver(createTicketSchema) })

  function onSubmit(data: CreateTicketForm) {
    mutate(data)
  }

  const errorMessage = getApiErrorMessage(error)

  return (
    <>
      <AuthedNavbar />
      <div className="mx-auto max-w-2xl p-6">
        <Link to="/citizen-dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
          Back
        </Link>

        <h1 className="mt-4 font-display text-2xl font-semibold">File a Complaint</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" type="text" {...register('title')} />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="categoryId">Category</Label>
            <Shimmer loading={categoriesLoading}>
              <select
                id="categoryId"
                {...register('categoryId')}
                className="h-7 w-full min-w-0 rounded-md border border-input bg-input/20 px-2 py-0.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 dark:bg-input/30"
              >
                <option value="">Select a category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Shimmer>
            {errors.categoryId && <p className="text-sm text-destructive">{errors.categoryId.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description')} />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

          {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit Complaint'}
          </Button>
        </form>
      </div>
    </>
  )
}
