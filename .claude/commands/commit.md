Crie um commit seguindo conventional commits.

## Mensagem do commit: $ARGUMENTS

## Tipos de commit (em português)

| Tipo        | Quando usar                           |
| ----------- | ------------------------------------- |
| `feat:`     | Nova funcionalidade                   |
| `fix:`      | Correção de bug                       |
| `docs:`     | Alteração em documentação             |
| `refactor:` | Refatoração sem mudar funcionalidade  |
| `style:`    | Formatação, espaços, ponto-e-vírgula  |
| `test:`     | Adição ou correção de testes          |
| `chore:`    | Tarefas de manutenção (deps, configs) |
| `perf:`     | Melhoria de performance               |
| `ci:`       | Alteração em CI/CD                    |

## Escopo (opcional)

Use escopo para especificar a área afetada: `tipo(escopo): mensagem`

Exemplos:

- `feat(seo): adiciona meta tags na página de contato`
- `fix(hero): corrige animação no mobile`
- `refactor(components): extrai lógica do formulário`

## Regras

1. Mensagem em português
2. Primeira linha com no máximo 72 caracteres

## Arquivos sensíveis (NUNCA commitar)

⚠️ Verificar se algum destes arquivos está sendo adicionado:

- `.env`, `.env.local`, `.env.production`
- `credentials.json`, `serviceAccount.json`
- `dist.zip`, `*.zip`
- `node_modules/`
- Arquivos com senhas, tokens ou chaves de API

Se encontrar, **alertar o usuário** e remover do staging.

## Passos

1. Execute `git status` e `git diff --stat` para ver as mudanças
2. Execute `git log -3 --oneline` para ver o estilo dos commits recentes
3. **Verifique se há arquivos sensíveis** antes de adicionar
4. **Analise as mudanças e pergunte ao usuário:**
   - Se há mudanças não relacionadas, pergunte: "Há X arquivos modificados. Deseja commitar todos ou apenas alguns específicos?"
   - Liste os arquivos agrupados por tipo de mudança (novos, modificados, deletados)
   - Se não houver mensagem ($ARGUMENTS vazio), sugira uma mensagem baseada nas mudanças
5. Após confirmação do usuário, adicione os arquivos apropriados:
   - `git add .` para todos
   - `git add <arquivos>` para seleção específica
6. Crie o commit com a mensagem (fornecida ou aprovada pelo usuário)
7. Mostre o resultado do commit
8. Pergunte se o usuário quer fazer push para o remoto
