import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import EmployeeForm from '.';
import employeesApi from '../../services/employeesApi';

// Mock do hook de tradução
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock do serviço employeesApi
vi.mock('../../services/employeesApi', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('EmployeeForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (employeesApi.post as vi.Mock).mockResolvedValueOnce({ data: {} });
  });

  test('renders the form fields and buttons', () => {
    render(
      <MemoryRouter>
        <EmployeeForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('employeeForm.name')).toBeInTheDocument();
    expect(screen.getByLabelText('employeeForm.email')).toBeInTheDocument();
    expect(screen.getByLabelText('employeeForm.document')).toBeInTheDocument();
    expect(screen.getByLabelText('employeeForm.birthdate')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'employeeForm.submitButton' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'employeeForm.backButton' })).toBeInTheDocument();
  });

  test('displays error messages when required fields are empty', async () => {
    render(
      <MemoryRouter>
        <EmployeeForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'employeeForm.submitButton' }));

    await waitFor(() => {
      expect(screen.getByText(/Nome deve ter pelo menos 3 caracteres/)).toBeInTheDocument();
      expect(screen.getByText(/E-mail inválido/)).toBeInTheDocument();
      expect(screen.getByText(/Documento deve ter pelo menos 5 caracteres/)).toBeInTheDocument();
      expect(screen.getByText(/O funcionário deve ser maior de idade/)).toBeInTheDocument();
    });
  });
});
