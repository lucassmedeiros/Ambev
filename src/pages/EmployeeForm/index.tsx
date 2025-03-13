import { zodResolver } from '@hookform/resolvers/zod'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import employeesApi from '../../services/employeesApi'
import { EmployeeFormData, employeeSchema } from './schemaEmploye'
import { Container } from './styles'

const EmployeeForm: React.FC = () => {
  const { t } = useTranslation()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      email: '',
      document: '',
      birthdate: '',
      phones: [],
      manager: '',
      password: '',
    },
  })

  const { fields: additionalFields, append: appendAdditionalField, remove: removeAdditionalField } = useFieldArray({
    control,
    name: 'additionalFields',
  })
  const navigate = useNavigate()

  const { fields, append, remove } = useFieldArray({ control, name: 'phones' })

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      await employeesApi.post('/employees', data)
      toast.success(t('employeeForm.successMessage'), {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      })
      navigate(-1)
    } catch (error) {
      console.error(t('employeeForm.errorMessage'), error)
      toast.error(t('employeeForm.errorMessage'), {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      })
    }
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        {t('employeeForm.title')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <TextField
            fullWidth
            label={t('employeeForm.name')}
            placeholder={t('employeeForm.namePlaceholder')}
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label={t('employeeForm.email')}
            placeholder={t('employeeForm.emailPlaceholder')}
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label={t('employeeForm.document')}
            placeholder={t('employeeForm.documentPlaceholder')}
            {...register('document')}
            error={!!errors.document}
            helperText={errors.document?.message}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label={t('employeeForm.birthdate')}
            placeholder={t('employeeForm.birthdatePlaceholder')}
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('birthdate')}
            error={!!errors.birthdate}
            helperText={errors.birthdate?.message}
          />
        </Box>
        <Box mb={2}>
          <Typography variant="body1">{t('employeeForm.phones')}</Typography>
          {fields.map((field, index) => (
            <Box key={field.id} display="flex" alignItems="center" gap={1} mt={1}>
              <TextField
                fullWidth
                label={`${t('employeeForm.phones')} ${index + 1}`}
                placeholder={t('employeeForm.phonePlaceholder')}
                {...register(`phones.${index}`)}
                error={!!errors.phones?.[index]}
                helperText={errors.phones?.[index]?.message}
              />
              <IconButton onClick={() => remove(index)} color="secondary" disabled={fields.length === 1}>
                <RemoveIcon />
              </IconButton>
            </Box>
          ))}
          <IconButton onClick={() => append('')} color="primary">
            <AddIcon />
          </IconButton>
        </Box>
        <Box mb={2}>
          <TextField fullWidth label={t('employeeForm.manager')} placeholder={t('employeeForm.managerPlaceholder')} {...register('manager')} />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label={t('employeeForm.password')}
            placeholder={t('employeeForm.passwordPlaceholder')}
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>

        <Box mb={2}>
          <Typography variant="body1">{t('employeeForm.additionalFields')}</Typography>
          {additionalFields.map((field, index) => (
            <Box key={field.id} display="flex" alignItems="center" gap={1} mt={1}>
              <TextField
                fullWidth
                label={t(`employeeForm.additionalFieldLabelPlaceholder`)}
                placeholder={t('employeeForm.additionalFieldLabelPlaceholder')}
                {...register(`additionalFields.${index}.label`)}
              />
              <TextField
                fullWidth
                label={t(`employeeForm.additionalFieldValuePlaceholder`)}
                placeholder={t('employeeForm.additionalFieldValuePlaceholder')}
                {...register(`additionalFields.${index}.value`)}
              />
              <IconButton onClick={() => removeAdditionalField(index)} color="secondary" disabled={additionalFields.length === 0}>
                <RemoveIcon />
              </IconButton>
            </Box>
          ))}
          <IconButton onClick={() => appendAdditionalField({ label: '', value: '' })} color="primary">
            <AddIcon />
          </IconButton>
        </Box>

        <Box mb={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {t('employeeForm.submitButton')}
          </Button>
        </Box>

        <Box mb={2}>
          <Button type="button" variant="outlined" color="primary" fullWidth onClick={() => navigate(-1)}>
            {t('employeeForm.backButton')}
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default EmployeeForm
