import * as z from 'zod'

export const employeeSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  document: z.string().min(5, 'Documento deve ter pelo menos 5 caracteres'),
  birthdate: z.string().refine((value) => {
    const date = new Date(value)
    const age = new Date().getFullYear() - date.getFullYear()
    return age >= 18
  }, 'O funcionário deve ser maior de idade.'),
  phones: z.array(z.string().min(10, 'Número inválido')).max(3, 'Você pode adicionar no máximo 3 telefones'),
  manager: z.string().optional(),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  additionalFields: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .optional(),
})

export type EmployeeFormData = z.infer<typeof employeeSchema>