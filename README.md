# SnackTec API

API REST para sistema de cantina desenvolvida em Node.js com Express e SQLite.

## Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **SQLite** - Banco de dados local
- **JWT** - Autenticação via tokens
- **bcrypt** - Criptografia de senhas
- **CORS** - Política de compartilhamento de recursos

## Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/luisplacco/snacktec-api.git
cd snacktec-api
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
node src/index.js
```

O servidor estará rodando em `http://localhost:3001`

## Documentação da API

### Autenticação

#### Login
```http
POST /usuarios/login
Content-Type: application/json

{
  "ra": "1234567890",
  "senha": "sua_senha"
}
```

#### Registro
```http
POST /usuarios
Content-Type: application/json

{
  "nome": "Nome do Usuário",
  "email": "email@exemplo.com",
  "ra": "1234567890",
  "senha": "sua_senha"
}
```

### Rotas Protegidas (Requer JWT)

#### Produtos
- `GET /produtos` - Lista produtos
- `GET /produtos/:id` - Produto específico
- `POST /produtos/:id/favoritos` - Adicionar aos favoritos
- `DELETE /produtos/:id/favoritos` - Remover dos favoritos

#### Pedidos
- `GET /pedidos` - Lista pedidos do usuário
- `POST /pedidos` - Criar pedido
- `DELETE /pedidos/:id` - Cancelar pedido

#### Chat
- `GET /chat` - Lista mensagens
- `POST /chat` - Enviar mensagem

### Rotas Administrativas (Sem autenticação)

#### Produtos Admin
- `GET /admin/produtos` - Lista todos os produtos
- `POST /admin/produtos` - Criar produto
- `PUT /admin/produtos/:id` - Atualizar produto
- `DELETE /admin/produtos/:id` - Excluir produto

#### Pedidos Admin
- `GET /admin/pedidos` - Lista todos os pedidos
- `PUT /admin/pedidos/:id/status` - Atualizar status do pedido

#### Chat Admin
- `GET /admin/chat` - Lista conversas
- `GET /admin/chat/:id_usuario` - Conversa específica
- `POST /admin/chat` - Responder mensagem

## Estrutura do Projeto

```
src/
├── controllers/     # Lógica dos endpoints
├── services/        # Regras de negócio
├── repositories/    # Acesso aos dados
├── middlewares/     # Middlewares customizados
├── database/        # Configuração do SQLite
├── routes.js        # Definição das rotas
├── token.js         # Utilitários JWT
└── index.js         # Servidor principal
```

## Funcionalidades

- **Autenticação JWT** com tipos de usuário (aluno/admin)
- **Sistema de Chat** bidirecional entre alunos e administradores
- **CRUD Completo** de produtos para administradores
- **Gestão de Pedidos** com controle de status
- **Sistema de Favoritos** para produtos
- **Fuso Horário** configurado para São Paulo
- **Banco SQLite** local (sem necessidade de instalação externa)

## Banco de Dados

O projeto utiliza SQLite com as seguintes tabelas:
- `USUARIO` - Dados dos usuários
- `PRODUTO` - Catálogo de produtos
- `PEDIDO` - Pedidos realizados
- `MENSAGENS` - Sistema de chat
- `FAVORITOS` - Produtos favoritos dos usuários

## Tipos de Usuário

- **Aluno** - Pode fazer pedidos, favoritar produtos e usar o chat
- **Administrador** - Acesso completo ao sistema de gestão

## Deploy

Para deploy em produção, certifique-se de:
1. Configurar variáveis de ambiente para JWT_SECRET
2. Configurar CORS para o domínio do frontend
3. Usar um processo manager como PM2

## Scripts Disponíveis

```bash
# Iniciar servidor
node src/index.js

# Modo desenvolvimento (com watch)
node --watch src/index.js
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença ISC.

## Autor

**Luis Felipe de Lima Placco**