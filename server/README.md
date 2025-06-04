# 📋 Regras de Negócio - App da Cantina

## Autenticação e Usuários

- [x] RN001: Apenas usuários cadastrados podem acessar o sistema.

- [x] RN002: Cada usuário possui um cargo: Atendente, Cozinheiro ou Administrador.

- [x] RN003: O login é realizado via usuário e senha.

- [x] RN004: O administrador é o único que pode cadastrar, editar e remover usuários.

## Gerenciamento de Menu

- [x] RN005: Somente o administrador pode adicionar, editar ou remover itens do menu.

- [x] RN006: Cada item do menu deve conter: nome, descrição, preço e quantidade disponível no dia.

RN007: Um item só pode ser pedido se houver quantidade disponível.

## Pedidos

RN008: Somente atendentes podem registrar pedidos.

RN009: Um pedido pode conter múltiplos itens do menu, cada um com sua respectiva quantidade.

RN010: Ao criar o pedido, a quantidade solicitada de cada item é descontada do estoque diário.

RN011: O sistema deve impedir pedidos que ultrapassem a quantidade disponível no momento da criação.

RN012: Os pedidos são enviados automaticamente para os cozinheiros via WebSocket.

RN013: Os cozinheiros visualizam uma fila dos pedidos em aberto.

RN014: Os cozinheiros podem alterar o status do pedido para: Em preparo, Pronto, Cancelado.

## Notificações

RN015: Cozinheiros recebem notificação em tempo real quando um novo pedido é criado.

RN016: Atendentes recebem notificação em tempo real quando o status do pedido muda para Pronto ou Cancelado.

## Atualização de Status

RN017: Apenas os cozinheiros podem alterar o status de um pedido.

- [x] RN018: Atendentes podem visualizar todos os pedidos feitos e seus respectivos status.

## Controle de Estoque

- [x] RN019: A quantidade disponível de um item é reduzida conforme os pedidos são feitos.

- [x] RN020: Se um pedido for cancelado, a quantidade dos itens deve ser devolvida ao estoque diário.

## Permissões

RN021: Atendentes têm permissão para: registrar pedidos, consultar menu, visualizar pedidos e gerenciar usuários.

RN022: Cozinheiros têm permissão para: visualizar pedidos em aberto, alterar seu status e gerenciar usuários.

RN023: Administradores têm permissão total: gerenciar usuários e o menu.

# Casos de uso

## Sessão

- [x] Deve ser possível se autenticar na aplicação

## Admin

- [x] Deve ser possível cadastrar um empregado
- [x] Deve ser possível listar os empregados
- [x] Deve ser possível deletar um empregado
- [x] Deve ser possível cadastrar um produto
- [x] Deve ser possível editar um produto
- [x] Deve ser possível deletar um produto
- [x] Deve ser possível editar um empregado
- [x] Deve ser possível listar todos os pedidos
- [ ] Deve ser possível deletar um pedido

## Atendentes

- [x] Deve ser possível buscar os dados de um atendente pelo id

## Cozinheiros

- [x] Deve ser possível buscar os dados de um cozinheiro pelo id

## Produtos

- [x] Deve ser possível listar os produtos com filtro
- [x] Deve ser possível buscar um produto pelo seu ID
- [x] Deve ser possível trocar a disponibilidade de um produto

## Pedidos

- [x] Deve ser possível cadastrar um pedido
- [x] Deve ser possível listar os pedidos do dia
- [x] Deve ser possível buscar detalhes de um pedido pelo id
- [ ] Deve ser possível editar o status de um pedido
