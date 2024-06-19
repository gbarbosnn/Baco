## Requisitos Funcionais

### Gerenciamento de Usuários

- [ ] Criar, visualizar, atualizar e excluir (CRUD) funcionalidade de usuário
- [ ] Autenticação de usuário com email e senha
- [ ] Recuperação de senha
- [ ] Inativação e exclusão de usuário

### Premissas

- [ ] Criar, visualizar, atualizar e excluir (CRUD) funcionalidade de premissa
- [ ] Criar, visualizar, atualizar e excluir (CRUD) grupo de premissas
- [ ] Ativar ou desativar grupo de premissas
- [ ] Adicionar ou remover premissas de um grupo

### Produtos

- [ ] Criar, visualizar, atualizar e excluir (CRUD) funcionalidade de produto
- [ ] Visualizar informações de produto, incluindo:
	+ Código
	+ Descrição
	+ Categoria
	+ Sub-categoria
	+ Custo
	+ Preço de venda
	+ Margem
	+ Histórico de preços

## Regras de Negócios

- [ ] Somente administradores podem:
	+ Convidar, excluir ou desativar usuários
	+ Realizar operações CRUD em premissas e grupos de premissas
- [ ] Somente usuários com o domínio @vinhosjolimont.com.br podem ser registrados
- [ ] Os usuários podem apenas atualizar seus próprios perfis
- [ ] Somente administradores podem realizar operações CRUD em premissas e grupos de premissas
- [ ] Todas as alterações de produto ou premissa devem ter seu registro

## Requisitos Adicionais

- [ ] A exclusão é apenas possível dentro dos primeiros 10 minutos de criação
- [ ] Todas as alterações de produto ou premissa devem ser registradas
