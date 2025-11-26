Execute os testes e analise os resultados.

## Modo: $ARGUMENTS

Se nenhum argumento for passado, executa todos os testes uma vez.

### Modos disponíveis

- `/test` - Executa todos os testes uma vez
- `/test watch` - Executa em watch mode (re-executa ao salvar)
- `/test coverage` - Executa com relatório de cobertura
- `/test NomeComponente` - Executa apenas testes do componente específico

## Passos

### Execução padrão

1. Execute `npm test`
2. Se houver testes falhando:
   - Analise cada falha
   - Determine se é problema no teste ou no código
   - Corrija apropriadamente
   - Execute os testes novamente
3. Informe o resultado final

### Execução com coverage

1. Execute `npm test -- --coverage`
2. Analise o relatório de cobertura
3. Identifique arquivos com baixa cobertura
4. Sugira testes adicionais se necessário

## Output esperado

```
✅ Todos os testes passaram!

📊 Resultados:
   - Arquivos de teste: X
   - Testes executados: X
   - Passando: X ✅
   - Falhando: X ❌
   - Tempo total: X.XXs

📁 Arquivos testados:
   - src/components/ui/SectionHeader.test.tsx (X testes)
   - src/Simple.test.tsx (X testes)
```

### Se houver coverage:

```
📈 Cobertura de código:
   | Arquivo          | Statements | Branches | Functions | Lines |
   |------------------|------------|----------|-----------|-------|
   | SectionHeader    | XX%        | XX%      | XX%       | XX%   |

⚠️ Arquivos sem cobertura:
   - src/components/ui/OptimizedImage.tsx
   - src/components/Reveal.tsx
```

## Padrões de teste do projeto

### Wrapper com Router (obrigatório para componentes com Link)

```tsx
const renderWithRouter = (ui: React.ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>);
```

### Estrutura de teste

```tsx
describe('NomeComponente', () => {
  it('renders correctly', () => {
    renderWithRouter(<Component />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});
```

### Queries preferidas (em ordem de preferência)

1. `getByRole` - Mais acessível
2. `getByLabelText` - Para form inputs
3. `getByText` - Para texto visível
4. `getByTestId` - Último recurso
